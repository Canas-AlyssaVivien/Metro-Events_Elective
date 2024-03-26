import '../Css/Admin_HomePage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin_HomePage() {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
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
  };

  const deleteUser = (username) => {
    axios.post('http://localhost:8081/deleteUser', { username })
      .then(response => {
          console.log("User deleted:", response.data);
          fetchRequests();
      })
      .catch(error => {
          console.error('Error approving user:', error);
      });
  };

  const deleteEvent = (eventID) => {
    axios.post('http://localhost:8081/deleteEvent', { eventID })
      .then(response => {
        console.log("Event deleted:", response.data);
        fetchRequests();
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  }

    return (
        <div className='orgbody'>
          <div className='orgcard'>
            <h4>Users</h4>
            {<ul>
              {users.map(user => (
                <div key={user.userID} className="eventRow">
                  <div className="columnscx">
                    <div className="rowscx">
                      <div className='one'>{user.username}</div>
                      <div className='two'>{user.email}</div>
                    </div>
                    <button className='ccbutton' onClick={() => deleteUser(user.username)}>Delete User</button>
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
                        <div className='one'>{event.eventTitle}</div>
                        <div className='two'>{event.username}</div>
                    </div>
                    <div className="tap">
                      <div className='two'>{event.eventDescription}</div>
                      <button className='ccbutton' onClick={() => deleteEvent(event.eventID)}>Delete Event</button>
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