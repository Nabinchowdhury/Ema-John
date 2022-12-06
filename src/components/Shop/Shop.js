import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getFromDb, } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"

const Shop = () => {

    const [cart, setCart] = useState([])

    const [products, setProducts] = useState([])
    const [count, setCount] = useState(0)
    const [capacity, setCapacity] = useState(10)
    const [pageNumber, setPageNumber] = useState(0)

    const pages = Math.ceil(count / capacity)

    useEffect(() => {
        fetch(`https://ema-john-server-nabinchowdhury.vercel.app/products?pageNumber=${pageNumber}&capacity=${capacity}`)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setProducts(data.products)
            })
    }, [capacity, pageNumber])

    useEffect(() => {
        let addedProductArray = []
        const shoppingCart = getFromDb();
        const ids = Object.keys(shoppingCart)
        // console.log(ids)
        fetch("https://ema-john-server-nabinchowdhury.vercel.app/productsById", {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(ids)
        }).then(res => res.json())
            .then(data => {
                // console.log(data)
                if (shoppingCart) {
                    for (const id in shoppingCart) {
                        const addedProduct = data.find(product => product._id === id)
                        if (addedProduct) {
                            const quantity = shoppingCart[id]
                            addedProduct.quantity = quantity
                            // console.log(addedProduct.quantity)
                            addedProductArray.push(addedProduct)
                        }
                    }
                    setCart(addedProductArray)
                }
            }).catch((err) => console.log(err))


    }, [products])

    const handleAddToCart = (selectedproduct) => {
        let newCart = []
        const exist = cart.find(product => product._id === selectedproduct._id);
        if (!exist) {
            selectedproduct.quantity = 1
            newCart = [...cart, selectedproduct]
        }
        else {
            selectedproduct.quantity += 1
            const rest = cart.filter(product => product._id !== selectedproduct._id)
            newCart = [...rest, selectedproduct]
            // newCart = [...cart]
        }
        setCart(newCart)
        addToDb(selectedproduct._id)
    }
    const clearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div>
                <div className='product-conatainer'>
                    {
                        products.map(product => <Product key={product._id} product={product} handleAddToCart={handleAddToCart}></Product>)
                    }
                </div>

                <div className='pagination'>
                    <p>page number : {pageNumber} and Page Capacity : {capacity}</p>
                    {
                        [...Array(pages).keys()].map(page =>
                            <button
                                key={page}
                                onClick={() => setPageNumber(page)}
                                className={page === pageNumber ? "selected" : undefined}
                            >{page + 1}</button>)
                    }
                    <select name="" id="" defaultValue="10" onChange={(e) => setCapacity(e.target.value)}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                    </select>
                </div>
            </div>


            <div className='cart-container'>
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to="/order"><button className='review'>Review Order</button></Link>
                </Cart>
            </div>




        </div>
    );
};

export default Shop;