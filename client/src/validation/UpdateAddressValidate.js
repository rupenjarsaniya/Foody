import { useState } from "react";
import { omit } from 'lodash'
import swal from 'sweetalert';

const UpdateAddressValidate = (callback) => {
    const [updateValues, setUpdateValues] = useState({});
    const [updateErrors, setUpdateErrors] = useState({});

    const Updatevalidate = (event, name, value) => {
        switch (name) {
            case 'house':
                if (value.length === 0) {
                    setUpdateErrors({
                        ...updateErrors,
                        house: 'House No. cannot be blank'
                    })
                }
                else {
                    let newObj = omit(updateErrors, "house");
                    setUpdateErrors(newObj);
                }
                break;

            case 'societyname':
                if (value.length === 0) {
                    setUpdateErrors({
                        ...updateErrors,
                        societyname: 'Society Name cannot be blank'
                    })
                }
                else {
                    let newObj = omit(updateErrors, "societyname");
                    setUpdateErrors(newObj);
                }
                break;

            case 'landmark':
                if (value.length === 0) {
                    setUpdateErrors({
                        ...updateErrors,
                        landmark: 'Landmark cannot be blank'
                    })
                }
                else {
                    let newObj = omit(updateErrors, "landmark");
                    setUpdateErrors(newObj);
                }
                break;

            case 'city':
                if (value.length === 0) {
                    setUpdateErrors({
                        ...updateErrors,
                        city: 'City cannot be blank'
                    })
                }
                else {
                    let newObj = omit(updateErrors, "city");
                    setUpdateErrors(newObj);
                }
                break;

            case 'pincode':
                if (value.length !== 6) {
                    setUpdateErrors({
                        ...updateErrors,
                        pincode: 'Pincode must be 6 digit'
                    })
                }
                else {
                    let newObj = omit(updateErrors, "pincode");
                    setUpdateErrors(newObj);
                }
                break;

            case 'place':
                if (event.checked) {
                    setUpdateErrors({
                        ...updateErrors,
                        place: 'Please Check Any One Field'
                    })
                }
                else {
                    let newObj = omit(updateErrors, "place");
                    setUpdateErrors(newObj);
                }
                break;

            default:
                break;
        }
    }

    const UpdatehandleSubmit = (event) => {
        if (event) event.preventDefault();

        if (Object.keys(updateErrors).length === 0 && Object.keys(updateValues).length !== 0) {
            callback();
        }
        else {
            Object.keys(updateErrors).map(err => {
                swal("Oops!", updateErrors[err], "error");
            })
        }
    }

    //A method to handle form inputs
    const UpdatehandleChange = (event) => {
        event.persist();

        Updatevalidate(event, event.target.name, event.target.value);

        setUpdateValues({ ...updateValues, [event.target.name]: event.target.value })
    }

    return { updateValues, updateErrors, setUpdateValues, UpdatehandleChange, UpdatehandleSubmit };

}

export default UpdateAddressValidate