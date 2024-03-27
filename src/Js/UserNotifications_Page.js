import '../Css/UserNotifications_Page.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserNotifications_Page() {

  const [notifications, setNotifications] = useState([]);
  const [cancelledevents, setCancelledEvents] = useState([]);

  useEffect(() => {
    fetchNotifications();
    fetchCancelledEvents();
  }, []);

  const fetchNotifications = () => {
    axios.get('http://localhost:8081/usernotifications', {withCredentials: true})
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  const getStatusMessage = (status) => {
    return status === 0 ? "Request to join event is Disapproved" : "Request to join event is Approved";
  };

  const fetchCancelledEvents = () => {
    axios.get('http://localhost:8081/cancelledeventnotif', {withCredentials: true})
      .then(response => {
        setCancelledEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  return (
      <div className='reqbody'>
        <div className='reqcard'>
          <h4>Notifications</h4>
            <ul>
              {notifications.map(notification => (
                <div key={notification.notificationID} className="reqRow">
                    <div className='des'>
                        <div className='etitle'>{notification.eventTitle}</div>
                        <div className='status'>{getStatusMessage(notification.status)}</div>
                    </div>
                </div>
            ))}
            </ul>
        </div>
        <div className='reqcard'>
          <h4>Cancelled Events</h4>
            <ul>
              {cancelledevents.map(cancelledevent => (
                <div key={cancelledevent.notificationID} className="reqRow">
                    <div className='des'>
                        <div className='etitle'>{cancelledevent.eventTitle} is cancelled</div>
                        <div className='status'>Reason: {(cancelledevent.reason)}</div>
                    </div>
                </div>
            ))}
            </ul>
        </div>
      </div>
  );
}

export default UserNotifications_Page;