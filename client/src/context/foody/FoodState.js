import { useState } from 'react';
import FoodContext from './foodContext'
import { getUser } from '../../actions/index';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { TextareaAutosize } from '@material-ui/core';

const FoodState = (props) => {
    const dispatch = useDispatch();
    const [addresses, setAddresses] = useState([]);
    const [foodJson, setFoodJson] = useState([]);
    const [foodServe, setFoodServe] = useState([]);
    const [restaurantFood, setRestaurantFood] = useState([]);
    const [cart, setCart] = useState({});
    const [favcart, setFavcart] = useState({});
    const [totalamount, setTotalamount] = useState(0);
    const [discountamount, setDiscountamount] = useState(0);
    const [deliverycharge, setDeliverycharge] = useState(0);

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
    const addAddress = async (newAddressData) => {
        try {
            const res = await fetch("http://localhost:5000/addaddress", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(newAddressData)
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
    const editAddress = async (updatedAddressData, id) => {
        console.log(updatedAddressData, id);
        try {
            const res = await fetch(`http://localhost:5000/updateaddress/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(updatedAddressData)
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                let newAddress = JSON.parse(JSON.stringify(addresses));
                for (let index = 0; index < newAddress.length; index++) {
                    const element = newAddress[index];
                    if (element._id === id) {
                        newAddress[index].house = updatedAddressData.house;
                        newAddress[index].societyname = updatedAddressData.societyname;
                        newAddress[index].landmark = updatedAddressData.landmark;
                        newAddress[index].city = updatedAddressData.city;
                        newAddress[index].pincode = updatedAddressData.pincode;
                        newAddress[index].place = updatedAddressData.place;
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
    const editProfile = async (updatedUserData) => {
        try {
            const res = await fetch("http://localhost:5000/updateuser", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify(updatedUserData)
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
    const orderFood = async (cart, oid, totalamount, finalamount, coupen, discountamount, deliverycharge, deliveryaddress, name, email, phone) => {
        try {
            const res = await fetch("http://localhost:5000/orderfood", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "token": localStorage.getItem("token")
                },
                body: JSON.stringify({ cart, oid, totalamount, finalamount, coupen, discountamount, deliverycharge, deliveryaddress, name, email, phone })
            });
            const json = await res.json();
            if (res.status === 200 && json) {
                return true;
            }
            else {
                return false;
            }
        }
        catch (error) {
            // console.log("Some error to order food", error);
            return false;
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




    // Cart and checkout

    // Save cart to localstorage
    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        let subTotal = 0;
        let disamount = 0;
        let delicharge = 0;

        let keys = Object.keys(myCart);
        for (let index = 0; index < keys.length; index++) {
            subTotal += myCart[keys[index]].qty * parseInt(myCart[keys[index]].price);
        }
        setTotalamount(subTotal);

        if (subTotal >= 500) {
            disamount = subTotal * 5 / 100;
        }
        if (subTotal >= 1000) {
            disamount = subTotal * (15 / 100);
        }
        if (subTotal >= 2000) {
            disamount = subTotal * (25 / 100);
        }
        if (subTotal >= 4000) {
            disamount = subTotal * (35 / 100);
        }
        setDiscountamount(disamount);

        if (subTotal < 500 && subTotal > 0) {
            delicharge = 40;
        }
        setDeliverycharge(delicharge);
    }

    // Add to cart
    const addToCart = (itemId, category, foodimg, hotel, foodname, price, qty) => {
        let newCart = cart;

        if (itemId in newCart) {
            newCart[itemId].qty = newCart[itemId].qty + qty;
        }
        else {
            newCart[itemId] = { category, foodimg, foodname, hotel, price, qty };
        }

        setCart(newCart);
        saveCart(newCart);
    }

    // Remove from cart
    const removeFromCart = (itemId, qty) => {
        let newCart = cart;

        if (itemId in newCart) {
            newCart[itemId].qty = newCart[itemId].qty - qty;
        }
        if (newCart[itemId].qty <= 0) {
            delete newCart[itemId]
        }

        setCart(newCart);
        saveCart(newCart);
    }

    const clearCart = () => {
        setCart({});
        saveCart({});
    }

    // Add to favourite
    const saveToFavourite = (myfavCart) => {
        localStorage.setItem("favcart", JSON.stringify(myfavCart));
    }

    const addToFavourite = (itemId, category, foodimg, hotel, foodname, price, qty) => {
        let newCart = favcart;

        if (!(itemId in newCart)) {
            newCart[itemId] = { category, foodimg, foodname, hotel, price, qty };
        }
        console.log(newCart);
        saveToFavourite(newCart);
        setFavcart(newCart);
    }

    const removeFromFavourite = (itemId) => {
        let newCart = favcart;

        if (itemId in newCart) {
            delete newCart[itemId];
        }

        saveToFavourite(newCart);
        setFavcart(newCart);
    }

    const clearFavourite = () => {
        saveToFavourite({});
        setFavcart({});
    }

    return (
        <FoodContext.Provider value={{ saveCart, favcart, setCart, setFavcart, addToFavourite, removeFromFavourite, clearFavourite, addToCart, removeFromCart, clearCart, cart, totalamount, deliverycharge, discountamount, addresses, foodJson, getUserData, addAddress, getAddress, deleteAddress, editAddress, editProfile, getFoodDetils, getFoodLocal, getFavFoodLocal, orderFood, getOrders, getFood, foodServe, state, foodDone, getOwnerData, restaurantFood, handleAddFood, handleUpdateFood, handleDeleteFood, getRestaurantFood }}>
            {props.children}
        </FoodContext.Provider>
    )
}

export default FoodState
