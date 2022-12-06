import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import "./ReviewOrders.css"
const ReviewOrders = ({ product, deleteItem }) => {
    // console.log(product)
    // console.log(deleteItem)
    const { _id, img, name, price, quantity, shipping } = product
    // console.log(product)
    return (
        <div className="review-orders">
            <div className="image-product">
                <img src={img} alt="" />
            </div>

            <div className='product-details'>
                <div className='product-info'>
                    <h5>{name}</h5>
                    <p>Price: {price}$</p>
                    <p>Shipping Charge:{shipping}$</p>
                    <p>Quantity:{quantity}</p>
                </div>
                <div className='delete-btn'>
                    <button onClick={() => deleteItem(_id)}>
                        <FontAwesomeIcon icon={faTrashAlt} className="dlt-icon"></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewOrders;