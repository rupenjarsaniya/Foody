import React, { useState, useContext } from 'react';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import Address from './Address';
import AddIcon from '@material-ui/icons/Add';
import foodContext from '../../context/foody/foodContext';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import swal from 'sweetalert';
import AddressValidate from '../../validation/AddressValidate';
import UpdateAddressValidate from '../../validation/UpdateAddressValidate';

const AddressMain = (props) => {
    const closeEditAddressSlide = () => document.getElementsByClassName("address_overly")[0].classList.remove("active_address");
    const closeAddAddressSlide = () => document.getElementsByClassName("newaddress_overly")[0].classList.remove("active_newaddress");
    const addAddressSlide = () => document.getElementsByClassName("newaddress_overly")[0].classList.add("active_newaddress");

    const context = useContext(foodContext);
    const { addAddress, addresses, editAddress } = context;

    const [place, setPlace] = useState("home");
    const [addressId, setAddressId] = useState(null);

    const handleAddAddress = () => {
        values.place = place;
        props.setloadingBar(50);
        const res = addAddress(values);
        if (!res) {
            swal("Oops!", "Something went wrong please try again later", "error");
        }
        else {
            swal("Yeyyyy!", "New Address Added", "success");
        }
        closeAddAddressSlide();
        props.setloadingBar(100);
    }

    // Edit Address
    const editAddressSlide = (place, house, societyname, landmark, city, pincode, _id) => {
        setAddressId(_id)
        setUpdateValues({ house, societyname, landmark, city, pincode, place });
        setTimeout(() => document.getElementsByClassName("address_overly")[0].classList.add("active_address"), 500);
    }

    const handleEditAddress = () => {
        // updateValues.place = setUpdateValues.place;
        props.setloadingBar(50);
        const res = editAddress(updateValues, addressId);
        if (!res) {
            swal("Oops!", "Something went wrong please try again later", "error");
        }
        else {
            swal("Yeyyyy!", "Address Updated", "success");
        }
        closeEditAddressSlide();
        props.setloadingBar(100);
    }

    const { handleChange, values, errors, handleSubmit } = AddressValidate(handleAddAddress);
    const { updateValues, updateErrors, setUpdateValues, UpdatehandleChange, UpdatehandleSubmit } = UpdateAddressValidate(handleEditAddress);

    return (
        <div className="userinnerbox" data_name="Address">
            <div className="addressbox">
                <div className="row">
                    <div className="col-md-12">
                        <span className="addressbox_new" onClick={addAddressSlide}><AddIcon />Add Address</span>
                        <div className="address_primary">
                            {
                                addresses.length !== 0
                                    ? addresses.map((address, index) => {
                                        return <Address address={address} key={index + 1} editAddressSlide={editAddressSlide} />
                                    })
                                    : <div className='noaddress'>No Address Found</div>
                            }
                        </div>
                        <div className="address_overly">
                            <div className="address_innerbox">
                                <div className="address_header">
                                    <CloseIcon className="closebtn" onClick={closeEditAddressSlide} />
                                    <p className="address_heading">Update Address</p>
                                </div>
                                <form className="myaddressform" onSubmit={UpdatehandleSubmit}>
                                    <label htmlFor="house">house / flat no.</label>
                                    <input type="text" name="house" value={updateValues.house} onChange={UpdatehandleChange} className="myaddressinput" required />
                                    {
                                        updateErrors.house && <p className='formErrorSpan'>{updateErrors.house}</p>
                                    }
                                    <label htmlFor="name">society / flat name</label>
                                    <input type="text" name="societyname" value={updateValues.societyname} onChange={UpdatehandleChange} className="myaddressinput" required />
                                    {
                                        updateErrors.societyname && <p className='formErrorSpan'>{updateErrors.societyname}</p>
                                    }
                                    <label htmlFor="landmark">landmark</label>
                                    <input type="text" name="landmark" value={updateValues.landmark} onChange={UpdatehandleChange} className="myaddressinput" required />
                                    {
                                        updateErrors.landmark && <p className='formErrorSpan'>{updateErrors.landmark}</p>
                                    }
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" value={updateValues.city} onChange={UpdatehandleChange} className="myaddressinput" required />
                                    {
                                        updateErrors.city && <p className='formErrorSpan'>{updateErrors.city}</p>
                                    }
                                    <label htmlFor="pincode">Pincode</label>
                                    <input type="text" name="pincode" value={updateValues.pincode} onChange={UpdatehandleChange} className="myaddressinput" required />
                                    {
                                        updateErrors.pincode && <p className='formErrorSpan'>{updateErrors.pincode}</p>
                                    }
                                    <div className="place">
                                        <label className="myRadioLabel">
                                            <input type="radio" name="place" value="home" checked={updateValues.place === "home"} />
                                            <span><HomeOutlinedIcon /> Home</span>
                                        </label>
                                        <label className="myRadioLabel">
                                            <input type="radio" name="place" value="work" checked={updateValues.place === "work"} />
                                            <span><WorkOutlineOutlinedIcon /> Work</span>
                                        </label>
                                    </div>
                                    {
                                        updateErrors.place && <p className='formErrorSpan'>{updateErrors.place}</p>
                                    }
                                    <Button type="submit" variant="contained" className="btn_address">save</Button>
                                </form>
                            </div>
                        </div>
                        <div className="newaddress_overly">
                            <div className="newaddress_innerbox">
                                <div className="newaddress_header">
                                    <CloseIcon className="newclosebtn" onClick={closeAddAddressSlide} />
                                    <p className="newaddress_heading">New Address</p>
                                </div>
                                <form className="mynewaddressform" onSubmit={handleSubmit}>
                                    <label htmlFor="house">house / flat no.</label>
                                    <input type="text" name="house" className="mynewaddressinput" onChange={handleChange} required />
                                    {
                                        errors.house && <p className='formErrorSpan'>{errors.house}</p>
                                    }
                                    <label htmlFor="name">society / flat name</label>
                                    <input type="text" name="societyname" className="mynewaddressinput" onChange={handleChange} required />
                                    {
                                        errors.societyname && <p className='formErrorSpan'>{errors.societyname}</p>
                                    }
                                    <label htmlFor="landmark">landmark</label>
                                    <input type="text" name="landmark" className="mynewaddressinput" onChange={handleChange} required />
                                    {
                                        errors.landmark && <p className='formErrorSpan'>{errors.landmark}</p>
                                    }
                                    <label htmlFor="city">City</label>
                                    <input type="text" name="city" className="mynewaddressinput" onChange={handleChange} required />
                                    {
                                        errors.city && <p className='formErrorSpan'>{errors.city}</p>
                                    }
                                    <label htmlFor="pincode">Pincode</label>
                                    <input type="number" name="pincode" className="mynewaddressinput" onChange={handleChange} required maxLength={6} />
                                    {
                                        errors.pincode && <p className='formErrorSpan'>{errors.pincode}</p>
                                    }
                                    <div className="place">
                                        <label className="myRadioLabel">
                                            <input type="radio" name="place" value="home" onChange={(e) => setPlace(e.target.value)} checked />
                                            <span><HomeOutlinedIcon /> Home</span>
                                        </label>
                                        <label className="myRadioLabel">
                                            <input type="radio" name="place" value="work" onChange={(e) => setPlace(e.target.value)} />
                                            <span><WorkOutlineOutlinedIcon /> Work</span>
                                        </label>
                                    </div>
                                    {
                                        errors.place && <p className='formErrorSpan'>{errors.place}</p>
                                    }
                                    <Button type="submit" variant="contained" className="btn_newaddress">Add Address</Button>
                                    <Button type="reset" variant="contained">Clear</Button>
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
