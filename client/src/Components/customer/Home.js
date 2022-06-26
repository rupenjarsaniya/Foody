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
    const { addToFavourite, removeFromFavourite, favcart, addToCart, getFood, foodServe, getFoodLocal } = context;

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
        const getFoodDetails = async () => {
            const res = await getFood();
            console.log(res);
        }

        if (!localStorage.getItem("token")) { history.push('/login'); }
        else getFoodDetails();
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
                                const { category, foodimg, hotel, foodname, price, _id } = food;
                                return <div className="image" data-name={category} key={index + 1}>
                                    <span className="icon"></span>
                                    <div className="foodimage">
                                        <img src={foodimg} alt="" />
                                    </div>
                                    <h6 className="foodhotel">
                                        {hotel}
                                        {
                                            _id in favcart
                                                ? <FavoriteIcon className="favfavicon" onClick={() => { removeFromFavourite(_id) }} />
                                                : <FavoriteIcon className="favicon" onClick={() => { addToFavourite(_id, category, foodimg, hotel, foodname, price, 1) }} />
                                        }
                                    </h6>
                                    <p className="foodname">{foodname}</p>
                                    <div className="fooddetail">
                                        <div>
                                            ₹<span className="foodprice"> {price}</span>
                                        </div>
                                    </div>
                                    <div className="underline-bhk-gray"></div>
                                    <button type="button" className="add" onClick={() => { addToCart(_id, category, foodimg, hotel, foodname, price, 1) }}>Add</button>

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
