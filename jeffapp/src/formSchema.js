import * as yup from 'yup';

const formSchema = yup.object().shape({
    first_name: yup
        .string()
        .trim()
        .required("Please Enter A First Name"),
    last_name: yup
        .string()
        .trim()
        .required("Please Enter A Last Name"),
    email: yup
        .string()
        .email()
        .required("Please Enter A Valid Email"),
    password: yup
        .string()
        .trim()
        .required("Please Create A Passwrod"),
    tos: yup.boolean()
});

export default formSchema;