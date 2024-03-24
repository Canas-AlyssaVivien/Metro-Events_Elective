import '../Css/Admin_HomePage.css';
import React, { useState } from 'react';

function Admin_HomePage() {
    return(
        <div className='body6'>
            <div className='card6-container'>
                <div className='card6-column'>
                        <h4>Users</h4>
                </div>
                <div className='card6-divider'></div>
                <div className='card6-column'>
                        <h4>Events</h4>
                </div>
            </div>
        </div>
    );

}

export default Admin_HomePage;