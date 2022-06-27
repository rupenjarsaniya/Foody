import { useState } from "react";
import { omit } from 'lodash'
import swal from 'sweetalert';

const ForgotValidate = (callback) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});

    const validate = (event, name, value) => {
        switch (name) {
            case 'password':
                if (!new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)) {
                    setErrors({
                        ...errors,
                        password: 'Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers'
                    })
                }
                else {
                    let newObj = omit(errors, "password");
                    setErrors(newObj);
                }
                break;
            case 'confirmpassword':
                if (value != values.password) {
                    setErrors({
                        ...errors,
                        confirmpassword: 'Passwords not Macthed'
                    })
                }
                else {
                    let newObj = omit(errors, "confirmpassword");
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

export default ForgotValidate