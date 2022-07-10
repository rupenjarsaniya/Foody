import React, { useContext, useEffect, useState } from 'react';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import InfoIcon from '@material-ui/icons/Info';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { useHistory } from 'react-router-dom';
import foodContext from '../../context/foody/foodContext';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from "../../actions/index";
import AccountInfo from './AccountInfo';
import AddressMain from './AddressMain';
import swal from 'sweetalert';
import StarRatings from 'react-star-ratings';
import AccountFormValidate from '../../validation/AccountFormValidate';

const userinfobox = (e) => {
    const userInnerbox = document.querySelectorAll('.userinnerbox');
    const currentInfo = e.target.getAttribute('data_name');
    const activeUsermenu = document.getElementsByClassName("activeusermenu")[0];
    activeUsermenu.classList.remove("activeusermenu");
    e.target.className += " activeusermenu";
    userInnerbox.forEach((userInnerBoxElement) => {
        const userInnerBoxDataName = userInnerBoxElement.getAttribute("data_name");
        if (currentInfo === userInnerBoxDataName) {
            userInnerbox.forEach((element) => {
                if (element.style.display === "block") {
                    element.style.display = "none";
                }
            })
            userInnerBoxElement.style.display = "block";
        }
    })
}

const editProfileSlider = (firstname, lastname, email, phone) => {
    document.getElementsByClassName("profile_overly")[0].classList.add("active_profile");
}
const closeProfileSlide = () => document.getElementsByClassName("profile_overly")[0].classList.remove("active_profile");

const Account = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    const { getAddress, editProfile, getOrders } = context;

    const userdata = useSelector((state) => state.getUserReducer.userdata);

    // Account
    const handleCurrentUserData = (firstname, lastname, email, phone) => {
        setValues({ firstname, lastname, email, phone });
        editProfileSlider();
    }

    const updateInfo = () => {
        props.setloadingBar(10);
        const res = editProfile(values);
        if (res) {
            swal("Yey!", "Your Profile Updated", "success");
            closeProfileSlide();
        }
        else {
            swal("Oops!", "Something went wrong please try again later", "error");
            closeProfileSlide();
        }
        props.setloadingBar(100);
    }

    const { handleChange, values, setValues, errors, handleSubmit } = AccountFormValidate(updateInfo);

    const LogoutUser = async () => {
        props.setloadingBar(50);
        localStorage.removeItem("token");
        dispatch(logoutUser());
        history.push("/login");
        props.setloadingBar(100);
    }

    // Review
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [msg, setMsg] = useState("");
    const setMsgState = (e) => {
        setMsg(e.target.value);
    }

    const handleSubmitReview = async (e) => {
        try {
            e.preventDefault();
            const reviewObj = { rating, msg, name: userdata.firstname + " " + userdata.lastname };
            const res = await fetch("http://localhost:5000/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(reviewObj)
            });
            const json = await res.json();
            if (res.status === 200) {
                swal("Thank You", json, "success");
                setMsg("");
                setRating(0);
            }
            else swal("Oops...", json, "error");
        }
        catch (error) {
            console.log(error);
            swal("Oops...", "Something Went Wrong", "error");
        }
    }

    const getReviews = async () => {
        try {
            const res = await fetch("http://localhost:5000/review", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            });
            const json = await res.json();
            setReviews(json);
        }
        catch (error) {
            console.log(error);
        }
    }

    // all
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getUserDetailFun = async () => {
            if (localStorage.getItem("token")) {
                const getOrderFun = async () => {
                    const orders = await getOrders();
                    setOrders(orders);
                };
                getOrderFun();
                getAddress();
                getReviews();
            }
            else {
                history.push("/login");
            }
        }
        props.setloadingBar(50);
        getUserDetailFun();
        props.setloadingBar(100);
    }, []);

    useEffect(() => {
        props.setloadingBar(10);
        const userInnerbox = document.querySelectorAll('.userinnerbox');
        const activeusermenu = document.getElementsByClassName("activeusermenu")[0].getAttribute("data_name");
        userInnerbox.forEach((element) => {
            const elementDataName = element.getAttribute("data_name");
            if (elementDataName === activeusermenu) {
                element.style.display = "block";
            }
        });
        props.setloadingBar(100);
    }, []);

    return (
        <>
            <AccountInfo userdata={userdata} />
            <div id="account-primary-table">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="userbox">
                                <ul className="usermenubar">
                                    <li className="usermenulist " data_name="Order" onClick={userinfobox}><ShoppingCartIcon className="usermenulisticon" /> Orders</li>
                                    <li className="usermenulist activeusermenu" data_name="Address" onClick={userinfobox}><PersonPinIcon className="usermenulisticon" /> Address</li>
                                    <li className="usermenulist " data_name="About FOODY" onClick={userinfobox}><InfoIcon className="usermenulisticon" />FOODY</li>
                                    <li className="usermenulist " data_name="My Account" onClick={userinfobox}><AccountBoxIcon className="usermenulisticon" />Account</li>
                                    <li className="usermenulist " data_name="furtherwork" onClick={userinfobox}><ContactSupportIcon className="usermenulisticon" />Further</li>
                                </ul>
                                <div className="userinnerbox" data_name="Order">
                                    <div className="accordion" id="accordionPanelsStayOpenExample">
                                        {
                                            orders && orders.map(item => {
                                                console.log(item)
                                                return <>
                                                    <div className="order__container" key={item._id}>
                                                        <div className="order__orderstatusinfo">
                                                            <div className="order__status">
                                                                <p className='order__id'>Order status</p>
                                                                <p className='order__totalitems'>Order Total ({Object.keys(item.food).length} items)</p>
                                                            </div>
                                                        </div>
                                                        <div className="order__orderstatusinfo">
                                                            <div className="order__total">
                                                                <p className='order__deliverdate'>{new Date(item.createdAt).toLocaleString()}</p>
                                                                <span className='order__subtotal'>₹ {item.subtotal}.00</span>
                                                            </div>
                                                        </div>
                                                        <div className='order__detail'>
                                                            {
                                                                Object.keys(item.food).map((foodItem, index1) => {
                                                                    return <>
                                                                        <div className="order__detail__innercontainer" key={index1 + 1}>
                                                                            <div className="order__foodimage">
                                                                                <img src={item.food[foodItem].foodimg} alt="" />
                                                                            </div>
                                                                            <div className="order__fooddetail">
                                                                                <p className='order__hotelname'>{item.food[foodItem].hotel}</p>
                                                                                <p className='order__foodname'>{item.food[foodItem].foodname}</p>
                                                                                <p className='order__qty'>Qty: {item.food[foodItem].qty}</p>
                                                                                <p className='order__price'>Price: &nbsp;₹ {item.food[foodItem].price}</p>
                                                                            </div>
                                                                        </div>
                                                                    </>
                                                                })
                                                            }
                                                        </div>
                                                    </div>
                                                </>
                                            })
                                        }
                                    </div>
                                </div>
                                <AddressMain setloadingBar={props.setloadingBar} />
                                <div className="userinnerbox" data_name="About FOODY">
                                    <div className="aboutbox">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="aboutbox_info">
                                                    <div className="logo">
                                                        <img src="/images/logo2.png" alt="logo" />
                                                        <h4>foody</h4>
                                                        <p className="aboutbox_para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quod nam eum, odio sed, dolor, exercitationem impedit odit nostrum obcaecati quibusdam? Amet nisi delectus minus laudantium quasi, voluptates voluptatem consectetur.</p>
                                                        <hr />
                                                        <p className="aboutbox_para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate delectus veniam impedit possimus voluptatem ex quam commodi nihil facilis, earum est eligendi consequatur perferendis eveniet repellendus inventore quidem, debitis rem. Distinctio aliquid laborum quibusdam deleniti rerum doloremque dolor ullam, dignissimos natus ab similique. Dolorem, nostrum iste accusantium harum exercitationem ex architecto eum, rerum officia ut odio! Sit autem beatae in harum molestiae itaque, mollitia, asperiores enim sequi placeat obcaecati facere.</p>
                                                        <hr />
                                                        <p className="aboutbox_para">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam praesentium ex, voluptatibus iure ea mollitia beatae sequi aut dicta architecto dolore ducimus, rerum sapiente at libero laborum vero alias, hic dolorem! Inventore ratione minima, voluptatibus aut maxime temporibus minus esse officiis quidem fugiat harum, ab quaerat atque culpa nemo.</p>
                                                    </div>
                                                </div>
                                                <div className="reviewbox">
                                                    <div className="reviewinnerbox">
                                                        <h5 className='ratingHeading'>Give Us Suggestions</h5>
                                                        <form className='reviewForm'>
                                                            <textarea name="review" defaultValue={msg} onChange={setMsgState} placeholder='Whats the suggetions?' required></textarea>
                                                            <StarRatings
                                                                rating={rating}
                                                                starRatedColor="gold"
                                                                changeRating={(newRating) => { setRating(newRating); }}
                                                                numberOfStars={5}
                                                                name='rating'
                                                                starDimension="20px"
                                                                starHoverColor="#40a944"
                                                            />
                                                            <button type="submit" className='sendbtn' onClick={handleSubmitReview}>Send</button>
                                                        </form>
                                                    </div>
                                                    <div className="reviewsContainer">
                                                        <h6 className='review__header'>Feedbacks and Ratings</h6>
                                                        {
                                                            reviews && reviews.map((review) => {
                                                                return <div className="reviewContent" key={review._id}>
                                                                    <div className="review__info">
                                                                        <p className='review__username'>{review.name}</p>
                                                                        <p className="review__date">{new Date(review.createdAt).toLocaleDateString()}</p>
                                                                    </div>
                                                                    <StarRatings
                                                                        rating={review.rating}
                                                                        starRatedColor="gold"
                                                                        isSelectable="false"
                                                                        numberOfStars={5}
                                                                        name='rating'
                                                                        starDimension="17px"
                                                                    />
                                                                    <p className="review__msg">{review.msg}</p>
                                                                </div>
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="aboutbox_image">
                                                    <img src="/images/about.svg" alt="aboutimage" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="userinnerbox" data_name="My Account">
                                    <div className="accountbox">
                                        <div className="row">
                                            <div className="col-md-12">
                                                <div className="account_primary">
                                                    <div className="accountbox_info">
                                                        <span className="accountbox_span">Name</span>
                                                        <p className="accountbox_name">{userdata.firstname} {userdata.lastname}</p>
                                                        <span className="accountbox_span">Email</span>
                                                        <p className="accountbox_email">{userdata.email}</p>
                                                        <span className="accountbox_span">Mobile</span>
                                                        <p className="accountbox_mobile">{userdata.phone}</p>
                                                        <Button variant="outlined" className="accountbox_editprofie" onClick={() => handleCurrentUserData(userdata.firstname, userdata.lastname, userdata.email, userdata.phone)}>edit profile</Button>
                                                    </div>
                                                    <div className="profile_overly">
                                                        <div className="profile_innerbox">
                                                            <div className="profile_header">
                                                                <CloseIcon className="closebtnprofile" onClick={closeProfileSlide} />
                                                                <p className="profile_heading">edit account information</p>
                                                            </div>
                                                            <form className="myprofileform" onSubmit={handleSubmit}>
                                                                <label htmlFor="name">firstname</label>
                                                                <input type="text" name="firstname" className="myprofileinput" value={values.firstname} onChange={handleChange} />
                                                                {
                                                                    errors.firstname && <p className='formErrorSpan'>{errors.firstname}</p>
                                                                }
                                                                <label htmlFor="name">lastname</label>
                                                                <input type="text" name="lastname" className="myprofileinput" value={values.lastname} onChange={handleChange} />
                                                                {
                                                                    errors.lastname && <p className='formErrorSpan'>{errors.lastname}</p>
                                                                }
                                                                <label htmlFor="email">email</label>
                                                                <input type="email" name="email" className="myprofileinput" value={values.email} onChange={handleChange} />
                                                                {
                                                                    errors.email && <p className='formErrorSpan'>{errors.email}</p>
                                                                }
                                                                <label htmlFor="mobile">mobile</label>
                                                                <input type="text" name="phone" className="myprofileinput" value={values.phone} onChange={handleChange} />
                                                                {
                                                                    errors.phone && <p className='formErrorSpan'>{errors.phone}</p>
                                                                }
                                                                <Button type="submit" variant="contained" className="btn_profile" >Update Profile</Button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="userinnerbox" data_name="furtherwork">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="further_primary">
                                                <p className="further_header">🙂 Coming Soon...</p>
                                                <ul className="further_worklist">
                                                    <li>All set</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
            <div id="userprimarylist">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="usermenubar">
                                <ul>
                                    <li><Link to="/cart">my cart</Link></li>
                                    <li><Link to="/wishlist">my wishlist</Link></li>
                                    <li><Link to="/forgotpassword">forgot password</Link></li>
                                    <li><Link to="/changepassword">change password</Link></li>
                                    <li onClick={LogoutUser}><Link to="">logout</Link></li>
                                    <li><Link to="/">help</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Account
