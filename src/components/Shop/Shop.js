import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getFromDb, } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
const Shop = () => {

    const { products } = useLoaderData()

    const [cart, setCart] = useState([])

    useEffect(() => {
        const shoppingCart = getFromDb();
        let addedProductArray = []
        if (shoppingCart) {
            for (const id in shoppingCart) {
                const addedProduct = products.find(product => product.id === id)
                if (addedProduct) {
                    const quantity = shoppingCart[id]
                    addedProduct.quantity = quantity
                    // console.log(addedProduct.quantity)
                    addedProductArray.push(addedProduct)
                }
            }
            setCart(addedProductArray)
        }
    }, [products])

    const handleAddToCart = (selectedproduct) => {
        let newCart = []
        const exist = cart.find(product => product.id === selectedproduct.id);
        if (!exist) {
            selectedproduct.quantity = 1
            newCart = [...cart, selectedproduct]
        }
        else {
            selectedproduct.quantity += 1
            const rest = cart.filter(product => product.id !== selectedproduct.id)
            newCart = [...rest, selectedproduct]
            // newCart = [...cart]
        }
        setCart(newCart)
        addToDb(selectedproduct.id)
    }
    const clearCart = () => {
        setCart([])
        deleteShoppingCart()
    }
    return (
        <div className='shop-container'>
            <div className='product-conatainer'>
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>


            <div className='cart-container'>
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to="/order"><button>Review Order</button></Link>
                </Cart>
            </div>


        </div>
    );
};

export default Shop;