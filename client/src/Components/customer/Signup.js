import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { getUser } from '../../actions/index';
import foodContext from '../../context/foody/foodContext';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { useEffect } from 'react';

const Signup = (props) => {
    // When useContext is use then form's useState not working
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    const { getUserDetails } = context;
    const history = useHistory();
    const [usertype, setUsertype] = useState("customer");

    const [newCustomer, setNewCustomer] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
        usertype: usertype
    });

    const [newRestaurant, setNewRestaurant] = useState({
        ownername: "",
        hotelname: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
        usertype: usertype
    });

    const handleUsertype = e => e.target.checked ? setUsertype("restaurant") : setUsertype("customer");

    const newCustomerData = (e) => {
        setNewCustomer({
            ...newCustomer, [e.target.name]: e.target.value
        });
    }

    const newRestaurantData = (e) => {
        setNewRestaurant({
            ...newRestaurant, [e.target.name]: e.target.value
        });
    }

    const sendNewUserData = async (e) => {
        e.preventDefault();
        props.setloadingBar(10);
        let userData = {};
        usertype === "customer" ? userData = { ...newCustomer } : userData = { ...newRestaurant }
        try {
            console.log(usertype);
            const res = await fetch("/signup/" + usertype, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            })
            props.setloadingBar(30);
            const json = await res.json();
            if (res.status === 200 && json) {
                props.setloadingBar(50);
                const data = await getUserDetails();
                dispatch(getUser(data));
                props.setloadingBar(75);
                if (usertype === 'customer') {
                    history.push("/");
                }
                else if (usertype === 'restaurant') {
                    history.push("/foodmanagement");
                }
                props.setloadingBar(100);
            }
            else {
                props.setloadingBar(100);
                swal("Oops!", json.error, "error");
            }
        }
        catch (error) {
            props.setloadingBar(100);
            swal("Oops!", "Something went wrong, please try again later", "error");
        }
    }

    useEffect(() => {
        const getUserData = async () => {
            props.setloadingBar(50);
            const res = await getUserDetails();
            if (res) {
                props.setloadingBar(100);
                history.push("/");
            }
            props.setloadingBar(100);
        }
        getUserData()
    }, []);

    return (
        <>
            <div id="singup-content">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="formdetail">
                                <div className="header">
                                    <h6>Join Foody</h6>
                                    <h3>Create Your Account</h3>
                                </div>
                                <div className="signupform">
                                    <form id="mySignup">
                                        <div className="switchContainer">
                                            <span className="userType">Customer</span>
                                            <div className="form-check form-switch innerswitchContainer">
                                                <input className="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleUsertype} />
                                            </div>
                                            <span className="userType">Restaurant</span>
                                        </div>

                                        {
                                            usertype === "customer" ?
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div>
                                                            <label htmlFor="firstname" className='is-valid'>Firstname <span className="required">*</span></label>
                                                            <input type="text"
                                                                name="firstname"
                                                                id="firstname"
                                                                className="myInput"
                                                                required onChange={newCustomerData} />
                                                            <span className='invalid-feedback'>Firstname Must Have atleast 2 Characters</span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="lastname" className='is-valid'>Lastname <span className="required">*</span></label>
                                                            <input type="text"
                                                                name="lastname"
                                                                id="lastname"
                                                                className="myInput"
                                                                required onChange={newCustomerData} />
                                                            <span className='invalid-feedback'>Lastname Must Have atleast 2 Characters</span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobile" className='is-valid'>Mobile Number <span className="required">*</span></label>
                                                            <input type="text"
                                                                name="phone"
                                                                id="phone"
                                                                className="myInput"
                                                                required onChange={newCustomerData} />
                                                            <span className='invalid-feedback'>Contact No. Must Have 10 Digits</span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6">
                                                        <div>
                                                            <label htmlFor="Email ID" className='is-valid'>Email ID <span className="required">*</span></label>
                                                            <input type="email"
                                                                name="email"
                                                                id="email"
                                                                className="myInput" required onChange={newCustomerData} />
                                                            <span className='invalid-feedback'>Email address is not valid</span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="password" className='is-valid'>Password
                                                                <span className="required">*</span>
                                                                <div className="info">
                                                                    <i className="fa fa-info-circle infoicon"></i>
                                                                    <div className="passwordinfo">
                                                                        <span className="pass-info"><i className="fa fa-check"></i> Password Must Be
                                                                            8 to 16 Character Long</span>
                                                                        <span className="pass-info"><i className="fa fa-check"></i> Must Have a
                                                                            Capital Character</span>
                                                                        <span className="pass-info"><i className="fa fa-check"></i> Must Have
                                                                            Special Character</span>
                                                                        <span className="pass-info"><i className="fa fa-check"></i> Must Have a
                                                                            Number</span>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <input type="password"
                                                                name="password"
                                                                id="password"
                                                                className="myInput"
                                                                required onChange={newCustomerData} />
                                                            <span className='invalid-feedback'>Must have Uppercase, Lowercase, Number, Any Speacial character and length must be between 8 to 16</span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="confirmpassword" className='is-valid'>Confirm Password <span
                                                                className="required">*</span></label>
                                                            <input type="password"
                                                                name="confirmpassword"
                                                                id="confirmpassword"

                                                                className="myInput" required onChange={newCustomerData} />
                                                            <span className='invalid-feedback'>Password Not Match</span>
                                                        </div>
                                                    </div>
                                                </div> :
                                                <div className="row">
                                                    <div className="col-md-6">
                                                        <div>
                                                            <label htmlFor="ownername" className='is-valid'>Ownername <span className="required">*</span></label>
                                                            <input type="text"
                                                                name="ownername"
                                                                id="ownername"
                                                                className="myInput"
                                                                required onChange={newRestaurantData} />
                                                            <span className='invalid-feedback'>Ownername Must Have atleast 2 Characters</span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="hotelname" className='is-valid'>Hotelname <span className="required">*</span></label>
                                                            <input type="text"
                                                                name="hotelname"
                                                                id="hotelname"
                                                                className="myInput"
                                                                required onChange={newRestaurantData} />
                                                            <span className='invalid-feedback'>Hotelname Must Have atleast 2 Characters</span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="mobile" className='is-valid'>Mobile Number <span className="required">*</span></label>
                                                            <input type="text"
                                                                name="phone"
                                                                id="phone"
                                                                className="myInput"
                                                                required onChange={newRestaurantData} />
                                                            <span className='invalid-feedback'>Contact No. Must Have 10 Digits</span>
                                                        </div>

                                                    </div>
                                                    <div className="col-md-6">
                                                        <div>
                                                            <label htmlFor="Email ID" className='is-valid'>Email ID <span className="required">*</span></label>
                                                            <input type="email"
                                                                name="email"
                                                                id="email"
                                                                className="myInput" required onChange={newRestaurantData} />
                                                            <span className='invalid-feedback'>Email address is not valid</span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="password" className='is-valid'>Password
                                                                <span className="required">*</span>
                                                                <div className="info">
                                                                    <i className="fa fa-info-circle infoicon"></i>
                                                                    <div className="passwordinfo">
                                                                        <span className="pass-info"><i className="fa fa-check"></i> Password Must Be
                                                                            8 to 16 Character Long</span>
                                                                        <span className="pass-info"><i className="fa fa-check"></i> Must Have a
                                                                            Capital Character</span>
                                                                        <span className="pass-info"><i className="fa fa-check"></i> Must Have
                                                                            Special Character</span>
                                                                        <span className="pass-info"><i className="fa fa-check"></i> Must Have a
                                                                            Number</span>
                                                                    </div>
                                                                </div>
                                                            </label>
                                                            <input type="password"
                                                                name="password"
                                                                id="password"
                                                                className="myInput"
                                                                required onChange={newRestaurantData} />
                                                            <span className='invalid-feedback'>Must have Uppercase, Lowercase, Number, Any Speacial character and length must be between 8 to 16</span>
                                                        </div>
                                                        <div>
                                                            <label htmlFor="confirmpassword" className='is-valid'>Confirm Password <span
                                                                className="required">*</span></label>
                                                            <input type="password"
                                                                name="confirmpassword"
                                                                id="confirmpassword"

                                                                className="myInput" required onChange={newRestaurantData} />
                                                            <span className='invalid-feedback'>Password Not Match</span>
                                                        </div>
                                                    </div>
                                                </div>
                                        }
                                        <Button type="submit" size="small" variant="contained" className="btnsignup" onClick={sendNewUserData}>signup</Button>
                                        <p className="login">Alredy Have An Account? <a href="./login">Login Here!</a></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup
