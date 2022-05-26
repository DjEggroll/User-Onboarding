import React, { useState, useEffect } from 'react';
import formSchema from './formSchema';
import * as yup from 'yup';


const initialFormValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    tos: false
}

const initialErrors = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
}

export default function Form(props){
    const [formValues, setFormValues] = useState(initialFormValues);
    const [disabled, setDisabled] = useState(true);
    const [errors, setErrors] = useState(initialErrors);

    const validate = (name, value) => {
        yup.reach(formSchema, name).validate(value)
        .then(() => setErrors({ ...errors, [name]: "" }))
        .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }

    useEffect(() => {
        formSchema.isValid(formValues).then(valid => setDisabled(!valid))
    }, [formValues])
    

    const change = event => {
        const { name, type, value, checked} = event.target;
        const valueToUse = type === "checkbox" ? checked : value;
        validate(name, value);
        setFormValues({ ...formValues, [name]: valueToUse});
    }

    const {addNewUser} = props;

    const submit = (event) => {
        event.preventDefault();

        const newUser = {
            first_name: formValues.first_name.trim(),
            last_name: formValues.last_name.trim(),
            email: formValues.email.trim(),
            password: formValues.password.trim(),
            tos: formValues.tos
        }

        addNewUser(newUser)
            .catch(err => console.error(err))
            .finally(() => setFormValues(initialFormValues));

        
    }


    return(
        <div>
            <form onSubmit={submit}>
                <div>
                    <label>First Name
                        <input type='text' name='first_name' value={formValues.first_name} onChange={change}/>
                    </label>

                    <label>Last Name
                        <input type='text' name='last_name' value={formValues.last_name} onChange={change}/>
                    </label>

                    <label>Email
                        <input type='email' name='email' value={formValues.email} onChange={change}/>
                    </label>

                    <label>Password
                        <input type='text' name='password' value={formValues.password} onChange={change}/>
                    </label>

                    <label>Terms of Service
                        <input type='checkbox' name='tos' checked={formValues.tos} onChange={change}/>
                    </label>

                    <button disabled={disabled}>Submit</button>
                    <div>{errors.first_name}</div>
                    <div>{errors.last_name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>

                </div>
            </form>
        </div>
    )
}