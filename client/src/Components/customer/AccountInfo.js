import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

const AccountInfo = (props) => {
    const { firstname, lastname, email, phone } = props.userdata;
    return <div id="account-info">
        <div className="container">
            <div className="row">
                <div className="col-md-4">
                    <h4>My Account</h4>
                    <div className="account">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="usericondiv">
                                    <span><AccountCircleIcon className="usericon" /></span>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <h5 className="user">{firstname} {lastname}</h5>
                                <div className="usermail">{email}</div>
                                <div className="usercontact">{phone}</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
};

export default AccountInfo;
