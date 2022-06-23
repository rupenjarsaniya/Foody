import React from 'react'
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useState } from 'react';
import { useContext } from 'react';
import foodContext from '../../context/foody/foodContext';

const Primaryheader = (props) => {
    const context = useContext(foodContext);
    const { getFoodByCity } = context;

    const onChangeCity = (e) => {
        props.setloadingBar(10);
        getFoodByCity(e.target.value);
        props.setloadingBar(100);
    }

    return (
        <>
            <header id="item_info">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="menubar">
                                <div className="menu_all">
                                    <ul>
                                        <li>
                                            <select name="city" id="city" onChange={onChangeCity}>
                                                <option value="Ahmedabad" selected>Ahmedabad</option>
                                                <option value="Vadodara">Vadodara</option>
                                                <option value="Gandhinagar">Gandhinagar</option>
                                            </select>
                                        </li>
                                        <li><Link to="/">Breakfast <ExpandMoreIcon className="menuarrow" /></Link>
                                            <ul className="submenu">
                                                <li><Link to="/">dabeli</Link></li>
                                                <li><Link to="/">cheeze dabeli</Link></li>
                                                <li><Link to="/">burger</Link></li>
                                                <li><Link to="/">french fries</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="/">Brunch <ExpandMoreIcon className="menuarrow" /></Link>
                                            <ul className="submenu">
                                                <li><Link to="/">Pani Puri</Link></li>
                                                <li><Link to="/">cheeze dabeli</Link></li>
                                                <li><Link to="/">Sandwich</Link></li>
                                                <li><Link to="/">Mexican Green Wave</Link></li>
                                                <li><Link to="/">VEGGIE PARADISE</Link></li>
                                                <li><Link to="/">Double Cheese Margherita</Link></li>
                                                <li><Link to="/">Bhaji Pav</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="/">Lunch <ExpandMoreIcon className="menuarrow" /></Link>
                                            <ul className="submenu">
                                                <li><Link to="/">Chhole Bhature</Link></li>
                                                <li><Link to="/">Dosa Sambhar</Link></li>
                                                <li><Link to="/">Paratha</Link></li>
                                                <li><Link to="/">Gujarati Thali</Link></li>
                                                <li><Link to="/">Manchuriyan</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="/">Dinner <ExpandMoreIcon className="menuarrow" /></Link>
                                            <ul className="submenu">
                                                <li><Link to="/">Paneer Tikka Masala</Link></li>
                                                <li><Link to="/">Paneer Sabji and Manchuriyan</Link></li>
                                            </ul>
                                        </li>
                                        <li><Link to="/">Sweets & Cakes <ExpandMoreIcon className="menuarrow" /></Link>
                                            <ul className="submenu">
                                                <li><Link to="/">Black Forest</Link></li>
                                                <li><Link to="/">Chocolate cakes</Link></li>
                                                <li><Link to="/">Stowbery Pasty</Link></li>
                                                <li><Link to="/">Chocolic Cake</Link></li>
                                                <li><Link to="/">Choco van pasty</Link></li>
                                                <li><Link to="/">Vanila Cake</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}

export default Primaryheader
