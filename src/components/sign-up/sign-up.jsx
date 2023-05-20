
import React from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate} from 'react-router-dom';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { 
  db, 
  createUserDocumentFromAuth, 
  createAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase";
import "./sign-up.scss";


const SignUp = () => {

  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    displayName: Yup.string()
      .required('Display Name is required')
      .matches(/^[a-zA-Z]+\s[a-zA-Z]+$/, 'Please enter your first and last name'),
    email: Yup.string()
      .required('Email is required')
      .email('Please enter a valid email address'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  });

  
  const generateUniqueCardNumber = async () => {

    let newCardNumber = null;
    let exists = true;

    while (exists) {
      const min = 10 ** 15;
      const max = (10 ** 16) - 1;
      const cardNumber = Math.floor(Math.random() * (max - min + 1) + min);
      exists = await checkCardNumberExists(cardNumber);
      if (!exists) {
        newCardNumber = cardNumber;
      }
    }

    return newCardNumber;
  };

    
  const checkCardNumberExists = async (cardNumber) => {

    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('cardNumber', '==', cardNumber));
    const querySnapshot = await getDocs(q);

    return !querySnapshot.empty;
  };


  const generateCardNumberBack = async () => {

    const min = 10 ** 2;
    const max = (10 ** 3) - 1;
    const cardNumberBack = Math.floor(Math.random() * (max - min + 1) + min);

    return cardNumberBack;
  };


  const formik = useFormik({
    initialValues: {
      displayName: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async ({ displayName, email, password }) => {
      try {
        const newCardNumber = await generateUniqueCardNumber();
        const cardNumberBack = await generateCardNumberBack();

        const { user } = await createAuthUserWithEmailAndPassword(email, password);
        await createUserDocumentFromAuth(user, { displayName, cardNumber: newCardNumber, cardNumberBack: cardNumberBack });
        // console.log("User created successfully!");
        navigate('/main');
      } catch (error) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          formik.setErrors({ email: 'Email is already used' });
        } else {
          // console.log(error.message);
        }
      }
    },
  });

  

  return (
    <div className="sign-up">
    <h2>Sign Up</h2>
    <div className="home__right_divider"></div>
    <form onSubmit={formik.handleSubmit}>
      <div className="input-wrapper">
        <input
          type='text'
          placeholder="Display Name"
          name='displayName'
          value={formik.values.displayName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
        />
        {formik.touched.displayName && formik.errors.displayName ? (
          <div className="error error__sign-up">{formik.errors.displayName}</div>
        ) : null}
      </div>
      <div className="input-wrapper">
        <input
          type="email"
          placeholder="Email"
          autoComplete="on"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="error error__sign-up">{formik.errors.email}</div>
        ) : null}
      </div>
      <div className="input-wrapper">
        <input
          type="password"
          placeholder="Password"
          autoComplete="on"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="off"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="error error__sign-up">{formik.errors.password}</div>
        ) : null}
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
  );
};

export default SignUp;