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
      <h3>{event.eventTitle}</h3>
      <div className="event-details">
        <div className="details-row">
          <p className="event-detail">
            <strong>Description:</strong> {event.eventDescription}
          </p>
          <p className="event-detail">
            <strong>Event Date:</strong> {dateTimeFormat.formatDate(event.eventDate)}
          </p>
          <p className="event-detail">
            <strong>Event Time:</strong> {dateTimeFormat.formatTime(event.eventTime)}
          </p>
          <p className="event-detail">
            <strong>Event Created:</strong> {formatDate(event.eventCreated)}
          </p>
          <p className="event-detail">
            <strong>Event Organizer:</strong> {event.username}
          </p>
          <button className='buttoncard' onClick={handleJoin}>
            Join
          </button>
        </div>
      </div>
      <hr className="divider"/>
    </div>
  );
};

export default EventCard;