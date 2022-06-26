import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@material-ui/icons/Favorite';
import StarRateIcon from '@material-ui/icons/StarRate';
import foodContext from '../../context/foody/foodContext';
import { Link, useHistory } from 'react-router-dom';

const Wishlist = (props) => {
    const history = useHistory();
    const context = useContext(foodContext);
    const { favcart, addToFavourite, removeFromFavourite, clearFavourite, addToCart } = context;
    console.log(favcart);

    useEffect(() => {
        props.setloadingBar(10);
        if (!localStorage.getItem("token")) { history.push("/login"); }
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
                                    Object.keys(favcart).length === 0 ? <>
                                        <div className="emptyContainer">
                                            <img src="images/empty.svg" alt="" className='emptyimage' />
                                            <p>Your Wishlist is Empty!</p>
                                            <div>You have no favourite food added in the cart.</div>
                                            <button className="btn btnwishempty"><Link to="/">Add Food To Wishlist</Link></button>
                                        </div>
                                    </> :
                                        Object.keys(favcart).map((item, index) => {
                                            return (
                                                <div className="image" key={index + 1}>
                                                    <img src={favcart[item].foodimg} alt="" />
                                                    <h6 className="foodhotel">{favcart[item].hotel}
                                                        {
                                                            item in favcart
                                                                ? <FavoriteIcon className="favfavicon" onClick={() => { removeFromFavourite(item) }} />
                                                                : <FavoriteIcon className="favicon" onClick={() => { addToFavourite(item, favcart[item].category, favcart[item].foodimg, favcart[item].hotel, favcart[item].foodname, favcart[item].price, 1) }} />
                                                        }
                                                    </h6>
                                                    <p className="foodname">{favcart[item].foodname}</p>
                                                    <div className="fooddetail">
                                                        <div>
                                                            ₹<span className="foodprice">{favcart[item].price}</span>
                                                        </div>
                                                    </div>
                                                    <div className="underline-bhk-gray"></div>
                                                    <button type="button" className="add" onClick={() => { addToCart(item, favcart[item].category, favcart[item].foodimg, favcart[item].hotel, favcart[item].foodname, favcart[item].price, favcart[item].qty) }}>Add</button>
                                                    <button type="button" className="remove" onClick={() => { removeFromFavourite(item) }}>Remove</button>
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
