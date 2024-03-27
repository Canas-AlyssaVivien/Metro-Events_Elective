import '../Css/OrganizerCancelledEvents_Page.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrganizerCancelledEvents_Page() {
  const [events, setEvents] = useState([]);
  
    useEffect(() => {
        fetchRequests();
    }, []);

  const fetchRequests = () => {
    axios.get('http://localhost:8081/cancelledevents', {withCredentials: true})
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  return (
      <div className='reqbody'>
        <div className='reqcard'>
          <h4>Your Cancelled Events</h4>
            <ul>
            {events.map(event => (
                <div key={event.requestID} className="reqRow">
                    <div className='des'>
                        <div className='etitle'>{event.eventTitle}</div>
                        <div className='euse'>{event.reason}</div>
                    </div>
                </div>
            ))}
            </ul>   
        </div>
      </div>
  );
}

export default OrganizerCancelledEvents_Page;