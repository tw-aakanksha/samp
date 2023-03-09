import { useState, useEffect } from 'react';
import { createUserDocumentFromAuth_Buyer } from '../utils/firebase_buyer/firebasebuyer-utils';
import { createAuthUserWithEmailAndPassword_Buyer } from '../utils/firebase_buyer/firebasebuyer-utils';

import FormInput from '../components/form-input/form-input-component';
import './signup-buyer-component.css';
import { useImmerReducer } from 'use-immer';
import { CSSTransition } from 'react-transition-group';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignupBuyer = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);

  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  console.log(formFields);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      alert('password do not match');
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword_Buyer(
        email,
        password
      );

      const res = await createUserDocumentFromAuth_Buyer(user, { displayName });

      resetFormFields();
    } catch (error) {
      if (error.code == 'auth/email-already-in-use')
        alert('cannot create user, email already in use');
      else if (error.code == 'auth/invalid-email')
        alert('Enter Valid email address');
      else console.log('error', error.message);
    }
  };

  // const initialState = {
  //     username: {
  //       value: "",
  //       hasErrors: false,
  //       message: "",
  //       isUnique: false,
  //       checkCount: 0,
  //     },
  //     email: {
  //       value: "",
  //       hasErrors: false,
  //       message: "",
  //       isUnique: false,
  //       checkCount: 0,
  //     },
  //     password: {
  //       value: "",
  //       hasErrors: false,
  //       message: "",
  //     },
  //     submitCount: 0,
  //   }

  //   function ourReducer(draft, action) {
  //     switch (action.type) {
  //       case "usernameImmediately":
  //         draft.username.hasErrors = false
  //         draft.username.value = action.value
  //         if (draft.username.value.length > 30) {
  //           draft.username.hasErrors = true
  //           draft.username.message = "Username cannot exceed 30 characters."
  //         }
  //         if (draft.username.value && !/^([a-zA-Z0-9]+)$/.test(draft.username.value)) {
  //           draft.username.hasErrors = true
  //           draft.username.message = "Username can only contain letters and numbers."
  //         }
  //         return
  //       case "usernameAfterDelay":
  //         if (draft.username.value.length < 3) {
  //           draft.username.hasErrors = true
  //           draft.username.message = "Username must be at least 3 characters."
  //         }
  //         if (!draft.username.hasErrors && !action.noRequest) {
  //           draft.username.checkCount++
  //         }
  //         return
  //       case "usernameUniqueResults":
  //         if (action.value) {
  //           draft.username.hasErrors = true
  //           draft.username.isUnique = false
  //           draft.username.message = "That username is already taken."
  //         } else {
  //           draft.username.isUnique = true
  //         }
  //         return
  //       case "emailImmediately":
  //         draft.email.hasErrors = false
  //         draft.email.value = action.value
  //         return
  //       case "emailAfterDelay":
  //         if (!/^\S+@\S+$/.test(draft.email.value)) {
  //           draft.email.hasErrors = true
  //           draft.email.message = "You must provide a valid email address."
  //         }
  //         if (!draft.email.hasErrors && !action.noRequest) {
  //           draft.email.checkCount++
  //         }
  //         return
  //       case "emailUniqueResults":
  //         if (action.value) {
  //           draft.email.hasErrors = true
  //           draft.email.isUnique = false
  //           draft.email.message = "That email is already being used."
  //         } else {
  //           draft.email.isUnique = true
  //         }
  //         return
  //       case "passwordImmediately":
  //         draft.password.hasErrors = false
  //         draft.password.value = action.value
  //         if (draft.password.value.length > 50) {
  //           draft.password.hasErrors = true
  //           draft.password.message = "Password cannot exceed 50 characters."
  //         }
  //         return
  //       case "passwordAfterDelay":
  //         if (draft.password.value.length < 12) {
  //           draft.password.hasErrors = true
  //           draft.password.message = "Password must be at least 12 characters."
  //         }
  //         return
  //       case "submitForm":
  //         if (!draft.username.hasErrors && draft.username.isUnique && !draft.email.hasErrors && draft.email.isUnique && !draft.password.hasErrors) {
  //           draft.submitCount++
  //         }
  //         return
  //     }
  //   }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  //   const [state, dispatch] = useImmerReducer(ourReducer, initialState)

  // useEffect(() => {
  //   if (state.username.value) {
  //     const delay = setTimeout(() => dispatch({ type: "usernameAfterDelay" }), 800)
  //     return () => clearTimeout(delay)
  //   }
  // }, [state.username.value])

  // useEffect(() => {
  //   if (state.email.value) {
  //     const delay = setTimeout(() => dispatch({ type: "emailAfterDelay" }), 800)
  //     return () => clearTimeout(delay)
  //   }
  // }, [state.email.value])

  // useEffect(() => {
  //   if (state.password.value) {
  //     const delay = setTimeout(() => dispatch({ type: "passwordAfterDelay" }), 800)
  //     return () => clearTimeout(delay)
  //   }
  // }, [state.password.value])

  // function handleSubmit1(e) {
  //   e.preventDefault()
  //   dispatch({ type: "usernameImmediately", value: state.username.value })
  //   dispatch({ type: "usernameAfterDelay", value: state.username.value, noRequest: true })
  //   dispatch({ type: "emailImmediately", value: state.email.value })
  //   dispatch({ type: "emailAfterDelay", value: state.email.value, noRequest: true })
  //   dispatch({ type: "passwordImmediately", value: state.password.value })
  //   dispatch({ type: "passwordAfterDelay", value: state.password.value })
  //   dispatch({ type: "submitForm" })
  // }

  return (
    <div className="signup-buyer-container">
      <h1>Register as a Buyer</h1>
      <span>Sign up with your Email and Password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit" className="button-signupbuyer">
          SIGN UP
        </button>
      </form>

      {/* <form onSubmit={handleSubmit1}>
            <div className="form-group">
              <label htmlFor="username-register" className="text-muted mb-1">
                <small>Username</small>
              </label>
              <input onChange={(e) => dispatch({ type: "usernameImmediately", value: e.target.value })} id="username-register" name="username" className="form-control" type="text" placeholder="Pick a username" autoComplete="off" />
              <CSSTransition in={state.username.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.username.message}</div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="email-register" className="text-muted mb-1">
                <small>Email</small>
              </label>
              <input onChange={(e) => dispatch({ type: "emailImmediately", value: e.target.value })} id="email-register" name="email" className="form-control" type="text" placeholder="you@example.com" autoComplete="off" />
              <CSSTransition in={state.email.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.email.message}</div>
              </CSSTransition>
            </div>
            <div className="form-group">
              <label htmlFor="password-register" className="text-muted mb-1">
                <small>Password</small>
              </label>
              <input onChange={(e) => dispatch({ type: "passwordImmediately", value: e.target.value })} id="password-register" name="password" className="form-control" type="password" placeholder="Create a password" />
              <CSSTransition in={state.password.hasErrors} timeout={330} classNames="liveValidateMessage" unmountOnExit>
                <div className="alert alert-danger small liveValidateMessage">{state.password.message}</div>
              </CSSTransition>
            </div>
            <button type="submit" className="py-3 mt-4 btn btn-lg btn-success btn-block">
              Sign up for ComplexApp
            </button>
          </form> */}
    </div>
  );
};

export default SignupBuyer;
