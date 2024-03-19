import * as yup from 'yup';
const signUpSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), undefined], 'Passwords must match'),
});

export default signUpSchema;
