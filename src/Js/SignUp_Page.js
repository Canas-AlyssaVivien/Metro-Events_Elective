import '../Css/SignUp_Page.css';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

function SignUp_Page() {
  const history = useHistory();

  const [values, setValues] = useState({
    usertype: 0,
    email: '',
    username: '',
    password: ''
  });

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name] : [e.target.value]}))
  }

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    axios.post('http://localhost:8081/signup', values)
    .then(res => {
      console.log(res);
      history.push('/login');
      console.log('Success');
    }).catch(err => console.log(err));
  };
  
  return (
      <div className='body2'>
        <div className='card2'>
            <div className='name2'>
              <h1>Create an account</h1>
            </div>
            <div className='login'>
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                  type="text"
                  name = 'username'
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}
                ></input>

                <label>Email Address</label>
                <input
                  type="email"
                  name = 'email'
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}
                ></input>

                <label>Password</label>
                <input
                  type="password"
                  name = 'password'
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '1px', marginBottom: '10px'}}
                ></input>

                <button type='submit' className="sbutton">Sign Up</button>
              </form>
            </div>
        </div>
      </div>
  );
}

export default SignUp_Page;