import React, { useContext, useEffect, useRef, useState } from 'react'
import foodContext from '../../context/foody/foodContext';
import { useHistory } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { getUser } from "../../actions/index";
import swal from 'sweetalert';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

const FoodManagement = (props) => {
    // Default value checking
    // update food
    const updateBox = useRef(null);
    const closeUpdateBox = useRef(null);
    const history = useHistory();
    const dispatch = useDispatch();
    const context = useContext(foodContext);
    const { getOwnerData, handleAddFood, handleUpdateFood, handleDeleteFood, getRestaurantFood, restaurantFood } = context;

    const closeEditAddressSlide = () => document.getElementsByClassName("profile_overly")[0].classList.remove("active_profile");

    const [profile, setProfile] = useState({ ownername: "", hotelname: "", email: "", phone: "" });

    const [userData, setUserData] = useState([]);
    const [newFood, setNewFood] = useState({ foodname: "", foodimg: "", hotel: "", price: "", category: "" });
    const [currFood, setCurrFood] = useState({ id: "", foodname: "", foodimg: "", hotel: "", price: "", category: "" });

    const handleFood = (e) => setNewFood({ ...newFood, [e.target.name]: e.target.value });
    const handleEditFood = (id, foodname, foodimg, hotel, price, category) => {
        setCurrFood({ id, foodname, foodimg, hotel, price, category });
        updateBox.current.click();
    }
    const handleSetFood = (e) => setCurrFood({ ...currFood, [e.target.name]: e.target.value });

    // Add Food
    const handleAddFoodSubmit = async (e) => {
        e.preventDefault();
        const res = await handleAddFood(newFood);
        if (res.success) {
            swal(res.json, "Food from your restaurant served now", "success");
            setNewFood({ foodname: "", foodimg: "", hotel: "", price: "", category: "" });
        }
        else swal("Oops!", res.json, "error");
    }

    // Update Food
    const handleUpdateFoodSubmit = async (e) => {
        e.preventDefault();
        const res = await handleUpdateFood(currFood);
        if (res.success) {
            closeUpdateBox.current.click();
            setCurrFood({ id: "", foodname: "", foodimg: "", hotel: "", price: "", category: "" });
            swal(res.json, "Food from your restaurant updated now", "success");
        }
        else swal("Oops!", res.json, "error");
    }

    // Delete Food
    const handleDeleteFoodFire = async (id) => {
        const res = await handleDeleteFood(id);
        if (res.success) swal(res.json, "Food from your restaurant deleted now", "success");
        else swal("Oops!", res.json, "error");
    }

    // Update Profile
    const editAddressSlide = (ownername, hotelname, email, phone) => {
        setProfile({ ownername, hotelname, email, phone });
        document.getElementsByClassName("profile_overly")[0].classList.add("active_profile");
    }

    const handleProfile = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    }

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const res = await fetch('/editowner', {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(profile)
        })
        const json = await res.json();
        if (res.status === 200) {
            setProfile({ ownername: "", hotelname: "", email: "", phone: "", id: "" });
            closeEditAddressSlide();
            setUserData(json.updateOwner);
            dispatch(getUser(json.updateOwner));
            swal("Profile Updated", json.success, "success");
        }
        else {
            swal("Oops!", "Something Went Wrong, While Updating Profile, Please Try Again Later", "error");
        }
    }

    useEffect(() => {
        props.setloadingBar(50);
        const getUserDetails = async () => {
            const res = await getOwnerData();
            if (res) {
                props.setloadingBar(70);
                dispatch(getUser(res));
                setUserData(res);
                getRestaurantFood();
            }
            else {
                history.push('/login');
            }
        }
        getUserDetails();
        props.setloadingBar(100);
    }, [])

    return (
        <div className='managementContainer'>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-9">
                        <div className="foodControlContainer">
                            <div className="addfoodContainer">
                                <form className='myAddFoodForm'>
                                    <h5 className='addHeading'>Add Food To Served With Us</h5>
                                    <input type="text" className='addFoodInput' name="foodname" placeholder='Food Name' defaultValue={newFood.foodname} onChange={handleFood} />
                                    <input type="text" className='addFoodInput' name="foodimg" placeholder='Food Image' defaultValue={newFood.foodimg} onChange={handleFood} />
                                    <input type="text" className='addFoodInput' name="hotel" placeholder='Hotel Name' defaultValue={newFood.hotel} onChange={handleFood} />
                                    <select className='addFoodInput' name="category" onChange={handleFood}>
                                        <option value="" disabled selected>Select Catagory</option>
                                        <option value="Breakfast">Breakfast</option>
                                        <option value="Brunch">Brunch</option>
                                        <option value="Lunch">Lunch</option>
                                        <option value="Dinner">Dinner</option>
                                        <option value="Sweet">Sweet</option>
                                    </select>
                                    <input type="text" className='addFoodInput' name="price" placeholder='Food Price' defaultValue={newFood.price} onChange={handleFood} />
                                    <button type="submit" className='addFoodBtn' onClick={handleAddFoodSubmit}>Serve</button>
                                </form>
                            </div>

                            <button type="button" style={{ display: 'none' }} ref={updateBox} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Launch demo modal
                            </button>

                            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="exampleModalLabel">Edit Food</h5>
                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="updatefoodContainer">
                                                <form>
                                                    <input type="text" className='addFoodInput' name="foodname" placeholder='Food Name' defaultValue={currFood.foodname} onChange={handleSetFood} />
                                                    <input type="text" className='addFoodInput' name="foodimg" placeholder='Food Image' defaultValue={currFood.foodimg} onChange={handleSetFood} />
                                                    <input type="text" className='addFoodInput' name="hotel" placeholder='Hotel Name' defaultValue={currFood.hotel} onChange={handleSetFood} />
                                                    <select className='addFoodInput' name="category" defaultValue={currFood.category} onChange={handleSetFood}>
                                                        <option value="" disabled>Select Catagory</option>
                                                        <option value="Breakfast">Breakfast</option>
                                                        <option value="Brunch">Brunch</option>
                                                        <option value="Lunch">Lunch</option>
                                                        <option value="Dinner">Dinner</option>
                                                        <option value="Sweet">Sweet</option>
                                                    </select>
                                                    <input type="text" className='addFoodInput' name="price" placeholder='Food Price' defaultValue={currFood.price} onChange={handleSetFood} />
                                                </form>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" ref={closeUpdateBox} className="closeBtn" data-bs-dismiss="modal">Close</button>
                                            <button type="button" className="updateFoodBtn" onClick={handleUpdateFoodSubmit}>Update</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="displayfoodContainer">
                                <h5 className='diplayHeading'>There are {restaurantFood.length} Food Served From Your Restaurant.</h5>
                                <div className="foodDisplayDetails">
                                    {
                                        restaurantFood.map((food, index) => {
                                            const { _id, foodname, foodimg, hotel, price, category } = food;
                                            return <div className="cardDisplayContainer" key={index + 1}>
                                                <img src={foodimg} className="foodImage" alt="..." />
                                                <div className="cardDisplay">
                                                    <table>
                                                        <tr>
                                                            <th>Food Name</th>
                                                            <td>{foodname}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Hotel Name</th>
                                                            <td>{hotel}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Price</th>
                                                            <td>{price}</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Category</th>
                                                            <td>{category}</td>
                                                        </tr>
                                                    </table>
                                                    <IconButton>
                                                        <DeleteOutlineOutlinedIcon className='deleteBtn' onClick={() => { handleDeleteFoodFire(_id) }} />
                                                    </IconButton>
                                                    <IconButton>
                                                        <EditOutlinedIcon className='editBtn' onClick={() => { handleEditFood(_id, foodname, foodimg, hotel, price, category) }} />
                                                    </IconButton>
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className="accountControlContainer">
                            <div className="accountContainer">
                                <h5 className='profileHeading'>Profile</h5>
                                <table>
                                    <tr>
                                        <th>Ownername</th>
                                        <td>{userData.ownername}</td>
                                    </tr>
                                    <tr>
                                        <th>Hotelname</th>
                                        <td>{userData.hotelname}</td>
                                    </tr>
                                    <tr>
                                        <th>Email Address</th>
                                        <td>{userData.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile No</th>
                                        <td>{userData.phone}</td>
                                    </tr>
                                </table>
                                <button className='editProfileBtn' onClick={() => { editAddressSlide(userData.ownername, userData.hotelname, userData.email, userData.phone) }}>Edit Profile</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="profile_overly">
                    <div className="profile_innerbox">
                        <div className="profile_header">
                            <CloseIcon className="closebtn" onClick={closeEditAddressSlide} />
                            <p className="profile_heading">Edit Profile</p>
                        </div>
                        <form className="myprofileform">
                            <label htmlFor="house">Owner Name</label>
                            <input type="text" name="ownername" className="myprofileinput" defaultValue={profile.ownername} onChange={handleProfile} />

                            <label htmlFor="name">Email Address</label>
                            <input type="email" name="email" className="myprofileinput" defaultValue={profile.email} onChange={handleProfile} />

                            <label htmlFor="landmark">Mobile No</label>
                            <input type="number" name="phone" className="myprofileinput" defaultValue={profile.phone} onChange={handleProfile} />

                            <label htmlFor="city">Hotel Name</label>
                            <input type="text" name="hotelname" className="myprofileinput" defaultValue={profile.hotelname} onChange={handleProfile} />

                            <button className="btn_profile" onClick={handleProfileUpdate}>save</button>
                        </form>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default FoodManagement