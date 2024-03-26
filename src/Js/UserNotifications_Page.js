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

  /*const [requests, setRequests] = useState([]);

    const [values, setValues] = useState({
        eventTitle: '',
        username: 'alyssavivien'
    });

    const handleSelectRequest = (request) => {
        console.log("Event TITE: " + request.eventTitle);
        setValues({ ...values, eventTitle: request.eventTitle });
    };

    useEffect(() => {
        console.log("Updated values:", values);
      }, [values]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios.get('http://localhost:8081/organizernotifications')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  const approve = (requestID) => {
    const data = { ...values, requestID };
    axios.post('http://localhost:8081/insertparticipant', data)
      .then(response => {
        console.log("Request approved:", response.data);
        fetchRequests();
      })
      .catch(error => {
        console.error('Error approving request:', error);
      });
  };
  
  const decline = (requestID) => {
    axios.delete('http://localhost:8081/deleterequest', { data: { requestID } })
      .then(response => {
        console.log("Request declined:", response.data);
        fetchRequests();
      })
      .catch(error => {
        console.error('Error declining request:', error);
      });
  };*/

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
            {/*<ul>
            {requests.map(request => (
                <div key={request.requestID} className="reqRow" onClick={() => handleSelectRequest(request)}>
                    <div className='des'>
                        <div className='etitle'>{request.eventTitle}</div>
                        <div className='euse'>{request.username}</div>
                    </div>
                    <div className='nbuttons'>
                        <button className='approve' onClick={() => approve(request.requestID)}>Approve</button>
                        <button className='decline' onClick={() => decline(request.requestID)}>Decline</button>
                    </div>
                </div>
            ))}
            </ul> */}  
        </div>
      </div>
  );
}

export default UserNotifications_Page;