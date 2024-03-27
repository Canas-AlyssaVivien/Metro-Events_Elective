import logo from '../Images/logo.png';
import '../Css/Navbar3.css';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function Navbar3() {
  return (
      <div className="NavBar2">
        <div className="NavBar2-left">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="NavBar2-right">
            <Link to="/organizernotifications" className='orgbuttons'>Notifications</Link>
            <Link to="/addevent" className='orgbuttons'>Add Event</Link>
            <Link to="/cancelledevents" className='notifications'>Cancelled Events</Link>
            <Link to="/login" className='orgbuttons'>Log Out</Link>
        </div>
      </div>
  );
}

export default Navbar3;