import logo from '../Images/logo.png';
import '../Css/Navbar4.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function Navbar4() {
  const history = useHistory();

  const handleLogout = () => {
    axios.get('http://localhost:8081/logout')
      .then(res => {
        if (res.data.Status === "Success") {
          history.push('/login');
        } else {
          alert("error");
        }
      }).catch(err => {
        console.log(err);
      });
  }

  return (
      <div className="NavBar2">
        <div className="NavBar2-left">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="NavBar2-right">
          <Link to="/admin" className='notifications'>Home</Link>
          <Link to="/adminnotifications" className='notifications'>Notifications</Link>
          <span className='notifications' onClick={handleLogout}>Log Out</span>
        </div>
      </div>
  );
}

export default Navbar4;