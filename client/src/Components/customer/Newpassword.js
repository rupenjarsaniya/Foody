import React, { useState, useContext, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';
import foodContext from '../../context/foody/foodContext';
import swal from 'sweetalert';

const Newpassword = (props) => {
    const history = useHistory();
    const context = useContext(foodContext);
    const { changePassword } = context;

    const [newPassword, setNewPassword] = useState({ password: "", confirmpassword: "" });
    const onChangePass = (e) => {
        setNewPassword({ ...newPassword, [e.target.name]: e.target.value });
    }
    const sendNewPass = async (e) => {
        e.preventDefault();
        props.setloadingBar(50);
        const { password, confirmpassword } = newPassword;
        const res = await changePassword(password, confirmpassword);
        if (res) {
            history.push("/account");
            props.setloadingBar(100);
        }
        else {
            props.setloadingBar(100);
            swal("Oops!", "Password Not Match With Confirm Password, Try Again!", "error");
        }
    }

    useEffect(() => {
        props.setloadingBar(50);
        if (!localStorage.getItem("token")) history.push("/login");
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
                                    <h3>set new password</h3>
                                </div>
                                <div className="loginform">
                                    <form id="myLogin">
                                        <label>Password</label><span className="required">*</span>
                                        <input type="password" name="password" className="myInput" onChange={onChangePass} required autoComplete="off" />

                                        <label>Confirm Password</label><span className="required">*</span>
                                        <input type="password" name="confirmpassword" className="myInput" onChange={onChangePass} required autoComplete="off" />

                                        <Button size="small" type="submit" variant="contained" onClick={sendNewPass} className="btnsubmit">set password</Button>
                                    </form>
                                    <p className="forgotpassword"><Link to="/">Back to home</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Newpassword
