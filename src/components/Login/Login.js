import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';


//Email reducer function
const emailReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
  return { value: action.val, isValid: action.val.includes('@') };
}
if(action.type === 'INPUT_BLUR') {
  //We use the state to check the last email state if its valid
  return { value: state.value, isValid: state.value.includes('@') };
}
//If the user has not entered any entry the email is invalid
return { value: '', isValid: false };
}


//Password reducer function

const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT') {
  return { value: action.val, isValid: action.val.trim().length > 6 };
}
  if(action.type === 'INPUT_BLUR') {
    //We use the state to check the last password set
  return { value: state.value, isValid: state.value.trim().length > 6 };
}
  //If the user has not entered any entry the password is invalid

  return { value: '', isValid: false };
}

const Login = (props) => {
  //const [enteredEmail, setEnteredEmail] = useState('');
  //const [emailIsValid, setEmailIsValid] = useState();
  //const [enteredPassword, setEnteredPassword] = useState('');
  //const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false); 

 
   

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null
  })

  //Object destructuring
  //We use it when we want to only get access to a single property of an object
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking form validity')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500)
    clearTimeout();
    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    }
    /*It is highly advisable to use object destructuring here
      so as to only get have useEffect run when the propeties emailIsValid and passwordIsValid change
      and not when the whole object changes
    */
    
  }, [ emailIsValid, passwordIsValid])  


  const emailChangeHandler = (event) => {
    dispatchEmail({type: 'USER_INPUT', val: event.target.value})
    //setEnteredEmail(event.target.value);

    
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val: event.target.value})
    //setEnteredPassword(event.target.value);
    
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR'})
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
