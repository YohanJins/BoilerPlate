import React, {useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';


function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/hello')
    .then(response => console.log(response.data))
  },[])

  const clickHandler = () => {
    axios.get('/api/users/logout')
      .then(response => {
        if(response.data.logoutSuccess) {
          navigate("/login")
        }else {
          alert("Failed to log out")
        }
      })
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh'
    }}>
      <h2>Landing Page</h2>

      <br />

      <button onClick={clickHandler}>
        Log Out
      </button>
    </div>
  )
}

export default Auth(LandingPage, null)