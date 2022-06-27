import { useState } from "react";
import { omit } from 'lodash'
import swal from 'sweetalert';

const AccountFormValidate = (callback) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        switch (name) {
            case 'firstname':
                if (value.length <= 2) {

                    setErrors({
                        ...errors,
                        firstname: 'Firstname atleast have 3 letters'
                    })
                }
                else {
                    let newObj = omit(errors, "firstname");
                    setErrors(newObj);
                }
                break;

            case 'lastname':
                if (value.length <= 2) {

                    setErrors({
                        ...errors,
                        lastname: 'Lastname atleast have 3 letters'
                    })
                }
                else {
                    let newObj = omit(errors, "lastname");
                    setErrors(newObj);
                }
                break;

            case 'phone':
                if (value.length !== 10) {
                    setErrors({
                        ...errors,
                        phone: 'Phone number must be 10 digit'
                    })
                }
                else {
                    let newObj = omit(errors, "phone");
                    setErrors(newObj);
                }
                break;

            case 'email':
                if (!new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(value)) {
                    setErrors({
                        ...errors,
                        email: 'Enter a valid email address'
                    })
                }
                else {
                    let newObj = omit(errors, "email");
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

    return { values, errors, setValues, handleChange, handleSubmit };

}

export default AccountFormValidate