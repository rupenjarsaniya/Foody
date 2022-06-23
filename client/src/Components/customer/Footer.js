import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer id="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="footer-primary-left">
                                <img src="/images/logo2.png" alt="" />
                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quos autem accusamus.
                                    Voluptate possimus distinctio, perferendis id ipsum adipisci ad officia at culpa commodi
                                    laudantium voluptatum, atque dolore mollitia esse? Thank you</p>
                                <h3>Foody</h3>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="services">
                                        <h3>Services & Features</h3>
                                        <div className="footer-underlines">
                                            <span className="footer-underlines-lightblue"></span>
                                            <span className="footer-underlines-green"></span>
                                        </div>
                                        <p><Link to="/">Breakfast</Link></p>
                                        <p><Link to="/">Lunch</Link></p>
                                        <p><Link to="/">Brunch</Link></p>
                                        <p><Link to="/">Dinner</Link></p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="social">
                                        <h3>Follow Us On</h3>
                                        <div className="footer-underlines">
                                            <span className="footer-underlines-lightblue"></span>
                                            <span className="footer-underlines-green"></span>
                                        </div>
                                        <i className="fa fa-facebook"></i>
                                        <i className="fa fa-twitter"></i>
                                        <i className="fa fa-share-alt"></i>
                                        <i className="fa fa-instagram"></i>
                                        <i className="fa fa-youtube"></i>
                                        <i className="fa fa-github"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
            <footer id="copyright">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="copyright">
                                <p>Copyright &copy; 2021 <span>Foody</span> | All Right Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer
