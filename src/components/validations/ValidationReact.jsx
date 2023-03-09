import React, { useState } from 'react';

import './validation.css';

import {
  createAuthUserWithEmailAndPassword_Seller,
  createUserDocumentFromAuth_Seller,
} from '../../utils/firebase_seller/firebaseseller-utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const ValidationReact = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailErr, setEmailErr] = useState(false);
  const [displayNameErr, setDisplayNameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [confirmPasswordErr, setConfirmPasswordErr] = useState(false);

  const resetFormFields = () => {
    setDisplayName(defaultFormFields.displayName);
    setEmail(defaultFormFields.email);
    setPassword(defaultFormFields.password);
    setConfirmPassword(defaultFormFields.confirmPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('password do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword_Seller(
        email,
        password
      );

      const res = await createUserDocumentFromAuth_Seller(user, {
        displayName,
      });
      console.log(res);

      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use')
        alert('cannot create user, email already in use');
      else if (error.code === 'auth/invalid-email')
        alert('Enter Valid email address');
      else if (error.code === 'auth/weak-password')
        alert('Password should be min 6 characters');
      else console.log('error', error.message);
    }
  };

  const displayNameHandler = (e) => {
    let item = e.target.value;
    if (item.length < 4 || item.length > 16 || !item.match(/^[a-zA-Z]+$/)) {
      setDisplayNameErr(true);
    } else {
      setDisplayNameErr(false);
    }

    setDisplayName(item);
  };

  const emailHandler = (e) => {
    let item = e.target.value;
    if (!item.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailErr(true);
    } else {
      setEmailErr(false);
    }
    setEmail(item);
  };

  const passwordHandler = (e) => {
    let item = e.target.value;
    if (
      !item.match(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/) ||
      item.length < 0
    ) {
      setPasswordErr(true);
    } else {
      setPasswordErr(false);
    }
    password = setPassword(item);
    console.log(password);
  };

  const confirmPasswordHandler = (e) => {
    let item = e.target.value;
    if (password != item) {
      setConfirmPasswordErr(true);
    } else {
      setConfirmPasswordErr(false);
    }
    setConfirmPassword(item);
  };

  const SubmitButton = () => {
    if (!displayNameErr && !passwordErr && !confirmPasswordErr && !emailErr) {
      return (
        <button type="submit" className="button-signup">
          SIGN UP
        </button>
      );
    } else {
      return (
        <button type="submit" className="button-signup-disabled" disabled>
          SIGN UP
        </button>
      );
    }
  };

  return (
    <div className="signup-buyer-container">
      <h1>Signup as a Buyer</h1>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          required
          onChange={emailHandler}
          name="email"
          value={email}
          autoComplete="off"
        />
        <div className="text-danger">
          {' '}
          {emailErr ? (
            <span>Email Id is not Valid, Please enter valid email</span>
          ) : (
            ''
          )}{' '}
        </div>

        <br></br>

        <label>Display Name </label>
        <input
          type="text"
          required
          onChange={displayNameHandler}
          name="displayName"
          value={displayName}
          autoComplete="off"
        />

        <div className="text-danger">
          {' '}
          {displayNameErr ? (
            <span>
              Display name should contain minimum 4 charcters and Maximum of 16
              charcters
            </span>
          ) : (
            ''
          )}{' '}
        </div>
        <br></br>

        <label>Password</label>
        <input
          type="password"
          required
          onChange={passwordHandler}
          name="password"
          value={password}
          autoComplete="off"
        />

        <div className="text-danger">
          {' '}
          {passwordErr ? (
            <span>
              Password should contain atleast one uppercase,one lowercase,one
              letter and a special character with minimum of length 8 characters
            </span>
          ) : (
            ''
          )}
        </div>

        <br></br>

        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={confirmPasswordHandler}
          name="confirmPassword"
          value={confirmPassword}
        />

        <div className="text-danger">
          {' '}
          {confirmPasswordErr ? (
            <span>Password and Confirm Password are not matching</span>
          ) : (
            ''
          )}
        </div>

        <br></br>

        <SubmitButton />

        {/* <button type="submit" className="button-signup"  disabled= {!(setConfirmPasswordErr||setDisplayNameErr||setEmailErr||setPasswordErr)} >SIGN P</button> */}
      </form>
    </div>
  );
};

export default ValidationReact;
