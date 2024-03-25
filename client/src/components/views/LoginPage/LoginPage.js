import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const emailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const passwordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    };

    dispatch(loginUser(body))
      .then(response => {
        if (response.payload.loginSuccess) {
          navigate('/'); // 로그인 성공 시 홈페이지로 이동
        } else {
          alert('Error');
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
        <label>Password</label>
        <input type="password" value={Password} onChange={passwordHandler} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
