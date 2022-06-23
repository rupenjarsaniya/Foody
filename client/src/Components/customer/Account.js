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

const editProfileSlider = () => document.getElementsByClassName("profile_overly")[0].classList.add("active_profile");
const closeProfileSlide = () => document.getElementsByClassName("profile_overly")[0].classList.remove("active_profile");

const Account = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    const { logout, logoutall, getAddress, editProfile, getOrders, getUserDetails } = context;

    const userdata = useSelector((state) => state.getUserReducer.userdata);

    // Logout
    const LogoutAll = async () => {
        props.setloadingBar(10);
        const confirm = await logoutall();
        props.setloadingBar(50);
        if (confirm) {
            dispatch(logoutUser());
            props.setloadingBar(75);
            history.push("/login");
            props.setloadingBar(100);
        }
    }

    const LogoutUser = async () => {
        props.setloadingBar(10);
        const confirm = await logout();
        props.setloadingBar(50);
        if (confirm) {
            dispatch(logoutUser());
            props.setloadingBar(75);
            history.push("/login");
            props.setloadingBar(100);
        }
    }

    // Account
    const [updateAccount, setUpdateAccount] = useState({ firstname: "", lastname: "", email: "", phone: "", age: "" });

    const updateProfile = (e) => setUpdateAccount({ ...updateAccount, [e.target.name]: e.target.value });

    const updateInfo = (e) => {
        e.preventDefault();
        props.setloadingBar(10);
        const { firstname, lastname, email, phone, age } = updateAccount;
        const res = editProfile(firstname, lastname, email, phone, age);
        props.setloadingBar(50);
        if (res) {
            swal("Yey!", "Your Profile Updated", "success");
            props.setloadingBar(100);
        }
        else {
            swal("Oops!", "Something went wrong please try again later", "error");
            props.setloadingBar(100);
        }
    }

    // Rating
    const [rating, setRating] = useState(0);

    // Review Submit
    const [msg, setMsg] = useState("");
    const setMsgState = (e) => {
        setMsg(e.target.value);
    }

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        const reviewObj = { rating, msg };
        const res = await fetch("/review", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reviewObj)
        });
        const json = await res.json();
        if (res.status === 200) {
            swal("Thank You", json + ", We will improve your suggestion.", "success");
            setMsg("");
            setRating(0);
        }
        else swal("Oops...", json, "error");
    }

    // all
    const [orders, setOrders] = useState();
    useEffect(() => {
        const getUserDetailFun = async () => {
            try {
                props.setloadingBar(10);
                const res = await getUserDetails();
                props.setloadingBar(30);
                if (res) {
                    getAddress();
                    props.setloadingBar(50);
                    const getOrderFun = async () => {
                        const order = await getOrders();
                        setOrders(order);
                        props.setloadingBar(75);
                    };
                    getOrderFun();
                    props.setloadingBar(100);
                }
                else {
                    history.push("/login");
                    props.setloadingBar(100);
                }
            }
            catch (error) { console.log(error); }
        }
        getUserDetailFun();
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
                                    <li className="usermenulist " data_name="Address" onClick={userinfobox}><PersonPinIcon className="usermenulisticon" /> Address</li>
                                    <li className="usermenulist activeusermenu" data_name="About FOODY" onClick={userinfobox}><InfoIcon className="usermenulisticon" />FOODY</li>
                                    <li className="usermenulist " data_name="My Account" onClick={userinfobox}><AccountBoxIcon className="usermenulisticon" />Account</li>
                                    <li className="usermenulist " data_name="furtherwork" onClick={userinfobox}><ContactSupportIcon className="usermenulisticon" />Further</li>
                                </ul>
                                <div className="userinnerbox" data_name="Order">
                                    <div className="accordion" id="accordionPanelsStayOpenExample">
                                        {
                                            orders && orders.map((element, index) => {
                                                return <>
                                                    <div className="order__container" key={index + 1}>
                                                        <div className="order__orderstatusinfo">
                                                            <div className="order__status">
                                                                <p className='order__id'>Order status</p>
                                                                <p className='order__totalitems'>Order Total ({element.food.length} items)</p>
                                                            </div>
                                                        </div>
                                                        <div className="order__orderstatusinfo">
                                                            <div className="order__total">
                                                                <p className='order__deliverdate'>{element.ordertime}</p>
                                                                <span className='order__subtotal'>₹ {element.subtotal}.00</span>
                                                            </div>
                                                        </div>
                                                        <div className='order__detail'>
                                                            {
                                                                element.food.map((food, index1) => {
                                                                    return <>
                                                                        <div className="order__detail__innercontainer" key={index1 + 1}>
                                                                            <div className="order__foodimage">
                                                                                <img src={food.foodimage} alt="" />
                                                                            </div>
                                                                            <div className="order__fooddetail">
                                                                                <p className='order__hotelname'>{food.hotelname}</p>
                                                                                <p className='order__foodname'>{food.foodname}</p>
                                                                                <p className='order__qty'>Qty: {food.foodQuantity}</p>
                                                                                <p className='order__price'>Price: &nbsp;₹ {food.foodprice}</p>
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
                                                            <textarea name="review" onChange={setMsgState} placeholder='Whats the suggetions?' required>{msg}</textarea>
                                                            <StarRatings
                                                                rating={rating}
                                                                starRatedColor="gold"
                                                                changeRating={(newRating) => { setRating(newRating); }}
                                                                numberOfStars={5}
                                                                name='rating'
                                                                starDimension="20px"
                                                            />
                                                            <button type="submit" className='sendbtn' onClick={handleSubmitReview}>Send</button>
                                                        </form>
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
                                                        <Button variant="outlined" className="accountbox_editprofie" onClick={editProfileSlider}>edit profile</Button>
                                                    </div>
                                                    <div className="profile_overly">
                                                        <div className="profile_innerbox">
                                                            <div className="profile_header">
                                                                <CloseIcon className="closebtnprofile" onClick={closeProfileSlide} />
                                                                <p className="profile_heading">edit account information</p>
                                                            </div>
                                                            <form method="post" className="myprofileform">
                                                                <label htmlFor="name">firstname</label>
                                                                <input type="text" name="firstname" className="myprofileinput" onChange={updateProfile} />
                                                                <label htmlFor="name">lastname</label>
                                                                <input type="text" name="lastname" className="myprofileinput" onChange={updateProfile} />
                                                                <label htmlFor="email">email</label>
                                                                <input type="email" name="email" className="myprofileinput" onChange={updateProfile} />
                                                                <label htmlFor="mobile">mobile</label>
                                                                <input type="text" name="phone" className="myprofileinput" onChange={updateProfile} />
                                                                <label htmlFor="age">age</label>
                                                                <input type="text" name="age" className="myprofileinput" onChange={updateProfile} />
                                                                <Button variant="contained" className="btn_profile" onClick={updateInfo}>change</Button>
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
                                                    <li>Some bugs will be solve</li>
                                                    <li>Website's Review Box</li>
                                                    <li>Order detail page</li>
                                                    <li>Improve User Experience</li>
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
                                    <li><Link to="/newpassword">forgot password</Link></li>
                                    <li onClick={LogoutUser}><Link to="">logout</Link></li>
                                    <li onClick={LogoutAll}><Link to="">logout all devices</Link></li>
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
