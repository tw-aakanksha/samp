import React, { useState } from 'react';

import './signup-buyer-component.css';

import Modal from 'react-bootstrap/Modal';
import {
  createAuthUserWithEmailAndPassword_Buyer,
  createUserDocumentFromAuth_Buyer,
} from '../../utils/firebase_buyer/firebasebuyer-utils';

import Backdrop from '../../routes/navigation/backdrop';

import ModalPopUP from './modal';

import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignupBuyer = () => {
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

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      const { user } = await createAuthUserWithEmailAndPassword_Buyer(
        email,
        password
      );

      const res = await createUserDocumentFromAuth_Buyer(user, { displayName });
      console.log(res);

      navigate('/loginbuyer');
      resetFormFields();
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        alert('email alreday in use');
      }
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
    setPassword(item);
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

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const onModalClose = () => {
    console.log('OnModalClose');
    setShow(false);
  };

  const onModalOk = () => {
    console.log('OnModalOK');
    handleSubmit();
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const SubmitButton = () => {
    if (
      !displayNameErr &&
      !passwordErr &&
      !confirmPasswordErr &&
      !emailErr &&
      displayName.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      return (
        <>
          <Button className="button-signup" onClick={handleShow}>
            SignUp
          </Button>
        </>
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
        <ModalPopUP
          show={show}
          handleClose={handleClose}
          onModalClose={onModalClose}
          onModalOk={onModalOk}
        />
      </form>
    </div>
  );
};

export default SignupBuyer;
