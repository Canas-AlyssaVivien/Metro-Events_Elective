import '../Css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import React, { useState, useEffect } from 'react';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Landing_Page from './Landing_Page';
import LogIn_Page from './LogIn_Page';
import SignUp_Page from './SignUp_Page';
import RegularUser_HomePage from './RegularUser_HomePage';
import Organizer_NotificationDropDown from './Organize_NotificationDropDown';
import Admin_NotificationsDropdown from './Admin_NotificationsDropdown';
import Admin_HomePage from './Admin_HomePage';
import RegularUser_ProfileDropdown from './RegularUser_ProfileDropdown';
import Organizer_ProfileDropdown from './Organizer_ProfileDropdown';
import Admin_ProfileDropdown from './Admin_ProfileDropdown';

function App() {

  return (
    <Router>
      <div className='MainPage'>
        <Switch>
          <Route exact path="/"> 
            <Navbar1/>
            <Landing_Page/>
          </Route>
          <Route exact path="/login">
            <Navbar1/>
            <LogIn_Page/>
          </Route>
          <Route exact path="/signup">
            <Navbar1/>
            <SignUp_Page/>
          </Route>
          <Route exact path="/home"> 
            <Navbar2/>
            <RegularUser_HomePage/>
          </Route>
          <Route exact path="/adminhome"> 
            <Navbar2/>
            <Admin_HomePage/>
          </Route>
          <Route exact path="/orgnotif"> 
            <Navbar2/>
            <Organizer_NotificationDropDown/>
          </Route>
          <Route exact path="/adminnotif"> 
            <Navbar2/>
            <Admin_NotificationsDropdown/>
          </Route>
          <Route exact path="/regprof"> 
            <Navbar2/>
            <RegularUser_ProfileDropdown/>
          </Route>
          <Route exact path="/orgprof"> 
            <Navbar2/>
            <Organizer_ProfileDropdown/>
          </Route>
          <Route exact path="/adminprof"> 
            <Navbar2/>
            <Admin_ProfileDropdown/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
} 

export default App;