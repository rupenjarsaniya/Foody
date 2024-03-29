import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import foodContext from '../../context/foody/foodContext';
import Button from '@material-ui/core/Button';
import CloseSharpIcon from '@material-ui/icons/CloseSharp';
import swal from 'sweetalert';
import Cartitems from './Cartitems';
import { useSelector } from 'react-redux';
import { logoutUser } from '../../actions';

const Cart = (props) => {
    const history = useHistory();
    const context = useContext(foodContext);
    const { addToCart, removeFromCart, clearCart, cart, addToFavourite, getFoodLocal, getAddress, addresses, getFavFoodLocal, orderFood, getUserDetails, totalamount, deliverycharge, discountamount } = context;

    const userdata = useSelector((state) => state.getUserReducer.userdata);

    const [pincodes, setPincodes] = useState({});
    const [coupen, setCoupen] = useState("");
    const [coupenstatus, setCoupenstatus] = useState("");
    const [coupenamount, setCoupenamount] = useState(0);
    const [finalamount, setFinalamount] = useState(0);

    // Coupen
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
            setCoupenamount(0);
            setCoupenstatus("Invalid Coupen Code");
        }
    }

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

    // Pincode
    const getPincodes = async () => {
        const res = await fetch("/pincodes", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const json = await res.json();
        setPincodes(json);
    }

    // Order
    const [deliveryAddress, setDeliveryAddress] = useState("");
    const onChangeAddress = (e) => {
        setDeliveryAddress(e.target.value);
    }

    const readyOrder = async () => {
        const name = userdata.firstname + " " + userdata.lastname;
        if (deliveryAddress === "") {
            swal("Oops!", "Please select delivery address!", "warning");
            return;
        }
        if (Object.keys(cart).length === 0) {
            swal("Oops!", "Cart is Empty!", "warning");
            return;
        }
        let oid = Math.floor(Math.random() * Date.now());
        let res = await orderFood(cart, oid, totalamount, finalamount, coupen, discountamount, deliverycharge, deliveryAddress, name, userdata.email, userdata.phone);

        if (res.success == true) {
            const txnToken = res.data.txnToken;

            var config = {
                "root": "",
                "flow": "DEFAULT",
                "data": {
                    "orderId": oid,
                    "token": txnToken,
                    "tokenType": "TXN_TOKEN",
                    "amount": finalamount
                },
                "handler": {
                    "notifyMerchant": function (eventName, data) {
                        console.log("notifyMerchant handler function called");
                        console.log("eventName => ", eventName);
                        console.log("data => ", data);
                    }
                }
            };

            if (window.Paytm && window.Paytm.CheckoutJS) {
                window.Paytm.CheckoutJS.init(config)
                    .then(function onSuccess() {
                        window.Paytm.CheckoutJS.invoke();
                    })
                    .catch(function onError(error) {
                        console.log("error => ", error);
                    });
            }

            clearCart({});
            setDeliveryAddress("");
        }
        else {
            swal("Oops!", res.error, "error");
            clearCart();
        }

    }

    useEffect(() => {
        const handleFun = async () => {
            if (localStorage.getItem("token")) {
                props.setloadingBar(50);
                getPincodes();
                getAddress();
                if (Object.keys(cart).length === 0) {
                    setCoupen("");
                    setCoupenstatus("");
                    setCoupenamount(0);
                }
            }
            else {
                history.push("/login");
            }
        }
        props.setloadingBar(10);
        handleFun();
        props.setloadingBar(100);
    }, []);

    useEffect(() => {
        setFinalamount(totalamount + deliverycharge - coupenamount - discountamount);
    }, [totalamount]);

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
                                            {/* <input type="text" name="pincode" id="pincode" maxLength="6"
                                                placeholder="Pincode" autoComplete="off" /> */}
                                        </div>
                                        {/* <span id="deliverystatus"></span> */}
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
                                                            return <Cartitems key={index + 1} element={element} item={item} index={index + 1} addToFavourite={addToFavourite} removeFromCart={removeFromCart} addToCart={addToCart} />
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
                                            <button type="button" className="btnapply">apply</button>
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
                                            <strong><span className="finalamount">{finalamount}</span></strong>
                                        </div>
                                        <div className="underline-dashed-gray"></div>
                                        <div className="saving">You will save ₹<span className="saveamount">{totalamount - (totalamount + deliverycharge - coupenamount - discountamount) + deliverycharge}</span> on this order</div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3 mb-3">
                                    <div className="selectAddress_section">
                                        <h6>Select Address</h6>
                                        <div className="underline-bhk-gray"></div>
                                        {
                                            addresses &&
                                            addresses.map((address, index) => {
                                                const { city, house, landmark, pincode, place, societyname } = address;
                                                return (
                                                    <label className="myAddressLabel" key={index + 1} >
                                                        <input type="radio" name="address" value={house + ", " + societyname + ", " + landmark + ", " + city + ", " + pincode} onChange={onChangeAddress} />
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
