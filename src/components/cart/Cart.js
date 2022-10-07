import React from 'react';
import "./Cart.css";

const Cart = ({ cart }) => {
    // console.log(cart)
    let price = 0;
    let shipping = 0;
    let quantity = 0;

    for (const product of cart) {
        quantity += product.quantity
        price += product.price * product.quantity
        shipping += product.shipping * product.quantity
        // console.log(product.quantity)
    }
    const tax = parseFloat((price * 0.1).toFixed(2))
    const total = price + shipping + tax
    return (
        <div className='cart'>
            <h3>Order Summary</h3>
            <p>Selected Items: {quantity}</p>
            <p>Total Price: ${price}</p>
            <p>Total Shipping: ${shipping}</p>
            <p>Tax: ${tax}</p>
            <h4>Grand Total: ${total.toFixed(2)}</h4>

        </div>
    );
};

export default Cart;