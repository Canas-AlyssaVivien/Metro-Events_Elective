import '../Css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Navbar3 from './Navbar3';
import Landing_Page from './Landing_Page';
import LogIn_Page from './LogIn_Page';
import SignUp_Page from './SignUp_Page';
import RegularUser_HomePage from './RegularUser_HomePage';
import Admin_HomePage from './Admin_HomePage';
import Organizer_HomePage from './Organizer_HomePage';
import AddEvent_Page from './AddEvent_Page';
import OrganizerNotifications_Page from './OrganizerNotifications_Page';

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
          <Route exact path="/organizerhome">
            <Navbar3/>
            <Organizer_HomePage/>
          </Route>
          <Route exact path="/addevent">
            <Navbar3/>
            <AddEvent_Page/>
          </Route>
          <Route exact path="/organizernotifications">
            <Navbar3/>
            <OrganizerNotifications_Page/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
} 

export default App;