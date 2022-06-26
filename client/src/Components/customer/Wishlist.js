import React, { useContext, useEffect, useState } from 'react';
import StarRateIcon from '@material-ui/icons/StarRate';
import foodContext from '../../context/foody/foodContext';
import { Link, useHistory } from 'react-router-dom';

const Wishlist = (props) => {
    const history = useHistory();
    const context = useContext(foodContext);
    const { getFavFoodLocal, getFoodLocal, getUserDetails } = context;
    const [cart, setCart] = useState([]);

    const deleteFavouriteCart = async (favfoodname) => {
        const getFavFoodCart = await getFavFoodLocal();
        const cartArrFilter = getFavFoodCart.filter(element => element.favfoodname !== favfoodname);
        localStorage.setItem("yourfavourite", JSON.stringify(cartArrFilter));
        showFavouriteCart();
    }

    const addtocart = async (favfoodimage, favhotelname, favfoodname, favfoodrate, favfoodprice) => {
        if (typeof (Storage) !== "undefined") {
            const localStorageFood = await getFoodLocal();
            for (let i = 0; i < localStorageFood.length; i++) {
                if (localStorageFood[i].foodname === favfoodname) {
                    alert(favfoodname + " Already In Cart, Please Check Out There 😄");
                    return;
                }
            }
            const cartObj = {
                hotelname: favhotelname,
                foodname: favfoodname,
                foodprice: favfoodprice,
                foodimage: favfoodimage,
                foodrate: favfoodrate,
            }
            localStorageFood.push(cartObj);
            localStorage.setItem("yourfood", JSON.stringify(localStorageFood));
        }
        else {
            alert("Sorry, Your Browser Can't Support Web Storage");
        }
    }

    const showFavouriteCart = async () => {
        props.setloadingBar(10);
        const localStorageFavFood = await getFavFoodLocal();
        setCart(localStorageFavFood);
        props.setloadingBar(100);
    }

    useEffect(() => {
        const handleGetUserData = async () => {
            if (localStorage.getItem("token")) {
                showFavouriteCart();
            }
            else {
                history.push("/login");
            }
        }
        props.setloadingBar(10);
        handleGetUserData();
        props.setloadingBar(100);
    }, [])
    return (
        <>
            <div id="wish">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="availRes">
                                <p>My Wishlist <span className="totalfavourite"></span></p>
                            </div>
                            <div className="underline-bhk-gray"></div>
                        </div>
                        <div className="col-12">
                            <div className="wishcarts">
                                {
                                    cart.length === 0 ? <>
                                        <div className="emptyContainer">
                                            <img src="images/empty.svg" alt="" className='emptyimage' />
                                            <p>Your Wishlist is Empty!</p>
                                            <div>You have no favourite food added in the cart.</div>
                                            <button className="btn btnwishempty"><Link to="/">Add Food To Wishlist</Link></button>
                                        </div>
                                    </> :
                                        cart.map((food, index) => {
                                            const { favfoodimage, favhotelname, favfoodname, favfoodrate, favfoodprice } = food;
                                            return (
                                                <div className="image" key={index + 1}>
                                                    <img src={favfoodimage} alt="" />
                                                    <h6 className="foodhotel">{favhotelname}</h6>
                                                    <p className="foodname">{favfoodname}</p>
                                                    <div className="fooddetail">
                                                        <span className="rate"><StarRateIcon style={{ fontSize: "1.1rem", marginRight: "0.5rem" }} />{favfoodrate}</span>
                                                        <div>
                                                            ₹<span className="foodprice">{favfoodprice}</span>
                                                        </div>
                                                    </div>
                                                    <div className="underline-bhk-gray"></div>
                                                    <button type="button" className="add" onClick={() => { addtocart(favfoodimage, favhotelname, favfoodname, favfoodrate, favfoodprice) }}>Add</button>
                                                    <button type="button" className="remove" onClick={() => { deleteFavouriteCart(favfoodname) }}>Remove</button>
                                                </div>
                                            )
                                        })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Wishlist
