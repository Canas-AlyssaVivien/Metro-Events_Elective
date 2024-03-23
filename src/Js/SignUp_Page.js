import '../Css/SignUp_Page.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function SignUp_Page() {
  
  return (
      <div className='body2'>
        <div className='card2'>
            <div className='name2'>
              <h1>Create an account</h1>
            </div>
            <div className='login'>
                <label>First Name</label>
                <input type="text" style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}/>

                <label>Last Name</label>
                <input type="text" style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}/>

                <label>Email Address</label>
                <input type="email" style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}/>

                <label>Password</label>
                <input type="password" style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '1px', marginBottom: '10px'}}/>

                <div className='rower'>
                    <label className="checkbox-container" style={{marginTop: '20px'}}>
                        <input type="checkbox" />
                        <span className="checkmark"></span>
                    </label>
                    <span className="terms" style={{ marginBottom: '50px', marginTop: '20px' }}>
                        By creating an account, I agree to our Terms of use and Privacy Policy
                    </span>
                </div>

                <button className="button">Sign Up</button>
            </div>
        </div>
      </div>
  );
}

export default SignUp_Page;