import '../Css/EventCard.css';
import React from 'react';

const formatDate = (date) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
  
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const dateTimeFormat = {
    formatDate: (dateString) => {
      const date = new Date(dateString.replace('Z', '+00:00'));
      const options = {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      };
  
      return new Intl.DateTimeFormat('en-US', options).format(date);
    },
  
    formatTime: (timeString) => {
      const time = new Date(`2022-01-01T${timeString.replace('Z', '+00:00')}`);
      const options = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      };
  
      return new Intl.DateTimeFormat('en-US', options).format(time);
    }
  };

const EventCard = ({ event, sendRequestToJoin }) => {
  const handleJoin = (e) => {
    e.preventDefault();
    sendRequestToJoin(event.eventTitle, event.eventID, event.username);
  };

  return (
    <div className="event-card">

      <div className='firstrow'>
        <h3>{event.eventTitle}</h3>
        <p className="date"> {dateTimeFormat.formatDate(event.eventDate)}, {dateTimeFormat.formatTime(event.eventTime)}</p>
      </div>

      <div className='secondrow'>
        <p className="des">
          {event.eventDescription}, {event.username}
        </p>
        <button className='buttoncard' onClick={handleJoin}>
          Join
        </button>
      </div>
    </div>
  );
};

export default EventCard;