import React, { useContext, useEffect } from 'react';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import foodContext from '../../context/foody/foodContext';

const Basket = (props) => {
    const context = useContext(foodContext);
    const { state, foodDone } = context;

    const showBasket = () => {
        const basketcart = document.getElementById("basketcart");
        basketcart.classList.toggle("showbasketcart");
        if (basketcart.getAttribute("class") === "showbasketcart") {
            setTimeout(() => {
                basketcart.classList.remove("showbasketcart");
            }, 5000)
        }
    }

    const totalItem = () => {
        var cartfoodprice = document.getElementsByClassName("cartfoodprice");
        var baskettotalprice = document.querySelector(".baskettotalprice");
        let total = 0;
        for (let i = 0; i < cartfoodprice.length; i++) {
            total = total + parseInt(cartfoodprice[i].innerHTML);
        }
        baskettotalprice.innerHTML = total;
    }

    useEffect(() => {
        props.setloadingBar(10);
        foodDone();
        totalItem();
        props.setloadingBar(100);
    }, [state]);

    return (
        <div id="basket" onMouseEnter={showBasket}>
            <Link to="/cart"><ShoppingBasketIcon className="backeticon" /></Link>
            <div id="basketcart">
                <div className="overly">
                    <div className="basketcart-cart">
                        <div className="incart">
                            <div className="cartBox">
                                <h6>ORDER SUMMURY</h6>
                                <p><span className="cartitems"></span></p>
                            </div>
                            <div className="addtocart">
                                {
                                    state.length === 0 ? "Cart is Empty" :
                                        state.map((basket) => {
                                            return (
                                                <>
                                                    <div className="cartBox">
                                                        <div className="cartfoodname">{basket.foodname}</div>
                                                        <div>₹<span className="cartfoodprice">{basket.foodprice}</span></div>
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
                                <p>₹

                                </p>
                                <h4 className="baskettotalprice"></h4>
                            </div>
                            <button type="button" className="processcart"><Link to="/cart">Process to cart</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Basket;
