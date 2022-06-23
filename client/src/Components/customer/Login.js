import React, { useContext, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import { getUser } from '../../actions/index';
import foodContext from '../../context/foody/foodContext';
import { useDispatch } from 'react-redux';
import swal from 'sweetalert';

const Login = (props) => {
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    const { getUserDetails } = context;
    document.title = "Foody - Login"
    const history = useHistory();
    const [usertype, setUserType] = useState("customer");
    const [userLogin, setUserLogin] = useState({ email: "", password: "" });
    const userData = (e) => {
        setUserLogin({ ...userLogin, [e.target.name]: e.target.value });
    };

    const exitUserData = async (e) => {
        e.preventDefault();
        props.setloadingBar(10);
        try {
            const res = await fetch("/login/" + usertype, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userLogin)
            });
            props.setloadingBar(50);
            const json = await res.json();
            if (res.status === 200 && json) {
                dispatch(getUser(json.findData));
                props.setloadingBar(75);
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

    const handleUsertype = e => e.target.checked ? setUserType("restaurant") : setUserType("customer");

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
                                    <form id="myLogin">
                                        <div className="switchContainer">
                                            <span className="userType">Customer</span>
                                            <div className="form-check form-switch innerswitchContainer">
                                                <input className="form-check-input switch" type="checkbox" role="switch" id="flexSwitchCheckChecked" onChange={handleUsertype} />
                                            </div>
                                            <span className="userType">Restaurant</span>
                                        </div>

                                        <div>
                                            <label htmlFor="Email ID" className='is-valid'>Email ID<span className="required">*</span></label>
                                            <input type="email" name="email" id="email" className="myInput" required="required" autoComplete="off" onChange={userData} />
                                            <span className='invalid-feedback'>Email address is not valid</span>
                                        </div>

                                        <div>
                                            <label htmlFor="Password" className='is-valid'>Password<span className="required">*</span></label>
                                            <input type="password" name="password" id="password" className="myInput" required="required" autoComplete="off" onChange={userData} />
                                            <span className='invalid-feedback'>Must have Uppercase, Lowercase, Number, Any Speacial character and length must be between 8 to 16</span>
                                        </div>

                                        <p className="forgot"><Link to="/">Forgot Password?</Link></p>
                                        <Button size="small" type="submit" variant="contained" className="btnsubmit" onClick={exitUserData}>Login</Button>
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
