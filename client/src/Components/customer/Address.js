import React, { useContext } from 'react';
import WorkOutlineOutlinedIcon from '@material-ui/icons/WorkOutlineOutlined';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined'
import foodContext from '../../context/foody/foodContext';

const Address = (props) => {
    const context = useContext(foodContext);
    const { deleteAddress } = context;
    const { house, societyname, landmark, city, pincode, place, _id } = props.address;
    const { editAddressSlide } = props;
    return (
        <>
            <div className="address_detail">
                <div className="row">
                    <div className="col-1">
                        {place === "work" ? <HomeOutlinedIcon className="workicon" /> : <WorkOutlineOutlinedIcon className="workicon" />}
                    </div>
                    <div className="col-11">
                        <span className="location">{place}</span>
                        <address>{house}, {societyname}, {landmark}, {city}, Gujarat-{pincode}</address>
                        <p className="address_edit" onClick={() => { editAddressSlide(place, house, societyname, landmark, city, pincode, _id) }}>edit</p>
                        <p className="address_delete" onClick={() => { deleteAddress(_id) }}>delete</p>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Address
