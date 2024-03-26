import '../Css/UserNotifications_Page.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserNotifications_Page() {
  
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
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
                        {/* Add other fields as needed */}
                    </div>
                </div>
            ))}
            </ul>
        </div>
      </div>
  );
}

export default UserNotifications_Page;