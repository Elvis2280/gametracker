import * as yup from 'yup';
const resetPasswordSchema = yup.object().shape({
  password: yup.string().required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

export default resetPasswordSchema;
