import { useState } from 'react';
import FoodContext from './foodContext'
import { getUser } from '../../actions/index';
import { useDispatch } from 'react-redux';
import axios from 'axios';

const FoodState = (props) => {
    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState([]);
    const [foodJson, setFoodJson] = useState([]);
    const [foodServe, setFoodServe] = useState([]);
    const [restaurantFood, setRestaurantFood] = useState([]);

    // Restaurant
    // Get Owner
    const getOwnerData = async () => {
        try {
            const res = await fetch("http://localhost:5000/owner", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return json;
            }
            else {
                console.log("some error to get owner data");
                return false;
            }
        }
        catch (error) {
            console.log("Error to get owner information", error);
            return false;
        }
    }

    // Add Food
    const handleAddFood = async (newFood) => {
        const res = await axios.post("http://localhost:5000/addfood", newFood, {
            headers: {
                "Content-Type": "multipart/form-data",
                "token": localStorage.getItem("token")
            }
        });
        console.log(res);
        if (res.status === 200) {
            setRestaurantFood([...restaurantFood, newFood]);
            return { success: true, json: res.data };
        }
        else return { success: false, json: res.data };
    }

    // Update Food
    const handleUpdateFood = async (currFood, id) => {
        console.log(id);
        const res = await axios.put(`http://localhost:5000/updatefood/${id}`, currFood, {
            headers: {
                "Content-Type": "multipart/form-data",
                "token": localStorage.getItem("token")
            }
        });
        if (res.status === 200) {
            for (let index = 0; index < restaurantFood.length; index++) {
                const element = restaurantFood[index];
                if (element._id === currFood.id) {
                    element.foodname = currFood.foodname;
                    element.foodimg = currFood.foodimg;
                    element.hotel = currFood.hotel;
                    element.price = currFood.price;
                    element.category = currFood.category;
                    break;
                }
            }
            setRestaurantFood(restaurantFood);
            return { success: true, json: res.data };
        }
        else return { success: false, json: res.data };
    }

    // Delete Food
    const handleDeleteFood = async (id) => {
        const res = await fetch('http://localhost:5000/deletefood/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem("token")
            }
        })
        const json = await res.json();
        if (res.status === 200) {
            const newFoods = restaurantFood.filter((food) => { return food._id !== id });
            setRestaurantFood(newFoods);
            return { success: true, json };
        }
        else return { success: false, json };
    }

    const getRestaurantFood = async () => {
        try {
            const res = await fetch('http://localhost:5000/getrestaurantfood', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            })
            const json = await res.json();
            if (res.status === 200) {
                setRestaurantFood(json);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // Customer
    // Get User
    const getUserData = async () => {
        try {
            const res = await fetch("http://localhost:5000/user", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return json;
            }
            else {
                return false;
            }
        }
        catch (error) {
            console.log(error);
            return false;
            // console.log("Error to get user information", error);
        }
    }

    // Add Address
    const addAddress = async (house, societyname, landmark, city, pincode, place) => {
        try {
            const res = await fetch("http://localhost:5000/addaddress", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ house, societyname, landmark, city, pincode, place })
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                setAddresses(addresses.concat(json.saveAddress));
                return true;
            }
            else {
                // console.log("Address not added");
                return false;
            }
        }
        catch (error) {
            // console.log("Some error to add address", error);
            return false;
        }
    }

    // Get Address
    const getAddress = async () => {
        try {
            const res = await fetch("http://localhost:5000/getaddress", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                setAddresses(json.findAddress);
            }
            else {
                // console.log("Some error to get address");
            }
        } catch (error) {
            // console.log("Some error to get address", error);
        }
    }

    // Delete Address
    const deleteAddress = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/deleteaddress/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                const newAddressAfterDelete = addresses.filter((address) => address._id !== id);
                setAddresses(newAddressAfterDelete);
            }
            else {
                // console.log("Some error ro delete");
            }
        }
        catch (error) {
            // console.log("Some error to delete address", error);
        }
    }

    // Edit Address
    const editAddress = async (house, societyname, landmark, city, pincode, place, id) => {
        try {
            const res = await fetch(`http://localhost:5000/updateaddress/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ house, societyname, landmark, city, pincode, place })
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                let newAddress = JSON.parse(JSON.stringify(addresses));
                for (let index = 0; index < newAddress.length; index++) {
                    const element = newAddress[index];
                    if (element._id === id) {
                        newAddress[index].house = house;
                        newAddress[index].societyname = societyname;
                        newAddress[index].landmark = landmark;
                        newAddress[index].city = city;
                        newAddress[index].pincode = pincode;
                        newAddress[index].place = place;
                        break;
                    }
                }
                setAddresses(newAddress);
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            // console.log("Some error to edit address", error);
            return false;
        }
    }

    // Edit profile
    const editProfile = async (firstname, lastname, email, phone, age) => {
        try {
            const res = await fetch("http://localhost:5000/updateuser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ firstname, lastname, email, phone, age })
            });
            const json = await res.json();
            if (res.status === 200) {
                dispatch(getUser(json.updateInfo));
                return true;
            }
            else {
                // console.log("Some problem face to update your information please try after some time");
                return false;
            }
        }
        catch (error) {
            // console.log("Some error to update " + error);
            return false;
        }
    }

    // Change password
    const changePassword = async (password, confirmpassword) => {
        try {
            const res = await fetch(`http://localhost:5000/forgotpassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ password, confirmpassword })
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                return json;
            }
            else {
                return false;
            }
        }
        catch (error) {
            // console.log("Some error to chnage password", error);
        }
    }

    // Get fooddetails
    const getFoodDetils = async () => {
        try {
            const res = await fetch("http://localhost:5000http://localhost:8000/foodDetailsJson", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                setFoodJson(json);
            }
        }
        catch (error) {
            // console.log("Food not fetch",http://loc5lho0/login error);
        }
    }

    // Get food from localstorage
    const getFoodLocal = () => {
        let getCart = localStorage.getItem("yourfood");
        let cartArr;
        if (getCart === null) {
            cartArr = [];
        }
        else {
            cartArr = JSON.parse(getCart);
        }
        return cartArr;
    }

    // Get fav food from localstorage
    const getFavFoodLocal = () => {
        let getCart = localStorage.getItem("yourfavourite");
        let cartArr;
        if (getCart === null) {
            cartArr = [];
        }
        else {
            cartArr = JSON.parse(getCart);
        }
        return cartArr;
    }

    // Order Food
    const orderFood = async (newElement, orderAddress, finalamount) => {
        let orderfood = false;
        try {
            const res = await fetch("http://localhost:5000/orderfood", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ newElement, orderAddress, finalamount })
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                orderfood = true;
                return orderfood;
            }
            else {
                orderfood = false;
                // console.log("Some error while take order");
                return orderfood;
            }
        }
        catch (error) {
            // console.log("Some error to order food", error);
            return orderfood;
        }
    }

    // Get user order
    const getOrders = async () => {
        try {
            const res = await fetch("http://localhost:5000/getorder", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                }
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                return json.findOrder;
            }
        }
        catch (error) {
            // console.log("Some error to get orders", error);
        }
    }

    // Get food detail by city name
    const getFood = async () => {
        try {
            const res = await fetch("http://localhost:5000/getFood", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                setFoodServe(json.findFood);
            }
        }
        catch (error) {
            // console.log("Some error to fetch fhttp:5/lot:3000/loginood detailb by city name");
        }
    }

    const [state, setState] = useState([]);
    const foodDone = async () => {
        const food = await getFoodLocal();
        setState(food);
    }

    const getUserDetails = async () => {
        const res = await getUserData();
        if (res) {
            return res;
        }
        return false;
    }

    return (
        <FoodContext.Provider value={{ addresses, foodJson, getUserData, addAddress, getAddress, deleteAddress, editAddress, editProfile, changePassword, getFoodDetils, getFoodLocal, getFavFoodLocal, orderFood, getOrders, getFood, foodServe, state, foodDone, getUserDetails, getOwnerData, restaurantFood, handleAddFood, handleUpdateFood, handleDeleteFood, getRestaurantFood }}>
            {props.children}
        </FoodContext.Provider>
    )
}

export default FoodState
