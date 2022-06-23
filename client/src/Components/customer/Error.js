import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="error_page">
                            <div className="error_container">
                                <h2 className="error_heading">404 not found</h2>
                                <div className="error_page_iamge">
                                    <img src="/images/undraw_warning_cyit (1).svg" alt="Error" />
                                </div>
                                <h3 className="error_primary_heading">Sorry Page Not Found</h3>
                                <p className="error_para">the page you are looking for can not be found or page has been temporarily closed</p>
                                <Button variant="contained" className="btnback"><Link to="/">go back to home</Link></Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Error
