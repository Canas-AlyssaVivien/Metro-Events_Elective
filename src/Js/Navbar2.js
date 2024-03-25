import logo from '../Images/logo.png';
import '../Css/Navbar2.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


function Navbar2() {
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
        <div className="Navbar-center">
            <span className='App-name'>Metro Events</span>
        </div>
        <div className="NavBar2-right">
          <span className='notifications' onClick={handleLogout}>Log Out</span>
        </div>
      </div>
  );
}

export default Navbar2;