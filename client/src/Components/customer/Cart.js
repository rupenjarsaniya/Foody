import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import foodContext from '../../context/foody/foodContext';
import Button from '@material-ui/core/Button';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import swal from 'sweetalert';
import Cartitems from './Cartitems';

const Cart = (props) => {
    const history = useHistory();
    const context = useContext(foodContext);
    const { addToCart, removeFromCart, clearCart, cart, addToFavourite, getFoodLocal, getAddress, addresses, getFavFoodLocal, orderFood, getUserDetails, totalamount, deliverycharge, discountamount } = context;

    const [coupen, setCoupen] = useState("");
    const [coupenstatus, setCoupenstatus] = useState("");
    const [coupenamount, setCoupenamount] = useState(0);

    const coupenApply = (e) => {
        setCoupen(e.target.value);
        let coupenvalue = e.target.value;
        if (coupenvalue === "FIRST") {
            setCoupenamount(totalamount * (10 / 100));
            setCoupenstatus("Coupen Applied")
        }
        else if (coupenvalue === "FOODY40" && totalamount > 500) {
            setCoupenamount((totalamount * (40 / 100)))
            setCoupenstatus("Coupen Applied")
        }
        else if (coupenvalue === "COOL200" && totalamount > 800) {
            setCoupenamount(200)
            setCoupenstatus("Coupen Applied")
        }
        else if (coupenvalue === "SPRING30" && totalamount > 2000) {
            setCoupenamount(totalamount * (30 / 100))
            setCoupenstatus("Coupen Applied")
        }
        else {
            coupenamount(0);
            setCoupenstatus("Invalid Coupen Code");
        }
    }

    const btnapply = () => { }

    const showcoupens = () => {
        const coupenlist = document.getElementsByClassName("coupenlist")[0];
        coupenlist.style.display = "block";
        coupenlist.classList.add('showcoupen');
        if (coupenlist.style.display === 'block') {
            setTimeout(() => {
                visiblecoupens();
            }, 10000);
        }
    }
    const closecoupen = () => {
        visiblecoupens();
    }
    const visiblecoupens = () => {
        const coupenlist = document.querySelector(".coupenlist");
        coupenlist.style.display = 'none';
        coupenlist.classList.remove('showcoupen');
    };

    //---------------------------------------------------------- Delivery ------------------------------------------------
    const availableDelivery = ["382415", "382418", "382350", "380001"];
    let warnpincode = `<p style="color:orange;"><i className="fa fa-exclamation-triangle"></i>&nbsp;Enter 6 Digit Pincode</p>`;
    let availdelivery = `<p style="color:green;"><i className="fa fa-truck"></i>&nbsp;Delivery By Thusday, May 20, 2021</p>`;
    let noavaildelivery = `<p style="color:red;"><i className="fa fa-exclamation-circle"></i>&nbsp;We Can't Delivery At This Pincode</p>`;

    const pincode = () => {
        var deliverystatus = document.getElementById("deliverystatus");
        var pincode = document.getElementById("pincode");
        for (let index = 0; index < availableDelivery.length; index++) {
            const element = availableDelivery[index];
            if (pincode.value.length !== 6 || pincode.value === null || pincode.value === "") {
                deliverystatus.innerHTML = warnpincode;
            }
            else {
                if (element === pincode.value) {
                    deliverystatus.innerHTML = availdelivery;
                    break;
                }
                else {
                    deliverystatus.innerHTML = noavaildelivery;
                }
            }
        }
    }

    const [orderAddress, setOrderAddress] = useState("");
    const onChangeAddress = (e) => {
        setOrderAddress(e.target.value);
    }

    const readyOrder = async () => {
        var finalamount = document.querySelector(".finalamount").innerHTML;
        let myqty = document.querySelectorAll(".myqty");

        let foodQuantity = "";
        let newElement = [];

        // Take a quantiy of food
        myqty.forEach(element => {
            foodQuantity = element.value;
        });

        // Add quantity to cart array and make a new array
        if (cart.length === 0) {
            swal("Oops!", "Your Cart is Empty!", "error");
            return;
        }
        cart.forEach(element => {
            element["foodQuantity"] = foodQuantity;
            newElement.push(element);
        });
        if (!orderAddress) {
            swal("Oops!", "Select Delivery Address and Try Again!", "warning");
            return;
        }
        props.setloadingBar(10);
        const res = await orderFood(newElement, orderAddress, finalamount);
        if (res) {
            props.setloadingBar(75);
            localStorage.removeItem("yourfood");
            setTimeout(() => {
                localStorage.removeItem("yourfood");
            }, 1000);
            swal("Your Order is Placed", "We Will Delivered Shortly", "success");
            history.push("/");
            props.setloadingBar(100);
        }
        else {
            props.setloadingBar(100);
            swal("Order Not Placed", "Something Went Wrong Please Try Again!", "error");
        }
    }

    useEffect(() => {
        const handleFun = async () => {
            if (localStorage.getItem("token")) {
                props.setloadingBar(50);
                getAddress();
            }
            else {
                history.push("/login");
            }
        }
        props.setloadingBar(10);
        handleFun();
        props.setloadingBar(100);
    }, []);

    return (
        <>
            <div id="cart">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 mt-3">
                            <div className="itemcheckout">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="headercart">
                                            <h5>My Cart ({Object.keys(cart).length})</h5>
                                            <input type="text" name="pincode" id="pincode" maxLength="6"
                                                placeholder="Pincode" autoComplete="off" onChange={pincode} />
                                        </div>
                                        <span id="deliverystatus"></span>
                                        <div className="underline-bhk-gray"></div>
                                    </div>
                                    <div className="col-md-12">
                                        <div id="item">
                                            {
                                                Object.keys(cart).length === 0 ?
                                                    <div id="itemerror">
                                                        <img src="/images/cart.png" />
                                                        <p>Your Cart is empty!</p>
                                                        <div>You have no food added in the cart.</div>
                                                        <button className="btn btnempty"><Link to="/">Add Food</Link></button>
                                                    </div> : <> {
                                                        Object.keys(cart).map((item, index) => {
                                                            const element = cart[item];
                                                            return <> <Cartitems element={element} item={item} index={index + 1} addToFavourite={addToFavourite} removeFromCart={removeFromCart} addToCart={addToCart} /></>
                                                        })
                                                    }
                                                        <Button type="submit" variant="contained" className="btnplace" onClick={readyOrder}>place order</Button>
                                                    </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4 mt-3">
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="coupen">
                                        <div className="coupenapply">
                                            <div className="coupentext">
                                                <i className="fa fa-percent"></i>
                                                <input type="text" name="coupen" id="coupen" defaultValue={coupen} onChange={coupenApply} placeholder="Apply Coupen" />
                                            </div>
                                            <button type="button" className="btnapply" onClick={btnapply}>apply</button>
                                        </div>
                                        <div className="underline-bhk-gray"></div>
                                        <div className="coupeninfo">
                                            <span id="coupenstatus">{coupenstatus}</span>
                                            <div className="showcoupens" onClick={showcoupens}>View All Coupens</div>
                                            <div className="coupenlist">
                                                <h5>Select Coupen</h5>
                                                <span className="closecoupen" onClick={closecoupen}><CloseSharpIcon /></span>
                                                <div className="underline-bhk-gray"></div>
                                                <div className="offers">
                                                    <input type="radio" name="coupen" id="radioone" className="myRadio"
                                                        value="FIRST" onChange={coupenApply} />
                                                    <h6>FIRST</h6><br />
                                                    <span>Flat 10% off on your first order</span>
                                                </div>
                                                <div className="underline-bhk-gray"></div>
                                                <div className="offers">
                                                    <input type="radio" name="coupen" id="radiotwo" className="myRadio"
                                                        value="FOODY40" onChange={coupenApply} />
                                                    <h6>FOODY40</h6><br />
                                                    <span>Flat 40% off on your bill. Just add items above rs.500</span>
                                                </div>
                                                <div className="underline-bhk-gray"></div>
                                                <div className="offers">
                                                    <input type="radio" name="coupen" id="radiothree" className="myRadio"
                                                        value="COOL200" onChange={coupenApply} />
                                                    <h6>COOL200</h6><br />
                                                    <span>Flat rs. 200 off on your bill. Just add items above rs.800</span>
                                                </div>
                                                <div className="underline-bhk-gray"></div>
                                                <div className="offers">
                                                    <input type="radio" name="coupen" id="radiofour" className="myRadio"
                                                        value="SPRING30" onChange={coupenApply} />
                                                    <h6>SPRING30</h6><br />
                                                    <span>Flat 30% off on your bill. Just add items above rs.2000</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <div className="pricecheckout">
                                        <h6>Price Details</h6>
                                        <div className="underline-bhk-gray"></div>
                                        <div className="pricedetail">
                                            <label>Price</label>
                                            <span className="price">{totalamount}</span>
                                        </div>
                                        <div className="pricedetail">
                                            <label>Discount</label>
                                            <span className="discount">{discountamount}</span>
                                        </div>
                                        <div className="pricedetail">
                                            <label>Coupen Discount</label>
                                            <span className="coupendiscount">{coupenamount}</span>
                                        </div>
                                        <div className="pricedetail">
                                            <label>Delivery Charges <div className="info"><i className="fa fa-info-circle"></i><span className="deliveryinfo"> Free Delivery Order Above ₹500</span></div>
                                            </label>
                                            <span className="delivery">{deliverycharge}</span>
                                        </div>
                                        <div className="underline-dashed-gray"></div>
                                        <div className="pricedetail">
                                            <label>Total Amount</label>
                                            <strong><span className="finalamount">{totalamount + deliverycharge - coupenamount - discountamount}</span></strong>
                                        </div>
                                        <div className="underline-dashed-gray"></div>
                                        <div className="saving">You will save ₹<span className="saveamount">{totalamount - (totalamount + deliverycharge - coupenamount - discountamount) + deliverycharge}</span> on this order</div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3 mb-3">
                                    <div className="selectAddress_section">
                                        <h6>Select Address</h6>
                                        <div className="underline-bhk-gray"></div>
                                        {addresses &&
                                            addresses.map((address, index) => {
                                                const { city, house, landmark, pincode, place, societyname } = address;
                                                return (
                                                    <label className="myAddressLabel" key={index + 1} >
                                                        <input type="radio" name="address" value={house + " " + societyname + " " + landmark + " " + city + " " + pincode} onChange={onChangeAddress} />
                                                        <span>{house}, {societyname}, {landmark}, {city}, Gujarat-{pincode}</span>
                                                    </label>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart
