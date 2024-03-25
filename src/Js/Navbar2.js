import logo from '../Images/logo.png';
import '../Css/Navbar2.css';
import { Link } from 'react-router-dom';


function Navbar2() {
  return (
      <div className="NavBar2">
        <div className="NavBar2-left">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="NavBar2-right">
          <button className='notifications'>Log Out</button>
        </div>
      </div>
  );
}

export default Navbar2;