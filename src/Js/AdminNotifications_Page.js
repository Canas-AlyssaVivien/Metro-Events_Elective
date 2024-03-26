import '../Css/AdminNotifications_Page.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AdminNotifications_Page() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = () => {
    axios.get('http://localhost:8081/adminnotifications')
      .then(response => {
        setRequests(response.data);
      })
      .catch(error => {
        console.error('Error fetching events:', error);
      });
  };

  const handleApprove = (username) => {
    axios.post('http://localhost:8081/approveUser', { username })
        .then(response => {
            console.log("User approved:", response.data);
            fetchRequests();
        })
        .catch(error => {
            console.error('Error approving user:', error);
        });
};

  return (
      <div className='reqbody'>
        <div className='reqcard'>
          <h4>Organizer Requests</h4>
            <ul>
            {requests.map(request => (
                <div key={request.requestID} className="reqRoww">
                    <div className='des'>
                        <div className='etitle'>{request.username}</div>
                    </div>
                    <div className='nbuttons'>
                        <button className='approve' onClick={() => handleApprove(request.username)} >Approve</button>
                        <button className='decline'>Decline</button>
                    </div>
                </div>
            ))}
            </ul>   
        </div>
      </div>
  );
}

export default AdminNotifications_Page;