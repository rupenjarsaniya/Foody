import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRateIcon from '@material-ui/icons/StarRate';
import foodContext from '../../context/foody/foodContext';
import Primaryheader from './Primaryheader';
import { useHistory } from 'react-router-dom';
import { getUser } from '../../actions/index';
import { useDispatch } from 'react-redux';

const Home = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    const { getFood, foodServe, getFoodLocal, getUserData } = context;
    const [inCart, setInCart] = useState(false);

    // Add to cart
    const cart = async (category, img, hotel, foodName, rate, price) => {
        if (typeof (Storage) !== "undefined") {
            const localStorageFood = await getFoodLocal();
            for (let i = 0; i < localStorageFood.length; i++) {
                if (localStorageFood[i].foodname === foodName) {
                    alert(foodName + " Already In Cart, Please Check Out There 😄");
                    return;
                }
            }
            const cartObj = {
                hotelname: hotel,
                foodname: foodName,
                foodprice: price,
                foodimage: img,
                foodrate: rate,
            }
            localStorageFood.push(cartObj);
            localStorage.setItem("yourfood", JSON.stringify(localStorageFood));
            // foodDone();
        }
        else {
            alert("Sorry, Your Browser Can't Support Web Storage");
        }
    }

    // Add to wishlist
    const addFavourite = (category, img, hotel, foodName, rate, price) => {
        // console.log(category, img, hotel, foodName, rate, price);
        let favouriteArr;
        if (typeof (Storage) !== "undefined") {
            let getFavourite = localStorage.getItem("yourfavourite");
            if (getFavourite === null) {
                favouriteArr = [];
            }
            else {
                favouriteArr = JSON.parse(getFavourite);
            }
            // Check if already in storage
            for (let i = 0; i < favouriteArr.length; i++) {
                if (favouriteArr[i].favfoodname === foodName) {
                    alert(foodName + " Already In Wishlist Please Go And Check Out There 😃");
                    return;
                }
            }
            const favouriteObj = {
                favhotelname: hotel,
                favfoodname: foodName,
                favfoodprice: price,
                favfoodimage: img,
                favfoodrate: rate,
            }
            favouriteArr.push(favouriteObj);
            localStorage.setItem("yourfavourite", JSON.stringify(favouriteArr));
        }
        else {
            alert("Sorry, Your Browser Can't Support Web Storage");
        }
    }

    // Food category
    const [item, setItem] = useState(foodServe);
    const allCategories = ["All", ...new Set(foodServe.map((element) => element.category))];

    const filterFood = (categoryFood) => {
        const updatedFoods = foodServe.filter((curEle) => {
            return curEle.category === categoryFood;
        });
        setItem(updatedFoods);
        if (categoryFood === "All") {
            setItem(foodServe);
        }
    }

    useEffect(() => {
        props.setloadingBar(10);
        const getFoodDetails = async () => await getFood();

        const getUserDetails = async () => {
            const res = await getUserData();
            if (res) dispatch(getUser(res));
            else history.push('/login');
        }

        getUserDetails();
        props.setloadingBar(50);
        getFoodDetails();
        props.setloadingBar(100);
    }, []);

    useEffect(() => {
        props.setloadingBar(10);
        setItem(foodServe);
        props.setloadingBar(100);
    }, [foodServe]);


    return (
        <>
            <Primaryheader setloadingBar={props.setloadingBar} />
            <div id="slider">
                <div className="slide">
                    <div className="sliderimage">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-6">
                                    <span>Your Favorite Food Delivered Hot & Fresh</span>
                                    <p>Healthy switcher chefs do all the prep work, like peeding,<br /> chopping & marinating, so
                                        you
                                        can cook a fresh food</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="foodcounter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="availRes">
                                <p>{item.length} Foods For You 😄</p>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="filter">
                                {
                                    allCategories.map((category, index) => {
                                        return (
                                            <span key={index + 1} className="item active" data-name={category} onClick={() => filterFood(category)}>{category}</span>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    <div className="underline-bhk-gray"></div>
                    <div className="gallery">
                        {
                            item.map((food, index) => {
                                const { category, foodimg, hotel, foodname, rate, price } = food;
                                return <div className="image" data-name={category} key={index + 1}>
                                    <span className="icon"></span>
                                    <div className="foodimage">
                                        <img src={foodimg} alt="" />
                                        {/* <div className="overlyblack"></div>
                                        <div className="overlygreen"></div> */}
                                    </div>
                                    <h6 className="foodhotel">{hotel}<FavoriteIcon className="favicon" onClick={() => { addFavourite(category, foodimg, hotel, foodname, rate, price) }} /></h6>
                                    <p className="foodname">{foodname}</p>
                                    <div className="fooddetail">
                                        <span className="rate"><StarRateIcon style={{ fontSize: "1.1rem", marginRight: "0.5rem" }} />{rate}</span>
                                        <div>
                                            ₹<span className="foodprice"> {price}</span>
                                        </div>
                                    </div>
                                    <div className="underline-bhk-gray"></div>
                                    {
                                        inCart ? <button type="button" className="add" onClick={alert(`${foodname} Already in cart`)}>Added</button> :
                                            <button type="button" className="add" onClick={() => { cart(category, foodimg, hotel, foodname, rate, price) }}>Add</button>
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default Home
