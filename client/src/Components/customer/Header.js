import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { useSelector } from 'react-redux';
import foodContext from '../../context/foody/foodContext';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { logoutUser, getUser } from "../../actions/index";

const Header = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    const { saveCart, getOwnerData, getUserData, setCart, setFavcart } = context;

    const userData = useSelector((state) => state.getUserReducer.userdata);

    const LogoutUser = async () => {
        localStorage.removeItem("token");
        dispatch(logoutUser());
        history.push("/login");
    }

    const menubar = () => {
        const headercontent = document.getElementsByClassName("headercontent")[0];
        const navbarcontainer = document.getElementsByClassName("navbarcontainer")[0];
        headercontent.classList.toggle("active");
        if (navbarcontainer.style.display === "block") {
            navbarcontainer.style.display = "none";
        }
        else {
            navbarcontainer.style.display = "block";
        }
    };

    useEffect(() => {
        const getUserDetails = async () => {
            const data = await getUserData();
            if (data) dispatch(getUser(data));
            else {
                const data = await getOwnerData();
                if (data) dispatch(getUser(data));
            }
        }
        if (localStorage.getItem("token")) {
            getUserDetails();
            let cart = JSON.parse(localStorage.getItem("cart"));
            if (cart) { setCart(cart); saveCart(cart) }
            else setCart({});
            let favcart = JSON.parse(localStorage.getItem("favcart"));
            if (favcart) setFavcart(favcart);
            else setFavcart({});
        }
    }, []);

    return (
        <>
            <header id="header">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-6">
                            <div className="logo">
                                <img src="/images/logo2.png" alt="" />
                                <h4>Foody</h4>
                            </div>
                        </div>
                        <div className="col-md-6 col-6">
                            <div className="headercontent">
                                {userData.usertype === "customer" &&
                                    <>
                                        <div className="menubar">
                                            <div className="hamburger-menu" onClick={menubar}>
                                                <div className="bar"></div>
                                            </div>
                                        </div>
                                        <ul className='navbarcontainer'>
                                            <li><Link to="/">Home</Link></li>
                                            <li><Link to="/wishlist">Yum Food</Link></li>
                                            <li><Link to="/cart">Cart</Link></li>
                                            {
                                                !userData.firstname ? <>
                                                    <li><Link to="/login">Login</Link></li>
                                                    <li><Link to="/signup">Signup</Link></li>
                                                </> : <li onClick={LogoutUser}><Link to="">Logout</Link></li>
                                            }
                                            <li>
                                                <Link to="/account">
                                                    <AccountCircleIcon />{userData.firstname ? userData.firstname : "My Account"}
                                                </Link>
                                            </li>
                                        </ul>
                                    </>}
                                {userData.usertype === "restaurant" &&
                                    <>
                                        <div className="menubar">
                                            <div className="hamburger-menu" onClick={menubar}>
                                                <div className="bar"></div>
                                            </div>
                                        </div>
                                        <ul className='navbarcontainer'>
                                            <li><Link to="/foodmanagement">Food Management</Link></li>

                                            <li onClick={LogoutUser}><Link to='/login'>Logout</Link></li>

                                            <li>
                                                <Link to="/foodmanagement" className='headerProfile'>
                                                    <AccountCircleIcon /> {userData.firstname ? userData.firstname : "My Account"}
                                                </Link>
                                            </li>
                                        </ul>
                                    </>
                                }
                                {
                                    userData.usertype === undefined &&
                                    <>
                                        <div className="menubar">
                                            <div className="hamburger-menu" onClick={menubar}>
                                                <div className="bar"></div>
                                            </div>
                                        </div>
                                        <ul className='navbarcontainer'>
                                            <li><Link to="/login">Login</Link></li>
                                            <li><Link to="/signup">Signup</Link></li>
                                        </ul>
                                    </>
                                }
                            </div>
                        </div>
                    </div>

                </div>
            </header>
        </>
    )
}

export default Header