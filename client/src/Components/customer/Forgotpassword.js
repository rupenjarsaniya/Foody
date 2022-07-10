import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link, useHistory, useParams, useRouter } from 'react-router-dom';
import foodContext from '../../context/foody/foodContext';
import swal from 'sweetalert';
import ForgotValidate from '../../validation/ForgotValidate';

const Forgotpassword = (props) => {
    const history = useHistory();
    const context = useContext(foodContext);
    const { } = context;

    const [passwords, setPasswords] = useState({
        password: "", confirmpassword: ""
    });
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState(null);
    const [show, setShow] = useState(false);

    const handlePasswords = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    // Send Otp
    const sendOtp = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/sendotp", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        });
        const json = await res.json();
        if (json.success) {
            swal("Success", json.message, "success");
        }
        else {
            swal("Oops!", json.error, "error");
        }
    }

    // Send Link
    const sendLink = async (e) => {
        e.preventDefault();
        const data = { canSendEmail: true, email, otp }
        const res = await fetch("http://localhost:5000/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const json = await res.json();
        if (json.success) {
            swal("Success", json.message, "success");
        }
        else {
            swal("Oops!", json.error, "error");
        }
    }

    const sendNewPass = async () => {
        const search = history.location.search;
        const token = new URLSearchParams(search).get('token');
        // const data = { canSendEmail: false, email, password: passwords.password, confirmpassword: passwords.confirmpassword }
        values.canSendEmail = false;
        values.email = email;
        const res = await fetch("http://localhost:5000/forgotpassword", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            },
            body: JSON.stringify(values)
        });
        const json = await res.json();
        console.log(json);
        if (json.success) {
            swal("Success", json.message, "success");
        }
        else {
            swal("Oops!", json.error, "error");
        }
    }


    const { handleChange, values, errors, handleSubmit } = ForgotValidate(sendNewPass);

    useEffect(() => {
        if (history.location.search) {
            setShow(true);
        }
        else {
            setShow(false);
        }
    }, [history.location]);

    return (
        <>
            <div id="login_content">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="formdetail">
                                <div className="header">
                                    <h3>Forgot Password</h3>
                                </div>
                                {
                                    !show ? <div className="loginform">
                                        <form id="myLogin">
                                            <label>Email</label><span className="required">*</span>
                                            <input type="email" name="email" className="myInput" onChange={(e) => setEmail(e.target.value)} required autoComplete="off" />

                                            <Button size="small" type="submit" variant="contained" onClick={sendOtp} className="btnsubmit">Send OTP</Button>

                                            <label>OTP</label><span className="required">*</span>
                                            <input type="number" name="otp" className="myInput" onChange={(e) => setOtp(e.target.value)} required autoComplete="off" maxLength={6} />

                                            <Button size="small" type="submit" variant="contained" onClick={sendLink} className="btnsubmit">Continue</Button>
                                        </form>
                                        <p className="forgotpassword"><Link to="/">Back to home</Link></p>
                                    </div> :
                                        <div className="loginform">
                                            <form id="myLogin" onSubmit={handleSubmit}>
                                                <label htmlFor="newpassword">New Password</label><span className="required">*</span>
                                                <input type="password" name="password" onChange={handleChange} className="myInput" required autoComplete="off" />
                                                {
                                                    errors.password && <p className='formErrorSpan'>{errors.password}</p>
                                                }
                                                <label htmlFor="confirmnewpassword">Confirm New Password</label><span className="required">*</span>
                                                <input type="password" name="confirmpassword" onChange={handleChange} className="myInput" required autoComplete="off" />
                                                {
                                                    errors.confirmpassword && <p className='formErrorSpan'>{errors.confirmpassword}</p>
                                                }
                                                <Button size="small" type="submit" variant="contained" className="btnsubmit">Change Password</Button>
                                            </form>
                                            <p className="forgotpassword"><Link to="/">Back to home</Link></p>
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Forgotpassword
