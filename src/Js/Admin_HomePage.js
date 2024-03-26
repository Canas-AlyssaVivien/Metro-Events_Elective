import '../Css/Admin_HomePage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin_HomePage() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/admin')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });

      axios.get('http://localhost:8081/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

    return (
        <div className='orgbody'>
          <div className='orgcard'>
            <h4>Users</h4>
            {<ul>
              {users.map(user => (
                <div key={user.userID} className="eventRow">
                  <div className="columnscx">
                    <div className="rowscx">
                      <div className='usern'>{user.username}</div>
                      <div className='emai1'>{user.email}</div>
                    </div>
                    <button className='ccbutton'>Delete User</button>
                  </div>
                </div>
              ))}
              </ul>}
          </div>
          <div className='orgcard1'>
            <h4>Events</h4>
            {<ul>
              {events.map(event => (
                <div key={event.eventID} className="eventRow">
                  <div className="columnscxz">
                    <div className="rowscxz">
                        <div className='usern'>{event.eventTitle}</div>
                        <div className='emai11'>{event.username}</div>
                    </div>
                    <div className="tap">
                      <div className='usern'>{event.eventDescription}</div>
                      <button className='ccbutton'>Delete User</button>
                    </div>
                  </div>
                </div>
              ))}
              </ul>}
          </div>
        </div>
    );
}

export default Admin_HomePage;