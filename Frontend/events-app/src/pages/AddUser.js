import axios from 'axios';
import { useState } from 'react';


export default function UserAdd() {


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!name || !surname || !email || !password) {
      console.error('Please fill in all fields.');
      return;
    }
  
    console.log('Saved DATA -----------------');
    console.log('name:  ', name);
    console.log('surname:  ', surname);
    console.log('email:  ', email);
    console.log('password:  ', password);
  
    const apiUrl = 'http://localhost:8080/event-app/user';
  
    const newEvent = {
      name: name,
      surname: surname,
      email: email,
      password: password
    };
  
    try {
      // Make a POST request to add the new event using axios
      const response = await axios.post(apiUrl, newEvent);
      console.log('Response Data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }

  };
  
  

  return (
    <section className="App">
      <h1>Add User</h1>
      <form id="bmiCalculator" style={{ display: 'grid', gap: '10px' }} onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="place">Surname:</label>
        <input type="text" id="place" name="place" value={surname} onChange={(e) => setSurname(e.target.value)} />

        <label htmlFor="date">Email:</label>
        <input type="text" id="date" name="date" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="time">Password:</label>
        <input type="text" id="time" name="time" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">ADD</button>
      </form>
    </section>
  );
}
