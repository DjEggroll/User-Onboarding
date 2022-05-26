import React, { useState } from 'react';
import formSchema from './formSchema';


const initialFormValues = {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    tos: false
}

export default function Form(props){
    const [formValues, setFormValues] = useState(initialFormValues);
    const [disabled, setDisabled] = useState(true)
    

    const change = event => {
        const { name, type, value, checked} = event.target;
        const valueToUse = type === "checkbox" ? checked : value;
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

                </div>
            </form>
        </div>
    )
}