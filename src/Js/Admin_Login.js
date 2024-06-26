import '../Css/LogIn_Page.css';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import Validation from './LoginValidation';
import axios from 'axios';

function Admin_Login() {
  const history = useHistory();
  const [user, setUser] = useState(null);

  const [values, setValues] = useState({
      email: '',
      password: ''
  });

  const [errors, setErrors] = useState({})

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name] : [e.target.value]}))
  }

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault(); 
    setErrors(Validation(values));

    axios.post('http://localhost:8081/login', values)
    .then(res => {
      const userData = res.data[0];
      setUser(userData);
      
      const usertype = user.usertype;
      console.log(user);
      console.log('User Type: ' + usertype);
      
      if(usertype == 0) {
        history.push('/home');
      } else if(usertype == 1) {
        history.push('/organizerhome')
      } else {
        history.push('/admin')
      }
    })
    .catch(err => console.log(err));
  }
  
  return (
      <div className='body1'>
        <div className='card1'>
            <div className='name1'>
              <h1>Administrator Log In</h1>
            </div>
            <div className='login'>
              <form onSubmit={handleSubmit}>
                <label>Email Address</label>
                <input 
                  type="email"
                  name = 'email'
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}
                ></input>
                <div className='password-row'>
                  <label>Password</label>
                </div>
                <input
                  type="password"
                  name = 'password'
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '1px', marginBottom: '10px'}}
                ></input>
                <button type='submit' className="lbutton">Log In</button>
              </form>
            </div>
        </div>
      </div>
  );
}

export default Admin_Login;