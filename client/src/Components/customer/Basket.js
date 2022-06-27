import React, { useContext, useEffect, useState } from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link, useHistory } from 'react-router-dom';
import foodContext from '../../context/foody/foodContext';

const Basket = () => {
    const history = useHistory();
    const context = useContext(foodContext);
    const { cart, totalamount } = context;
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (history.location.pathname !== "/cart") {
            setShow(true);
        }
    }, [cart, totalamount]);

    return (
        <div id="basket" onMouseEnter={() => { setShow(true) }}>
            <Link to="/cart"><ShoppingBasketIcon className="backeticon" /></Link>
            {show && <div id="basketcart" className={`${show && "showbasketcart"}`} onMouseLeave={() => { setShow(false) }}>
                <div className="overly">
                    <div className="basketcart-cart">
                        <div className="incart">
                            <div className="cartBox">
                                <h6>ORDER SUMMURY</h6>
                                <p><span className="cartitems">Items ({Object.keys(cart).length})</span></p>
                            </div>
                            <div className="addtocart">
                                {
                                    Object.keys(cart).length === 0 ? "Cart is Empty" :
                                        Object.keys(cart).map((basket) => {
                                            return (
                                                <>
                                                    <div className="cartBox" key={cart[basket]._id}>
                                                        <div className="cartfoodname">{cart[basket].foodname}</div>
                                                        <div>₹<span className="cartfoodprice">{cart[basket].price} X {cart[basket].qty}</span></div>
                                                    </div>
                                                </>
                                            )
                                        })
                                }
                            </div>
                        </div>
                        <div className="tringle"></div>
                        <div className="basketcartPrice">
                            <div className="basketprice">
                                <p>₹{totalamount}</p>
                                <h4 className="baskettotalprice"></h4>
                            </div>
                            <button type="button" className="processcart"><Link to="/cart">Process to cart</Link></button>
                        </div>
                    </div>
                </div>
            </div>}
        </div >
    )
};

export default Basket;
