import React from 'react';

const Cartitems = (props) => {
    const { foodname, foodrate, hotelname, foodimage, foodprice } = props.element;
    const { addFavourite, deleteCart, index } = props;
    return (
        <div className="items" key={index + 1} id={index + 1}>
            <div className="row">
                <div className="col-md-8">
                    <div className="itemdetail">
                        <img src={foodimage} alt={foodname} className="itemimage" />
                        <div className="fooddetail">
                            <h6 className="foodhotel">{hotelname}</h6>
                            <p className="foodname">{foodname}</p>
                            {/* <span className="rate">{foodrate}</span> */}
                            <span>₹<span className="itemprice foodprice">{foodprice}</span></span>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="itemcart">
                        <div className="insertcart edit">
                            <select name="qty" id={`qty${index + 1}`} className="myqty">
                                <option value="1" selected>1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                            </select>
                        </div>
                        <div className="editcartbuttons">
                            <button type="button" className="btn-sm btn btnwish" onClick={() => { addFavourite(foodimage, foodname, hotelname, foodrate, foodprice) }}>Add to wishlist</button>
                            <button type="button" className="btn-sm btn btnrm" onClick={() => { deleteCart(foodname) }}>Remove</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Cartitems;
