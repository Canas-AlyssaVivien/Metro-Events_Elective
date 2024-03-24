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
        </Switch>
      </div>
    </Router>
  );
} 

export default App;