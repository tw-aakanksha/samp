import React from 'react';
import { useState } from 'react';

const Validation = () => {
  const [email, setEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [emailErr, setEmailErr] = useState({});
  const [displayNameErr, setDisplayNameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [confirmPasswordErr, setConfirmPasswordErr] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = formValidations();
  };

  const formValidations = () => {
    const emailErr = {};
    const displayNameErr = {};
    const passwordErr = {};
    const confirmPasswordErr = {};
    let isValid = true;

    if (!displayName || displayName.trim() === '') {
      displayNameErr.displayNameNull = 'Firstname is Required';
      isValid = false;
    }
    if (
      displayName.length < 4 ||
      displayName.length > 10 ||
      !displayName.match(/^[a-zA-Z0-9]+$/)
    ) {
      displayNameErr.displayNameShort =
        'Firstname should contain 4 letters min,10 letters Max and only numbers';
      isValid = false;
    }

    if (!email || email.trim() === '') {
      emailErr.emailNull = 'Email is Required';
      isValid = false;
    }

    setDisplayNameErr(displayNameErr);
    return isValid;
  };

  return (
    <div className="signup-container">
      <h1>Register as a Buyer</h1>
      <span>Sign up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <label>First name:</label>
        <input
          type="text"
          required
          onChange={(e) => {
            setDisplayName(e.target.value);
          }}
          name="displayName"
          value={displayName}
          autoComplete="off"
        />

        <div>
          <span className="text-danger">
            {Object.keys(displayNameErr).map((key) => {
              return <div> {displayNameErr[key]}</div>;
            })}
          </span>
        </div>

        <label>Email</label>
        <input
          type="email"
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
          value={email}
          autoComplete="off"
        />

        <label>Password</label>
        <input
          type="password"
          required
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
          value={password}
          autoComplete="off"
        />

        <label>Confirm Password</label>
        <input
          type="password"
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit" className="button-signup">
          SIGN UP
        </button>
      </form>
    </div>
  );
};

export default Validation;
