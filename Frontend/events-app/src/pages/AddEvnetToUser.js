import axios from 'axios';
import { useState } from 'react';

//const SERVER_URL = 'http://localhost:8080/event-app/event/add';

export default function AddEventToUser() {



  const [name, setName] = useState('');
  const [email, setEmail] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!name || !email) {
      console.error('Please fill in all fields.');
      return;
    }
  
    console.log('Saved DATA -----------------');
    console.log('name:  ', name);
    console.log('email:  ', email);

    const baseUrl = 'http://localhost:8080/event-app/user/add-event';
    const url = `${baseUrl}?email=${email}&name=${name}`;

    axios.post(url, /* other data or configuration */)
      .then(response => {
        console.log('Success save Data: ',response.data);
      })
      .catch(error => {
        console.error('Error:',error);
      });


  }







  const deleteButton = async (e) => {
    e.preventDefault();

    axios.delete('http://localhost:8080/event-app/user/add-event?=&=', {
      params: { email: email },
      params: { name: name }
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
    console.log('Choosed name:', event.target.value);
  };


  

  return (
    <section className="App">
      <h1>Delete Event by name:</h1>
      <form id="bmiCalculator" style={{ display: 'grid', gap: '10px' }} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="date">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <button type="submit">ADD</button>
      </form>
    </section>
  );
}
