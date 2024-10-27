// lib/validation.js
import * as Yup from 'yup';

const userSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .required('Password is required'),
});

const contactSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  address: Yup.string().optional(),
  timezone: Yup.string().required('Timezone is required'),
});

export { userSchema, contactSchema };
