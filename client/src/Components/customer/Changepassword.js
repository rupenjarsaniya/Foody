import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import ChangePassValidate from '../../validation/ChangePassValidate';

const Changepassword = () => {
    const handleChangePassword = async () => {
        const res = await fetch("/changepassword", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            },
            body: JSON.stringify(values)
        });
        const json = await res.json();
        if (json.success) {
            swal("Success", json.message, "success");
        }
        else {
            swal("Oops!", json.error, "error");
        }
    }
    const { handleChange, values, errors, handleSubmit } = ChangePassValidate(handleChangePassword);

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
                                    <form id="myLogin" onSubmit={handleSubmit} >
                                        <label htmlFor="currentpassword">Current Password</label><span className="required">*</span>
                                        <input type="password" name="currentpassword" onChange={handleChange} className="myInput" required autoComplete="off" />
                                        {
                                            errors.currentpassword && <p className='formErrorSpan'>{errors.currentpassword}</p>
                                        }
                                        <label htmlFor="newpassword">New Password</label><span className="required">*</span>
                                        <input type="password" name="newpassword" onChange={handleChange} className="myInput" required autoComplete="off" />
                                        {
                                            errors.newpassword && <p className='formErrorSpan'>{errors.newpassword}</p>
                                        }
                                        <label htmlFor="confirmnewpassword">Confirm New Password</label><span className="required">*</span>
                                        <input type="password" name="confirmnewpassword" onChange={handleChange} className="myInput" required autoComplete="off" />
                                        {
                                            errors.confirmnewpassword && <p className='formErrorSpan'>{errors.confirmnewpassword}</p>
                                        }
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