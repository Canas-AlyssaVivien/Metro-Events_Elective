import logo from '../Images/logo.png';
import '../Css/Navbar1.css';
import { Link } from 'react-router-dom';


function Navbar1() {
  return (
      <div className="NavBar">
        <div className="NavBar-left">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="NavBar-right">
          <Link to="/login" className="app-bar-button">Log In</Link>
          <Link to="/signup" className="last-button">Sign Up</Link>
          <Link to="/adminlogin" className="last-button">Admin</Link>
        </div>
      </div>
  );
}

export default Navbar1;