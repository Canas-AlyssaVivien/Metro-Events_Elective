import '../Css/OrganizerNotifications_Page.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function OrganizerNotifications_Page() {
  const [requests, setRequests] = useState([]);

    const [values, setValues] = useState({
        username: 'alyssavivien'
    });

    useEffect(() => {
        console.log("Updated values:", values);
      }, [values]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios.get('http://localhost:8081/organizernotifications', {withCredentials: true})
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  const approve = (requestID, eventTitle) => {
    const data = { ...values, requestID, eventTitle };
    axios.post('http://localhost:8081/insertparticipant', data)
      .then(response => {
        console.log("Request approved:", response.data);
        fetchRequests();
      })
      .catch(error => {
        console.error('Error approving request:', error);
      });
  };
  
  const decline = (requestID, eventTitle) => {
    const data = { ...values, requestID, eventTitle };
    axios.post('http://localhost:8081/deleterequest', data)
      .then(response => {
        console.log("Request declined:", response.data);
        fetchRequests();
      })
      .catch(error => {
        console.error('Error declining request:', error);
      });
  };

  return (
      <div className='reqbody'>
        <div className='reqcard'>
          <h4>Requests</h4>
            <ul>
            {requests.map(request => (
                <div key={request.requestID} className="reqRow">
                    <div className='des'>
                        <div className='etitle'>{request.eventTitle}</div>
                        <div className='euse'>{request.username}</div>
                    </div>
                    <div className='nbuttons'>
                        <button className='approve' onClick={() => approve(request.requestID, request.eventTitle)}>Approve</button>
                        <button className='decline' onClick={() => decline(request.requestID, request.eventTitle)}>Decline</button>
                    </div>
                </div>
            ))}
            </ul>   
        </div>
      </div>
  );
}

export default OrganizerNotifications_Page;