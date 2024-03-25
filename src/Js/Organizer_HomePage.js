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
              <div className='dateandtime'>
                <div className='etitle'>{event.eventTitle}</div>
                <div className='edate'>{new Date(event.eventDate).toLocaleDateString()}, {event.eventTime.replace(/:[0-9]{2}\.?[0-9]*$/, '')}</div>
              </div>
              <div className='edes'>{event.eventDescription}</div>
            </div>
          ))}
          </ul>
        </div>
        <div className='orgcard1'>
          <h4>My Events</h4>  
        </div>
      </div>
  );
}

export default Organizer_HomePage;