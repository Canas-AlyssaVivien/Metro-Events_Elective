import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import '../Css/RegularUser_HomePage.css';
import axios from 'axios';

function RegularUser_HomePage() {
  const [events, setEvents] = useState([]);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:8081/events');
        setEvents(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEvents();
  }, []);

  const sendRequestToOrganizer = async () => {
    try {
      await axios.post('http://localhost:8081/requestToOrganizer', {
        username: '',
        status: 0
      }, {
        withCredentials: true 
      });
      console.log("Request sent successfully");
      alert("Request sent successfully");
      setRequestSent(true); 
    } catch (err) {
      console.error(err);
      alert("An error occurred, please try again later.");
    }
  };

  const sendRequestToJoin = async (eventTitle, eventID, organizer) => {
    try {
        await axios.post('http://localhost:8081/requestToJoin', {
            username: '',
            eventTitle: eventTitle,
            status: 0,
            organizer: organizer
        }, {
            withCredentials: true 
        });
        console.log("Request sent successfully");
        alert("Request sent successfully");
        setRequestSent(true);
    } catch (err) {
        console.error(err);
        alert("An error occurred, please try again later.");
    }
};


  return (
    <div className="body3">
      <button className="organizerbutton" onClick={sendRequestToOrganizer} disabled={requestSent}>
        {requestSent ? "Request Sent" : "Send Request to be an Organizer"}
      </button>
      <div className="card3">
        <h4>Events</h4>
        {events.map((event) => (
          <EventCard
            key={event.eventID}
            event={{
              ...event,
              eventID: event.eventID.toString(),
              eventTitle: event.eventTitle.toString(),
              username: event.username.toString(),
            }}
            sendRequestToJoin={sendRequestToJoin}
          />
        ))}
      </div>
    </div>
  );
}

export default RegularUser_HomePage;
