import '../Css/Admin_ProfileDropdown.css';
import React, {useState} from "react";

function Admin_ProfileDropdown() {
    return (
      <div className='card9'>
        <h4>
          Hi Admin, username!
        </h4>
        <div className='cont'>
            <button className='button9'>Log Out</button>
        </div>
      </div>
    );
}

export default Admin_ProfileDropdown;