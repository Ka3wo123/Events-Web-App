import axios from 'axios';
import { useState } from 'react';

import img1 from '../img/bg.png';
import img2 from '../img/notes3.png';



//const SERVER_URL = 'http://localhost:8080/event-app/event/add';

export default function EventsAdd() {


  const [message, setMessage] = useState('');

  const deleteButton = async (e) => {
    e.preventDefault();

    axios.delete('http://localhost:8080/event-app/event/delete?=', {
      params: { name: message },
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
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
    setMessage(event.target.value);
    console.log('Choosed name:', event.target.value);
  };



  const gradientStyle = {
    background: 'linear-gradient(30deg, red, blue)',
    height: '70vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  

  return (


    <div>
      <section className="App" style={{backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundColor: 'lime', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{backgroundColor: '#000000a3',height: '100vh', width: '100vw', position: 'absolute'}}></div>
      <div id='deletePage' style={{backgroundColor: '#000000a3', padding: '100px', zIndex: 1}}>
      <h1 style={{color: 'white', marginBottom: '100px'}}>Delete Event by name:</h1>
      <form id="bmiCalculator" style={{ display: 'grid', gap: '10px' }} onSubmit={deleteButton}>
        <label htmlFor="name" style={{color: 'white'}}>Name:</label>
        <input
        type="text"
        id="message"
        name="message"
        onChange={handleChange}
        value={message}/>
        <button type="submit">DELETE</button>
      </form>
      </div>
    </section>

    </div> 
  );
}
