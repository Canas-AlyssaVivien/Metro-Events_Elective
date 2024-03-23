import '../Css/LogIn_Page.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function LogIn_Page() {
  
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
              <label>Email Address</label>
              <input type="email" style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}/>
              <div className='password-row'>
                <label>Password</label>
                <span className="password-icon">Hide</span>
              </div>
              <input type="password" style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '1px', marginBottom: '10px'}}/>
              <div className='rower'>
                <span className="forgot-password" style={{marginBottom: '50px'}}>Forgot Password?</span>
              </div>
              <button className="button">Log In</button>
            </div>
        </div>
      </div>
  );
}

export default LogIn_Page;