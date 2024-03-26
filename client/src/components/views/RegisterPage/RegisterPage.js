import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const emailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const NameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const ConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    if(Password !== ConfirmPassword) {
      return alert("Input Same Password")
    }

    let body = {
      email: Email,
      name: Name,
      password: Password      
    };

    dispatch(registerUser(body))
      .then(response => {
        if (response.payload.success) {
          navigate('/login');
        } else {
          alert('Failed to sign up');
        }
      });
  };


  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <form style={{
        display:'flex', flexDirection:'column'
      }}
      onSubmit={submitHandler}>
        <label>Email</label>
        <input type="email" value={Email} onChange={emailHandler} />

        <label>Name</label>
        <input type="text" value={Name} onChange={NameHandler} />

        <label>Password</label>
        <input type="password" value={Password} onChange={passwordHandler} />

        <label>Confirm Password</label>
        <input type="password" value={ConfirmPassword} onChange={ConfirmPasswordHandler} />

        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default RegisterPage