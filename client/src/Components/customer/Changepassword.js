import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';

const Changepassword = () => {

    const [passwords, setPasswords] = useState({
        currentpassword: "", newpassword: "", confirmnewpassword: ""
    });

    const handleChange = (e) => setPasswords({ ...passwords, [e.target.name]: e.target.value });

    const handleChangePassword = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/changepassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(passwords)
        });
        const json = await res.json();
        if (json.success) {
            swal("Success", json.message, "success");
            setPasswords({ currentpassword: "", newpassword: "", confirmnewpassword: "" })
        }
        else {
            swal("Oops!", json.error, "error");
        }
    }

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
                                    <form id="myLogin" onSubmit={handleChangePassword} >
                                        <label htmlFor="currentpassword">Current Password</label><span className="required">*</span>
                                        <input type="password" name="currentpassword" value={passwords.currentpassword} onChange={handleChange} className="myInput" required autoComplete="off" />

                                        <label htmlFor="newpassword">New Password</label><span className="required">*</span>
                                        <input type="password" name="newpassword" value={passwords.newpassword} onChange={handleChange} className="myInput" required autoComplete="off" />

                                        <label htmlFor="confirmnewpassword">Confirm New Password</label><span className="required">*</span>
                                        <input type="password" name="confirmnewpassword" value={passwords.confirmnewpassword} onChange={handleChange} className="myInput" required autoComplete="off" />

                                        <Button size="small" type="submit" variant="contained" className="btnsubmit">set password</Button>
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

export default Changepassword