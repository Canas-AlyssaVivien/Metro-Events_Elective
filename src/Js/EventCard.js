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
      try {
          // Ensure that timeString is in a valid format (e.g., "HH:MM:SS")
          const timeParts = timeString.split(':');
          const hours = parseInt(timeParts[0]);
          const minutes = parseInt(timeParts[1]);
          const seconds = parseInt(timeParts[2] || 0);
  
          if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
              throw new Error('Invalid time format');
          }
  
          const time = new Date(2022, 0, 1, hours, minutes, seconds);
          const options = {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true
          };
  
          return new Intl.DateTimeFormat('en-US', options).format(time);
      } catch (error) {
          console.error('Error formatting time:', error);
          return 'Invalid time';
      }
  }
  }  

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