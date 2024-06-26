import '../Css/Organizer_HomePage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Organizer_HomePage() {
  const [events, setEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [reason, setReason] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios.get('http://localhost:8081/organizerhome', {withCredentials: true})
      .then(response => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  

    axios.get('http://localhost:8081/events')
      .then(response => {
        setAllEvents(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching all events:', error);
      });
  };

  const handleCancel = (eventID, eventTitle, reason) => {
    const data = {eventID, eventTitle, reason};
    axios.post('http://localhost:8081/cancelevent', data, {withCredentials: true})
      .then(response => {
        console.log("Request approved:", response.data);
        fetchRequests();
      })
      .catch(error => {
        console.error('Error approving request:', error);
      });
  };

  return (
      <div className='orgbody'>
        <div className='orgcard'>
          <h4>Events</h4>
          <ul>
            {allEvents.map(event => (
              <div key={event.eventID} className="eventRow">
                <div className='etitle'>{event.eventTitle}</div>
                  <div className='dateandtime'>
                    <div className='edes'>{event.eventDescription}</div>
                    <div className='edate'>{new Date(event.eventDate).toLocaleDateString()}, {event.eventTime.replace(/:[0-9]{2}\.?[0-9]*$/, '')}</div>
                  </div>
              </div>
            ))}
          </ul>
        </div>
        <div className= 'orgcard1'>
          <h4>My Events</h4>
          <ul>
            {events.map(event => (
              <li key={event.eventID} className="eventRow">
                  <div className='etitle'>{event.eventTitle}</div>
                  <div className='dateandtime'>
                    <div className='edes'>{event.eventDescription}</div>
                    <div className='edate'>{new Date(event.eventDate).toLocaleDateString()}, {event.eventTime.replace(/:[0-9]{2}\.?[0-9]*$/, '')}</div>
                  </div>
                  <div className='last'>
                    <input className='reasoninput' placeholder='Why cancel the event?' value={reason} onChange={e => setReason(e.target.value)}/>
                    <button className='ccbutton' onClick={() => handleCancel(event.eventID, event.eventTitle, reason)}>Cancel Event</button>
                  </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default Organizer_HomePage;