import '../Css/AddEvent_Page.css';
import React, { useState } from 'react';
import axios from 'axios';

function AddEvent_Page() {
  const currentDate = new Date();

  const [values, setValues] = useState({
    eventTitle: '',
    eventDate: '',
    eventTime: '',
    eventCreated: currentDate,
    username: '',
    eventDescription: ''
  });

  const handleInput = (e) => {
    setValues(prev => ({...prev, [e.target.name] : [e.target.value]}))
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    axios.post('http://localhost:8081/addevent', values, {withCredentials: true})
    .then(res => {
      console.log(res);
      setValues({
        eventTitle: '',
        eventDate: '',
        eventTime: '',
        eventDescription: ''
      });
      console.log('Success');
    }).catch(err => console.log(err));
}
  
  return (
      <div className='addbody'>
        <div className='addcard'>
            <div className='addname'>
              <h1>Create an event</h1>
            </div>
            <div className='addlogin'>
              <form onSubmit={handleSubmit}>
                <label>Event Title</label>
                <input
                  type="text"
                  name = 'eventTitle'
                  value={values.eventTitle}
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}
                ></input>

                <label>Date</label>
                <input
                  type="date"
                  name = 'eventDate'
                  value={values.eventDate}
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '2px'}}
                ></input>

                <label>Time</label>
                <input
                  type="time"
                  name = 'eventTime'
                  value={values.eventTime}
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '1px', marginBottom: '10px'}}
                ></input>

                <label>Description</label>
                <input
                  type="text"
                  name = 'eventDescription'
                  value={values.eventDescription}
                  onChange={handleInput}
                  style={{ borderColor: 'rgba(102, 102, 102, 0.35)', borderWidth: '1px', marginBottom: '10px'}}
                ></input>

                <button type='submit' className="addbutton">Create Event</button>
              </form>
            </div>
        </div>
      </div>
  );
}

export default AddEvent_Page;