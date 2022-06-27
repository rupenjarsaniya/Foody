import React, { useState, useContext } from 'react';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import { getUser } from '../../actions/index';
import foodContext from '../../context/foody/foodContext';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import { useEffect } from 'react';
import SignupFormValidate from '../../validation/SignupFormValidate';

const Signup = (props) => {
    // When useContext is use then form's useState not working
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    const { getUserDetails } = context;
    const history = useHistory();
    const [usertype, setUsertype] = useState("customer");

    const handleUsertype = e => {
        if (e.target.checked) {
            setUsertype("restaurant");
        }
        else {
            setUsertype("customer");
        }
    }

    const sendNewUserData = async () => {
        props.setloadingBar(10);
        try {
            const res = await fetch("http://localhost:5000/signup/" + usertype, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            })
            const json = await res.json();
            if (res.status === 200 && json) {
                props.setloadingBar(50);
                localStorage.setItem("token", json.token);
                dispatch(getUser(json.registerSuccess));
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
            console.log(error);
            props.setloadingBar(100);
            swal("Oops!", "Something went wrong, please try again later", "error");
        }
    }

    const { handleChange, values, errors, handleSubmit } = SignupFormValidate(sendNewUserData);

    useEffect(() => {
        props.setloadingBar(50);
        if (localStorage.getItem("token")) history.goBack();
        props.setloadingBar(100);
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
                                    <form id="mySignup" onSubmit={handleSubmit}>
                                        <div className="switchContainer">
                                            <span className="userType">Customer</span>
                                            <div className="form-check form-switch innerswitchContainer">
                                                <input className="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleUsertype} />
                                            </div>
                                            <span className="userType">Restaurant</span>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div>
                                                    <label htmlFor="firstname">Firstname <span className="required">*</span></label>
                                                    <input type="text"
                                                        name="firstname"
                                                        id="firstname"
                                                        className="myInput"
                                                        required
                                                        onChange={handleChange} />
                                                    {
                                                        errors.firstname && <p className='formErrorSpan'>{errors.firstname}</p>
                                                    }
                                                </div>
                                                <div>
                                                    <label htmlFor="lastname">Lastname <span className="required">*</span></label>
                                                    <input type="text"
                                                        name="lastname"
                                                        id="lastname"
                                                        className="myInput"
                                                        required
                                                        onChange={handleChange} />
                                                    {
                                                        errors.lastname && <p className='formErrorSpan'>{errors.lastname}</p>
                                                    }
                                                </div>
                                                <div>
                                                    <label htmlFor="mobile">Mobile Number <span className="required">*</span></label>
                                                    <input type="number"
                                                        name="phone"
                                                        id="phone"
                                                        className="myInput"
                                                        required
                                                        onChange={handleChange}
                                                        maxLength={10}
                                                    />
                                                    {
                                                        errors.phone && <p className='formErrorSpan'>{errors.phone}</p>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div>
                                                    <label htmlFor="Email ID">Email ID <span className="required">*</span></label>
                                                    <input type="email"
                                                        name="email"
                                                        id="email"
                                                        className="myInput"
                                                        required
                                                        onChange={handleChange} />
                                                    {
                                                        errors.email && <p className='formErrorSpan'>{errors.email}</p>
                                                    }
                                                </div>
                                                <div>
                                                    <label htmlFor="password">Password
                                                        <span className="required">*</span>
                                                        <div className="info">
                                                            <i className="fa fa-info-circle infoicon"></i>
                                                            <div className="passwordinfo">
                                                                <span className="pass-info"><i className="fa fa-check"></i> Password Must Be
                                                                    8 Character Long</span>
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
                                                        required
                                                        onChange={handleChange} />
                                                    {
                                                        errors.password && <p className='formErrorSpan'>{errors.password}</p>
                                                    }
                                                </div>
                                                <div>
                                                    <label htmlFor="confirmpassword">Confirm Password <span
                                                        className="required">*</span></label>
                                                    <input type="password"
                                                        name="confirmpassword"
                                                        id="confirmpassword"
                                                        className="myInput"
                                                        required
                                                        onChange={handleChange} />
                                                    {
                                                        errors.confirmpassword && <p className='formErrorSpan'>{errors.confirmpassword}</p>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <Button type="submit" size="small" variant="contained" className="btnsignup">signup</Button>
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
