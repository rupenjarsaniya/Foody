import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { getUser } from '../../actions/index';
import foodContext from '../../context/foody/foodContext';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';
import LoginFormValidate from '../../validation/LoginFormValidate';

const Login = (props) => {
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    document.title = "Foody - Login"
    const history = useHistory();
    const [usertype, setUserType] = useState("customer");

    const exitUserData = async () => {
        props.setloadingBar(50);
        try {
            const res = await fetch("http://localhost:5000/login/" + usertype, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values)
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                dispatch(getUser(json.findData));
                localStorage.setItem("token", json.token);
                if (usertype === 'customer') {
                    history.push("/");
                }
                else if (usertype === 'restaurant') {
                    history.push("/foodmanagement");
                }
            }
            else {
                swal("Oops!", json.error, "error");
            }
        }
        catch (error) {
            swal("Oops!", "Something went wrong, please try again later", "error");
        }
        props.setloadingBar(100);
    };

    const { handleChange, values, errors, handleSubmit } = LoginFormValidate(exitUserData);

    const handleUsertype = e => e.target.checked ? setUserType("restaurant") : setUserType("customer");

    useEffect(() => {
        props.setloadingBar(50);
        if (localStorage.getItem("token")) history.goBack();
        props.setloadingBar(100);
    }, []);
    return (
        <>
            <div id="login_content">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="formdetail">
                                <div className="header">
                                    <h2>Login to FOODY</h2>
                                </div>
                                <div className="loginform">
                                    <form id="myLogin" onSubmit={handleSubmit}>

                                        <div className="switchContainer">
                                            <span className="userType">Customer</span>
                                            <div className="form-check form-switch innerswitchContainer">
                                                <input className="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleUsertype} />
                                            </div>
                                            <span className="userType">Restaurant</span>
                                        </div>

                                        <div>
                                            <label htmlFor="Email ID" className='label'>Email ID<span className="required">*</span></label>
                                            <input type="text" name="email" id="email" className="myInput" required="required" autoComplete="off" onChange={handleChange} />
                                            {
                                                errors.email && <p className='formErrorSpan'>{errors.email}</p>
                                            }
                                        </div>

                                        <div>
                                            <label htmlFor="Password" className='label'>Password<span className="required">*</span></label>
                                            <input type="password" name="password" id="password" className="myInput" required="required" autoComplete="off" onChange={handleChange} />
                                            {
                                                errors.password && <p className='formErrorSpan'>{errors.password}</p>
                                            }
                                        </div>

                                        <p className="forgot"><Link to="/">Forgot Password?</Link></p>
                                        <Button size="small" type="submit" variant="contained" className="btnsubmit">Login</Button>
                                        <p className="signup">New At Foody? <Link to="./signup">Signup Here!</Link></p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Login
