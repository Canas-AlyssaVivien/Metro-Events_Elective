import '../Css/Landing_Page.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function Landing_Page() {
  
  return (
      <div className='body'>
        <div className='card'>
            <div className='name'>
                <h1>Metro Events</h1>
            </div>
            <h4 className='para'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi lobortis maximus nunc, ac rhoncus odio congue quis.
                Sed ac semper orci, eu porttitor lacus.
            </h4>
            <div className='signup'>
                <input type="email" placeholder="Enter Your Email Address" style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '1px'}}/>
                <button className="button">Sign Up</button>
            </div>
        </div>
      </div>
  );
}

export default Landing_Page;