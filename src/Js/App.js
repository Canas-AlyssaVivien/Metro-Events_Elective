import '../Css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import React, { useState, useEffect } from 'react';
import Navbar1 from './Navbar1';
import Landing_Page from './Landing_Page';
import LogIn_Page from './LogIn_Page';

function App() {

  return (
    <Router>
      <div className='MainPage'>
        <Navbar1/>
        <Switch>
          <Route exact path="/" component={Landing_Page} />
          <Route exact path="/login" component={LogIn_Page} />
        </Switch>
      </div>
    </Router>
  );
} 

export default App;