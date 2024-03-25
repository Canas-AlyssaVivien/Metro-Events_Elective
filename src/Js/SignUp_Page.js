import '../Css/SignUp_Page.css';
import { useNavigate } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, set } from "firebase/database";
import {db} from './firebase';
import axios from 'axios';
import Validation from './SignupValidation'

function SignUp_Page() {
  const [values, setValues] = useState({
    usertype: 0,
    email: '',
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({})

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name] : [e.target.value]}))
  }

  // const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    axios.post('http://localhost:8081/signup', values)
    .then(res => console.log(res))
    .catch(err => console.log(err));
   

    // createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //   console.log(userCredential);

    //   const userId = userCredential.user.uid;

    //   const userRef = ref(db, `Users/${userId}`);
    //   set(userRef, {
    //     username: username,
    //     email: email,
    //     password: password,
    //     userType: 0
    //   })
    //     .then(() => {
    //       console.log('User data added successfully');
    //       history.push('/login');
    //     })
    //     .catch((error) => {
    //       console.error('Error adding user data: ', error);
    //     });
    // }).catch((error) => {
    //   console.log(error);
    // })
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

                <div className='rower'>
                    <label className="checkbox-container" style={{marginTop: '20px'}}>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <span className="terms" style={{ marginBottom: '50px', marginTop: '20px' }}>
                        By creating an account, I agree to our Terms of use and Privacy Policy
                    </span>
                </div>
                <button type='submit' className="button">Sign Up</button>
              </form>
            </div>
        </div>
      </div>
  );
}

export default SignUp_Page;