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
    const { getFoodLocal, getAddress, addresses, getFavFoodLocal, orderFood, getUserDetails } = context;
    const [cart, setCart] = useState([]);

    //---------------------------------------------------------- calculate ------------------------------------------------
    const pricecal = async () => {
        // Total price calculation
        var price = document.querySelector(".price");
        let myqty = document.querySelectorAll(".myqty");
        let itemPrice = document.querySelectorAll(".itemprice");

        let itemPriceArray = [];
        let qtyArray = [];
        let cost = 0;

        itemPrice.forEach(element => {
            itemPriceArray.push(element);
        });
        myqty.forEach(function (element) {
            qtyArray.push(element);
        })

        for (let i = 0; i < itemPriceArray.length; i++) {
            cost = cost + (itemPriceArray[i].innerHTML * qtyArray[i].value);
        }

        price.innerHTML = cost;
        for (let i = 0; i < myqty.length; i++) {
            myqty[i].addEventListener('change', () => {
                cost = 0;
                itemPriceArray = [];
                qtyArray = [];
                pricecal();
                return;
            });
        }

        // Discount calculation
        var discount = document.querySelector(".discount");
        let disamount = 0;
        if (price.innerHTML >= 500) {
            disamount = price.innerHTML * 5 / 100;
        }
        if (price.innerHTML >= 1000) {
            disamount = price.innerHTML * (15 / 100);
        }
        if (price.innerHTML >= 2000) {
            disamount = price.innerHTML * (25 / 100);
        }
        if (price.innerHTML >= 4000) {
            disamount = price.innerHTML * (35 / 100);
        }
        else {
            discount.innerHTML = disamount;
        }
        discount.innerHTML = disamount;

        // Delivery charge
        var delivery = document.querySelector(".delivery");
        let del = price.innerHTML - discount.innerHTML;
        if (del < 500) {
            delivery.innerHTML = 40;
        }
        else {
            delivery.innerHTML = 0;
        }
        coupendiscoutcal();
    }
    const coupendiscoutcal = () => {
        var coupen = document.getElementById("coupen");
        var coupendiscount = document.querySelector(".coupendiscount");
        var price = document.querySelector(".price");
        var coupenstatus = document.getElementById("coupenstatus");
        let correcthtml = `<p style="color:green;">Coupen Applied <i className="fa fa-check"></i></p>`;
        let wronghtml = `<p style="color:red;">Invalid Coupen Code <i className="fa fa-times"></i></p>`;
        if (coupen.value === "FIRST") {
            coupendiscount.innerHTML = price.innerHTML * (10 / 100);
            coupenstatus.innerHTML = correcthtml;
        }
        else if (coupen.value === "FOODY40") {
            if (price.innerHTML < 500) {
                coupendiscount.innerHTML = 0;
                coupenstatus.innerHTML = wronghtml;
            }
            else {
                coupendiscount.innerHTML = price.innerHTML * (40 / 100);
                coupenstatus.innerHTML = correcthtml;
            }
        }
        else if (coupen.value === "COOL200") {
            if (price.innerHTML < 800) {
                coupendiscount.innerHTML = 0;
                coupenstatus.innerHTML = wronghtml;
            }
            else {
                coupendiscount.innerHTML = "200";
                coupenstatus.innerHTML = correcthtml;
            }
        }
        else if (coupen.value === "SPRING30") {
            if (price.innerHTML < 2000) {
                coupendiscount.innerHTML = 0;
                coupenstatus.innerHTML = wronghtml;
            }
            else {
                coupendiscount.innerHTML = price.innerHTML * (30 / 100);
                coupenstatus.innerHTML = correcthtml;
            }
        }
        else if (coupen.value === "" || coupen.value === null) {
            coupendiscount.innerHTML = 0;
            coupenstatus.innerHTML = "";
        }
        else {
            coupendiscount.innerHTML = 0;
            coupenstatus.innerHTML = wronghtml;
        }
        final();
    }
    const final = async () => {
        var finalamount = document.querySelector(".finalamount");
        var saveamount = document.querySelector(".saveamount");
        var price = document.querySelector(".price");
        var discount = document.querySelector(".discount");
        var delivery = document.querySelector(".delivery");
        var coupendiscount = document.querySelector(".coupendiscount");
        finalamount.innerHTML = parseInt(price.innerHTML) + parseInt(delivery.innerHTML) - parseInt(discount.innerHTML) - parseInt(coupendiscount.innerHTML);
        saveamount.innerHTML = parseInt(price.innerHTML) - parseInt(finalamount.innerHTML) + parseInt(delivery.innerHTML);
    }
    const btnapply = () => {
        visiblecoupens();
        coupendiscoutcal();
    }

    //---------------------------------------------------------- Delete ------------------------------------------------
    const deleteCart = async (foodname) => {
        const getFoodCart = await getFoodLocal();
        const cartArrFilter = getFoodCart.filter(element => element.foodname !== foodname);
        localStorage.setItem("yourfood", JSON.stringify(cartArrFilter));
        showCart();
    }

    //---------------------------------------------------------- Favourite ------------------------------------------------
    const addFavourite = async (foodimage, foodname, hotelname, foodrate, foodprice) => {
        // console.log(foodimage, foodname, hotelname, foodrate, foodprice);
        if (typeof (Storage) !== "undefined") {
            const localStorageFood = await getFavFoodLocal();

            // Check if already in storage
            for (let i = 0; i < localStorageFood.length; i++) {
                if (localStorageFood[i].favfoodname === foodname) {
                    alert(foodname + " Already In Wishlist");
                    return;
                }
            }
            const favouriteObj = {
                favhotelname: hotelname,
                favfoodname: foodname,
                favfoodprice: foodprice,
                favfoodimage: foodimage,
                favfoodrate: foodrate,
            }
            // console.log(favouriteObj);
            localStorageFood.push(favouriteObj);
            localStorage.setItem("yourfavourite", JSON.stringify(localStorageFood));
        }
        else {
            alert("Sorry, Your Browser Can't Support Web Storage");
        }
    }

    //---------------------------------------------------------- coupen ------------------------------------------------
    const coupenApply = (e) => {
        var coupen = document.getElementById("coupen");
        coupen.value = e.target.getAttribute("data-name");
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

    const showCart = async () => {
        props.setloadingBar(50);
        const localStorageFood = await getFoodLocal();
        setCart(localStorageFood);
        pricecal();
        props.setloadingBar(100);
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
            swal("Oops!", "Select Delivery Address and Try Again!", "error");
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
                showCart();
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
                                            <h5>My Cart ({cart.length})</h5>
                                            <input type="text" name="pincode" id="pincode" maxLength="6"
                                                placeholder="Pincode" autoComplete="off" onChange={pincode} />
                                        </div>
                                        <span id="deliverystatus"></span>
                                        <div className="underline-bhk-gray"></div>
                                    </div>
                                    <div className="col-md-12">
                                        <div id="item">
                                            {
                                                cart.length === 0 ?
                                                    <div id="itemerror">
                                                        <img src="/images/cart.png" />
                                                        <p>Your Cart is empty!</p>
                                                        <div>You have no food added in the cart.</div>
                                                        <button className="btn btnempty"><Link to="/">Add Food</Link></button>
                                                    </div> : cart.map((element, index) => {
                                                        return <> <Cartitems element={element} index={index} addFavourite={addFavourite} deleteCart={deleteCart} />
                                                            <Button Button type="submit" variant="contained" className="btnplace" onClick={readyOrder}>place order</Button>
                                                        </>
                                                    })
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
                                                <input type="text" name="coupen" id="coupen" placeholder="Apply Coupen" />
                                            </div>
                                            <button type="button" className="btnapply" onClick={btnapply}>apply</button>
                                        </div>
                                        <div className="underline-bhk-gray"></div>
                                        <div className="coupeninfo">
                                            <span id="coupenstatus"></span>
                                            <div className="showcoupens" onClick={showcoupens}>View All Coupens</div>
                                            <div className="coupenlist">
                                                <h5>Select Coupen</h5>
                                                <span className="closecoupen" onClick={closecoupen}><CloseSharpIcon /></span>
                                                <div className="underline-bhk-gray"></div>
                                                <div className="offers">
                                                    <input type="radio" name="coupen" id="radioone" className="myRadio"
                                                        data-name="FIRST" onChange={coupenApply} />
                                                    <h6>FIRST</h6><br />
                                                    <span>Flat 10% off on your first order</span>
                                                </div>
                                                <div className="underline-bhk-gray"></div>
                                                <div className="offers">
                                                    <input type="radio" name="coupen" id="radiotwo" className="myRadio"
                                                        data-name="FOODY40" onChange={coupenApply} />
                                                    <h6>FOODY40</h6><br />
                                                    <span>Flat 40% off on your bill. Just add items above rs.500</span>
                                                </div>
                                                <div className="underline-bhk-gray"></div>
                                                <div className="offers">
                                                    <input type="radio" name="coupen" id="radiothree" className="myRadio"
                                                        data-name="COOL200" onChange={coupenApply} />
                                                    <h6>COOL200</h6><br />
                                                    <span>Flat rs. 200 off on your bill. Just add items above rs.800</span>
                                                </div>
                                                <div className="underline-bhk-gray"></div>
                                                <div className="offers">
                                                    <input type="radio" name="coupen" id="radiofour" className="myRadio"
                                                        data-name="SPRING30" onChange={coupenApply} />
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
                                            <span className="price">0</span>
                                        </div>
                                        <div className="pricedetail">
                                            <label>Discount</label>
                                            <span className="discount">0</span>
                                        </div>
                                        <div className="pricedetail">
                                            <label>Coupen Discount</label>
                                            <span className="coupendiscount">0</span>
                                        </div>
                                        <div className="pricedetail">
                                            <label>Delivery Charges <div className="info"><i className="fa fa-info-circle"></i><span className="deliveryinfo"> Free Delivery Order Above ₹500</span></div>
                                            </label>
                                            <span className="delivery">0</span>
                                        </div>
                                        <div className="underline-dashed-gray"></div>
                                        <div className="pricedetail">
                                            <label>Total Amount</label>
                                            <strong><span className="finalamount">0</span></strong>
                                        </div>
                                        <div className="underline-dashed-gray"></div>
                                        <div className="saving">You will save ₹<span className="saveamount">0</span> on this order</div>
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
