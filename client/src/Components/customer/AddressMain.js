import React, { useState, useContext } from 'react';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import Address from './Address';
import AddIcon from '@material-ui/icons/Add';
import foodContext from '../../context/foody/foodContext';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';

const AddressMain = (props) => {
    const closeEditAddressSlide = () => document.getElementsByClassName("address_overly")[0].classList.remove("active_address");
    const closeAddAddressSlide = () => document.getElementsByClassName("newaddress_overly")[0].classList.remove("active_newaddress");
    const addAddressSlide = () => document.getElementsByClassName("newaddress_overly")[0].classList.add("active_newaddress");

    const context = useContext(foodContext);
    const { addAddress, addresses, editAddress } = context;

    // Address
    const [newaddress, setNewAddress] = useState({
        house: "", societyname: "", landmark: "", city: "", pincode: "", place: ""
    });

    const onChangeNewAddress = (e) => setNewAddress({ ...newaddress, [e.target.name]: e.target.value });

    const handleAddAddress = (e) => {
        props.setloadingBar(10);
        e.preventDefault();
        const { house, societyname, landmark, city, pincode, place } = newaddress;
        props.setloadingBar(50);
        const res = addAddress(house, societyname, landmark, city, pincode, place);
        if (!res) {
            props.setloadingBar(100);
            swal("Oops!", "Something went wrong please try again later", "error");
        }
        else {
            props.setloadingBar(100);
            swal("Yeyyyy!", "New Address Added", "success");
        }
    }

    // Edit Address
    const [prevAddress, setPrevAddress] = useState({
        house: "", societyname: "", landmark: "", city: "", pincode: "", place: "", user: ""
    });

    const editAddressSlide = (place, house, societyname, landmark, city, pincode, _id) => {
        setPrevAddress({ house, societyname, landmark, city, pincode, place, user: _id });
        setTimeout(() => document.getElementsByClassName("address_overly")[0].classList.add("active_address"), 500);
    }

    const onChangeEditAddress = (e) => setPrevAddress({ ...prevAddress, [e.target.name]: e.target.value });

    const handleEditAddress = (e) => {
        props.setloadingBar(10);
        e.preventDefault();
        const { house, societyname, landmark, city, pincode, place, user } = prevAddress;
        props.setloadingBar(50);
        const res = editAddress(house, societyname, landmark, city, pincode, place, user);
        if (!res) {
            props.setloadingBar(100);
            swal("Oops!", "Something went wrong please try again later", "error");
        }
        else {
            props.setloadingBar(100);
            swal("Yeyyyy!", "Address Updated", "success");
        }
    }

    return (
        <div className="userinnerbox" data_name="Address">
            <div className="addressbox">
                <div className="row">
                    <div className="col-md-12">
                        <span className="addressbox_new" onClick={addAddressSlide}><AddIcon />Add Address</span>
                        <div className="address_primary">
                            {
                                addresses.map((address, index) => {
                                    return <Address address={address} key={index + 1} editAddressSlide={editAddressSlide} />
                                })
                            }
                        </div>
                        <div className="address_overly">
                            <div className="address_innerbox">
                                <div className="address_header">
                                    <CloseIcon className="closebtn" onClick={closeEditAddressSlide} />
                                    <p className="address_heading">Update Address</p>
                                </div>
                                <form method="post" className="myaddressform">
                                    <label htmlFor="house">house / flat no.</label>
                                    <input type="text" name="house" value={prevAddress.house} onChange={onChangeEditAddress} className="myaddressinput" />
                                    <label htmlFor="name">society / flat name</label>
                                    <input type="text" name="name" value={prevAddress.societyname} onChange={onChangeEditAddress} className="myaddressinput" />
                                    <label htmlFor="landmark">landmark</label>
                                    <input type="text" name="landmark" value={prevAddress.landmark} onChange={onChangeEditAddress} className="myaddressinput" />
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" value={prevAddress.city} onChange={onChangeEditAddress} className="myaddressinput" />
                                    <label htmlFor="pincode">Pincode</label>
                                    <input type="text" name="pincode" value={prevAddress.pincode} onChange={onChangeEditAddress} className="myaddressinput" />
                                    <div className="place">
                                        <label className="myRadioLabel">
                                            <input type="radio" name="place" value="home" onChange={onChangeEditAddress} required />
                                            <span><HomeOutlinedIcon /> Home</span>
                                        </label>
                                        <label className="myRadioLabel">
                                            <input type="radio" name="place" value="work" onChange={onChangeEditAddress} required />
                                            <span><WorkOutlineOutlinedIcon /> Work</span>
                                        </label>
                                    </div>
                                    <Button variant="contained" className="btn_address" onClick={handleEditAddress}>save</Button>
                                </form>
                            </div>
                        </div>
                        <div className="newaddress_overly">
                            <div className="newaddress_innerbox">
                                <div className="newaddress_header">
                                    <CloseIcon className="newclosebtn" onClick={closeAddAddressSlide} />
                                    <p className="newaddress_heading">New Address</p>
                                </div>
                                <form method="post" className="mynewaddressform">
                                    <label htmlFor="house">house / flat no.</label>
                                    <input type="text" name="house" className="mynewaddressinput" onChange={onChangeNewAddress} />
                                    <label htmlFor="name">society / flat name</label>
                                    <input type="text" name="societyname" className="mynewaddressinput" onChange={onChangeNewAddress} />
                                    <label htmlFor="landmark">landmark</label>
                                    <input type="text" name="landmark" className="mynewaddressinput" onChange={onChangeNewAddress} />
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" className="mynewaddressinput" onChange={onChangeNewAddress} />
                                    <label htmlFor="pincode">Pincode</label>
                                    <input type="text" name="pincode" className="mynewaddressinput" onChange={onChangeNewAddress} />
                                    <div className="place">
                                        <label className="myRadioLabel">
                                            <input type="radio" name="place" value="home" onChange={onChangeNewAddress} />
                                            <span><HomeOutlinedIcon /> Home</span>
                                        </label>
                                        <label className="myRadioLabel">
                                            <input type="radio" name="place" value="work" onChange={onChangeNewAddress} />
                                            <span><WorkOutlineOutlinedIcon /> Work</span>
                                        </label>
                                    </div>
                                    <Button variant="contained" className="btn_newaddress" onClick={handleAddAddress}>Add Address</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AddressMain;
