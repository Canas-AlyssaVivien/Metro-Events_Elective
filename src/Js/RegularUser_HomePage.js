import '../Css/RegularUser_HomePage.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

function RegularUser_HomePage() {
  
  return (
      <div className='body3'>
        <button className="organizerbutton">Send Request to be an Organizer</button>
        <div className='card3'>
          <h4>Events</h4>
        </div>
      </div>
  );
}

export default RegularUser_HomePage;