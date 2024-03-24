import '../Css/RegularUser_ProfileDropdown.css';
import React, {useState} from "react";

function RegularUser_ProfileDropdown() {
    return (
      <div className="card7">
        <h4>
          Hi, username!
        </h4>
        <div className='cont'>
            <button className='button7'>Log Out</button>
            <button className='button7'>Request as Organizer</button>
            <button className='button7'>Request as Administrator</button>
        </div>
      </div>
    );
}

export default RegularUser_ProfileDropdown;