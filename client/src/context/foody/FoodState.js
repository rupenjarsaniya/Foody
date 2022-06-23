import { useState } from 'react';
import FoodContext from './foodContext'
import { getUser } from '../../actions/index';
import { useDispatch } from 'react-redux';

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
            const res = await fetch("/owner", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
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
        const res = await fetch('/addfood', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newFood)
        })
        const json = await res.json();
        if (res.status === 200) {
            setRestaurantFood([...restaurantFood, newFood]);
            return { success: true, json };
        }
        else return { success: false, json };
    }

    // Update Food
    const handleUpdateFood = async (currFood) => {
        const res = await fetch('/updatefood/' + currFood.id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(currFood)
        })
        const json = await res.json();
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
            return { success: true, json };
        }
        else return { success: false, json };
    }

    // Delete Food
    const handleDeleteFood = async (id) => {
        const res = await fetch('/deletefood/' + id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
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
            const res = await fetch('/getrestaurantfood', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
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
            const res = await fetch("/user", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                return json;
            }
            else {
                return false;
                // console.log("some error to get user data");
            }
        }
        catch (error) {
            return false;
            // console.log("Error to get user information", error);
        }
    }

    // Logout from current device
    const logout = async (usertype) => {
        let success = false;
        try {
            const res = await fetch("/logout/" + usertype, {
                method: "POST",
                header: {
                    "Content-Type": "application/json"
                }
            })
            if (res.status === 200) {
                success = true;
                return success;
            }
        }
        catch (error) {
            // console.log("Some error to get logout: " + error);
        }
    }

    // Logout from all device
    const logoutall = async (usertype) => {
        let success = false;
        try {
            const logoutallGet = await fetch("/logoutall/" + usertype, {
                method: "GET",
                header: {
                    "Content-Type": "application/json"
                }
            })
            if (logoutallGet.status === 200) {
                success = true;
                return success;
            }
        }
        catch (error) {
            // console.log("Some error to logout all devices: " + error)
        }
    }

    // Add Address
    const addAddress = async (house, societyname, landmark, city, pincode, place) => {
        try {
            const res = await fetch("/addaddress", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
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
            const res = await fetch("/getaddress", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
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
            const res = await fetch(`/deleteaddress/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
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
            const res = await fetch(`/updateaddress/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
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
            const res = await fetch("/updateuser", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
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
            const res = await fetch(`/forgotpassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
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
            const res = await fetch("http://localhost:8000/foodDetailsJson", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                setFoodJson(json);
            }
        }
        catch (error) {
            // console.log("Food not fetch", error);
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
            const res = await fetch("/orderfood", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
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
            const res = await fetch("/getorder", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
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
            const res = await fetch("/getFood", {
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
            // console.log("Some error to fetch food detailb by city name");
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
        <FoodContext.Provider value={{ addresses, foodJson, getUserData, logout, logoutall, addAddress, getAddress, deleteAddress, editAddress, editProfile, changePassword, getFoodDetils, getFoodLocal, getFavFoodLocal, orderFood, getOrders, getFood, foodServe, state, foodDone, getUserDetails, getOwnerData, restaurantFood, handleAddFood, handleUpdateFood, handleDeleteFood, getRestaurantFood }}>
            {props.children}
        </FoodContext.Provider>
    )
}

export default FoodState
