import '../Css/LogIn_Page.css';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from './firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Validation from './LoginValidation';
import axios from 'axios';

function LogIn_Page() {
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
      }
    })
    .catch(err => console.log(err));
    
    // console.log("Email:", email);
    // console.log("Password:", password);

    // signInWithEmailAndPassword(auth, email, password)
    //   .then((userCredential) => {
    //     console.log("User Credential:", userCredential);
    //     history.push('/home');
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
  
    //     console.log("Error Code:", errorCode);
    //     console.log("Error Message:", errorMessage);
    //   });
  };
  
  return (
      <div className='body1'>
        <div className='card1'>
            <div className='name1'>
              <h1>Log in to your account</h1>
            </div>
            <div className='buttons1'>
              <button>Continue with Facebook</button>
              <button>Continue with Google</button>
            </div>
            <div className='or'>
              <hr className='line' />
              <h2>OR</h2>
              <hr className='line' />
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
                  <span className="password-icon">Hide</span>
                </div>
                <input
                  type="password"
                  name = 'password'
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '1px', marginBottom: '10px'}}
                ></input>
                <div className='rower'>
                  <span className="forgot-password" style={{marginBottom: '50px'}}>Forgot Password?</span>
                </div>
                <button type='submit' className="button">Log In</button>
              </form>
            </div>
        </div>
      </div>
  );
}

export default LogIn_Page;