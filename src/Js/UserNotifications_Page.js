import '../Css/UserNotifications_Page.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserNotifications_Page() {

  const [notifications, setNotifications] = useState([]);
  const [cancelledevents, setCancelledEvents] = useState([]);
  const [orgNotifs, setOrgNotifs] = useState([]);

  useEffect(() => {
    fetchOrgNotifications();
  }, []);

  const fetchOrgNotifications = () => {
    axios.get('http://localhost:8081/userorgnotifications', { withCredentials: true })
      .then(response => {
        setOrgNotifs(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  };

  const getStatMessage = (status) => {
    return status === 0 ? "Your request to be an organizer has been Disapproved" : "Request to join event is Approved";
  };

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
            {orgNotifs.map(notification => (
            <div key={orgNotifs.requestID}>
              {notification.status === 0 && (
                <div className='reqRow'>
                  <div className='des'>
                    <div className='etitle'>Administrator</div>
                    <div className='status'>Your request to be an organizer has been Dispproved!</div>
                  </div>
                </div>
              )}
            </div>
          ))}
            </ul>
        </div>
      </div>
  );
}

export default UserNotifications_Page;