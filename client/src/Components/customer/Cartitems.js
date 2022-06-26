import React, { useState } from 'react';

const Cartitems = (props) => {
    ;
    const { foodname, category, hotel, foodimg, price, qty } = props.element;
    const { addToCart, addToFavourite, removeFromCart, index, item } = props;
    return (
        <div className="items" key={index + 1} id={index + 1}>
            <div className="row">
                <div className="col-md-8">
                    <div className="itemdetail">
                        <img src={foodimg} alt={foodname} className="itemimage" />
                        <div className="fooddetail">
                            <h6 className="foodhotel">{hotel}</h6>
                            <p className="foodname">{foodname}</p>
                            <span>₹<span className="itemprice foodprice">{price}</span></span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="itemcart">
                        <div className="insertcart edit">
                            <i className="fa fa-minus-circle qtyicon" onClick={() => removeFromCart(item, 1)}></i>
                            <span className="myqty">{qty}</span>
                            <i className="fa fa-plus-circle qtyicon" onClick={() => addToCart(item, category, foodimg, hotel, foodname, price, 1)}></i>
                        </div>
                        <div className="editcartbuttons">
                            <button type="button" className="btn-sm btn btnwish" onClick={() => { addToFavourite(item, category, foodimg, hotel, foodname, price, 1) }}>Add to wishlist</button>
                            <button type="button" className="btn-sm btn btnrm" onClick={() => { removeFromCart(item, qty) }}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
};

export default Cartitems;
