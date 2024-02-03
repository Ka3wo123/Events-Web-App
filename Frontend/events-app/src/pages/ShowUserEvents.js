import axios from 'axios';
import { useState } from 'react';

//const SERVER_URL = 'http://localhost:8080/event-app/event/add';

export default function ShowUevents() {


  const [email, setEmail] = useState('');
  const [data, setData] = useState([]);

  const baseUrl = 'http://localhost:8080/event-app/events';
  const url = `${baseUrl}?user-email=${email}`;


  const deleteButton = async (e) => {
    e.preventDefault();
    axios.get(url)

    .then(response => {
      console.log('Events', response.data);
      setData(response.data);
    }).catch(error => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

  };



  const handleChange = event => {
    setEmail(event.target.value);
    console.log('Choosed name:', event.target.value);
  };



  return (
    <div className="App">
      <h1>List of Events for User</h1>
      <form id="bmiCalculator" style={{ display: 'grid', gap: '10px' }} onSubmit={deleteButton}>
        <label htmlFor="name">User with email:</label>
        <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={email}
      />
        <button type="submit">Show</button>
      </form>
      <ul>
        {data.map(event => (
          <li key={event.id}>
            {event.name} - {event.dateOfEvent}
          </li>
        ))}
      </ul>
      
    </div>
  );




}




const DoSomething = function(email) {

    const [data, setData] = useState([]);

    const baseUrl = 'http://localhost:8080/event-app/events';
    const url = `${baseUrl}?user-email=${email}`;


    axios.get(url)

    .then(response => {
      console.log('Events for User',email,'\n', response.data);
      setData(response.data);
      return data;
    }).catch(error => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        console.log(error.request);
      } else {
        console.log('Error', error.message);
      }
      console.log(error.config);
    });

}
