import React, { useState } from "react";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../utils/firebase/firebase";
import { createUserDocumentFromAuth, createAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase";

import "./sign-up.scss";

const SignUp = () => {
  const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
  };
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password } = formFields;


  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createAuthUserWithEmailAndPassword( email, password);
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      console.log("User created successfully!");
    } catch (error) {
      console.log(error.message);
    }
  };


  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };


  return (
    <div className="sign-up">
      <h2>Sign Up</h2>
      <div className="home__right_divider"></div>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder="Display Name"
          name='displayName'
          value={displayName}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          autoComplete="on"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          autoComplete="on"
          name="password"
          value={password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;