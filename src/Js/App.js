import '../Css/App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';
import Navbar3 from './Navbar3';
import Navbar4 from './Navbar4';
import Landing_Page from './Landing_Page';
import LogIn_Page from './LogIn_Page';
import SignUp_Page from './SignUp_Page';
import RegularUser_HomePage from './RegularUser_HomePage';
import Admin_HomePage from './Admin_HomePage';
import Organizer_HomePage from './Organizer_HomePage';
import AddEvent_Page from './AddEvent_Page';
import OrganizerNotifications_Page from './OrganizerNotifications_Page';
import UserNotifications_Page from './UserNotifications_Page';
import AdminNotifications_Page from './AdminNotifications_Page';
import OrganizerCancelledEvents_Page from './OrganizerCancelledEvents_Page';
import Admin_Login from './Admin_Login';

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
          <Route exact path="/admin"> 
            <Navbar4/>
            <Admin_HomePage/>
          </Route>
          <Route exact path="/adminnotifications"> 
            <Navbar4/>
            <AdminNotifications_Page/>
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
          <Route exact path="/cancelledevents">
            <Navbar3/>
            <OrganizerCancelledEvents_Page/>
          </Route>
          <Route exact path="/usernotifications">
            <Navbar2/>
            <UserNotifications_Page/>
          </Route>
          <Route exact path="/adminlogin">
            <Admin_Login/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
} 

export default App;