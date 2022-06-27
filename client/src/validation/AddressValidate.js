import { useState } from "react";
import { omit } from 'lodash'
import swal from 'sweetalert';

const AddressValidate = (callback) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        switch (name) {
            case 'house':
                if (value.length === 0) {

                    setErrors({
                        ...errors,
                        house: 'House No. cannot be blank'
                    })
                }
                else {
                    let newObj = omit(errors, "house");
                    setErrors(newObj);
                }
                break;

            case 'societyname':
                if (value.length === 0) {

                    setErrors({
                        ...errors,
                        societyname: 'Society Name cannot be blank'
                    })
                }
                else {
                    let newObj = omit(errors, "societyname");
                    setErrors(newObj);
                }
                break;

            case 'landmark':
                if (value.length === 0) {
                    setErrors({
                        ...errors,
                        landmark: 'Landmark cannot be blank'
                    })
                }
                else {
                    let newObj = omit(errors, "landmark");
                    setErrors(newObj);
                }
                break;

            case 'city':
                if (value.length === 0) {
                    setErrors({
                        ...errors,
                        city: 'City cannot be blank'
                    })
                }
                else {
                    let newObj = omit(errors, "city");
                    setErrors(newObj);
                }
                break;

            case 'pincode':
                if (value.length !== 6) {
                    setErrors({
                        ...errors,
                        pincode: 'Pincode must be 6 digit'
                    })
                }
                else {
                    let newObj = omit(errors, "pincode");
                    setErrors(newObj);
                }
                break;

            case 'place':
                if (event.checked) {
                    setErrors({
                        ...errors,
                        place: 'Please Check Any One Field'
                    })
                }
                else {
                    let newObj = omit(errors, "place");
                    setErrors(newObj);
                }
                break;

            default:
                break;
        }
    }

    const handleSubmit = (event) => {
        if (event) event.preventDefault();

        if (Object.keys(errors).length === 0 && Object.keys(values).length !== 0) {
            callback();
        }
        else {
            Object.keys(errors).map(err => {
                swal("Oops!", errors[err], "error");
            })
        }
    }

    //A method to handle form inputs
    const handleChange = (event) => {
        event.persist();

        validate(event, event.target.name, event.target.value);

        setValues({ ...values, [event.target.name]: event.target.value })
    }

    return { values, errors, handleChange, handleSubmit };

}

export default AddressValidate