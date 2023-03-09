import React, { useState } from 'react';

import './signup-seller-component.css';

import {
  createAuthUserWithEmailAndPassword_Seller,
  createUserDocumentFromAuth_Seller,
} from '../../utils/firebase_seller/firebaseseller-utils';

import ModalPopUP from './modal';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignupSeller = () => {
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

      navigate('/loginseller');

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

  // const  SubmitButton =() =>{

  //     if (!displayNameErr && !passwordErr && !confirmPasswordErr && !emailErr && displayName.length>0 && email.length>0 && password.length>0 && confirmPassword.length>0){
  //       return <button type="submit" className="button-signup" >SIGN UP</button>
  //     } else {
  //       return <button type="submit" className="button-signup-disabled" disabled >SIGN UP</button>
  //     };
  //   };

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
          <button className="button-signup" onClick={handleShow}>
            SignUp
          </button>
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

  return (
    <div className="signup-seller-container">
      <h1>Signup as a Seller</h1>
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

export default SignupSeller;

// import { useState } from "react";
// import { createAuthUserWithEmailAndPassword_Seller, createUserDocumentFromAuth_Seller } from "../../utils/firebase_seller/firebaseseller-utils";

// import './signup-seller-component.css'

// const defaultFormFields ={
//     displayName :'',
//     email:'',
//     password :'',
//     confirmPassword :''

// }

// const SignupSeller = () => {

//     const [formFields,setFormFields] = useState(defaultFormFields);

//     const{displayName,email,password,confirmPassword} = formFields;

//     const resetFormFields = () =>{
//         setFormFields(defaultFormFields);
//     }

//     console.log(formFields);

//     const handleSubmit = async(event) =>
//     {
//         event.preventDefault();

//         if(password !== confirmPassword)
//         {
//             alert("password do not match");
//             return;
//         }
//         try{
//             const {user} = await createAuthUserWithEmailAndPassword_Seller(email,password);

//             const res = await createUserDocumentFromAuth_Seller(user,{displayName});
//             console.log(res);

//             resetFormFields();
//         }

//         catch(error)
//         {
//             if(error.code === 'auth/email-already-in-use')
//                 alert('cannot create user, email already in use');
//             else if(error.code === 'auth/invalid-email')
//                 alert('Enter Valid email address')
//             else if(error.code === 'auth/weak-password')
//                 alert('Password should be min 6 characters')
//             else
//                 console.log("error",error.message);
//         }

//     }

//     const handleChange =(event) =>
//     {
//         // const {name,value} = event.target;

//         setFormFields({...formFields,[event.target.name]:event.target.value});

//     };

//     return(
//         <div className="signup-container">
//             <h1>
//                 Register as a Seller
//             </h1>
//             <span>
//                 Sign up with your Email and Password
//             </span>
//             <form onSubmit={handleSubmit}>
//             <label>First name:</label>
//             <input
//                 type='text'
//                 required
//                 onChange={handleChange}
//                 name='displayName'
//                 value={displayName}
//                 autoComplete= 'off'
//             />

//             <label>Email</label>
//             <input
//                 type='email'
//                 required
//                 onChange={handleChange}
//                 name='email'
//                 value={email}
//                 autoComplete= 'off'
//             />

//             <label>Password</label>
//             <input
//                 type='password'
//                 required
//                 onChange={handleChange}
//                 name='password'
//                 value={password}
//                 autoComplete= 'off'
//             />

//             <label>Confirm Password</label>
//             <input
//                 type='password'
//                 required
//                 onChange={handleChange}
//                 name='confirmPassword'
//                 value={confirmPassword}
//             />
//                 <button type="submit" className="button-signup">SIGN UP</button>
//             </form>

//         </div>
//     )

// }

// export default SignupSeller;
