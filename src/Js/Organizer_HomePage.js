import '../Css/Organizer_HomePage.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Organizer_HomePage() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/organizerhome')
      .then(response => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  }, []);

  return (
      <div className='orgbody'>
        <div className='orgcard'>
          <h4>Events</h4>
          <ul>
            {events.map(event => (
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
        <div className='orgcard1'>
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
                    <input className='reasoninput' placeholder='Why cancel the event?' />
                    <button className='ccbutton'>Cancel Event</button>
                  </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
  );
}

export default Organizer_HomePage;