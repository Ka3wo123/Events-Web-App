import axios from 'axios';
import { useState } from 'react';


import img2 from '../img/notes3.png';

import '../styleSendForm.css';




export default function EventsAdd() {


  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [date, setDate] = useState('');
  const [maxSites, setMaxSites] = useState('');
  const [time, setTime] = useState('');




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!name || !place || !date || !time || !maxSites) {
      console.error('Please fill in all fields.');
      return;
    }
  
    console.log('Saved DATA -----------------');
    console.log('name:  ', name);
    console.log('date:  ', date);
    console.log('time:  ', time);
    console.log('place:  ', place);
    console.log('MAX:  ', maxSites);
  
    const apiUrl = 'http://localhost:8080/event-app/event/add';
  
    const newEvent = {
      name: name,
      placeOfEvent: place,
      dateOfEvent: date,
      maxSites: maxSites,
      timeOfEvent: time,
    };
  
    try {
      // Make a POST request to add the new event using axios
      const response = await axios.post(apiUrl, newEvent);
      console.log('Response Data:', response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  
    console.log('\n\nTEST--------------------');
    console.log('recznie: ', newEvent.name, '\tTYPE: ', typeof newEvent.name);
    console.log('autom: ', name, '\tTYPE: ', typeof name);
  };
  
  

  // return (
  //   <section className="App">
  //     <h1>Add Events</h1>
  //     <form id="bmiCalculator" style={{ display: 'grid', gap: '10px' }} onSubmit={handleSubmit}>
  //       <label htmlFor="name">Name:</label>
  //       <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

  //       <label htmlFor="place">Place:</label>
  //       <input type="text" id="place" name="place" value={place} onChange={(e) => setPlace(e.target.value)} />

  //       <label htmlFor="date">Date:</label>
  //       <input type="text" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />

  //       <label htmlFor="time">Time:</label>
  //       <input type="text" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />

  //       <label htmlFor="maxSites">MAX Sites:</label>
  //       <input type="text" id="maxSites" name="maxSites" value={maxSites} onChange={(e) => setMaxSites(e.target.value)} />

  //       <button type="submit">ADD</button>
  //     </form>
  //   </section>
  // );


  return (


    <div>
        <section className="App" style={{backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundColor: 'lime', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div style={{backgroundColor: '#000000a3',height: '100vh', width: '100vw', position: 'absolute'}}></div>
        <div id='deletePage' style={{backgroundColor: '#000000a3', padding: '50px', paddingLeft:'200px',paddingRight:'200px', zIndex: 1}}>
            <h1 style={{color: 'white', marginBottom: '70px'}}>Create Event:</h1>
                 <form id="bmiCalculator" style={{ display: 'grid', gap: '10px' }} onSubmit={handleSubmit}>
         <label htmlFor="name">Name:</label>
         <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

         <label htmlFor="place">Place:</label>
         <input type="text" id="place" name="place" value={place} onChange={(e) => setPlace(e.target.value)} />

         <label htmlFor="date">Date:</label>
       <input type="date" id="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />

         <label htmlFor="time">Time:</label>
         <input type="time" id="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />

         <label htmlFor="maxSites">MAX Sites:</label>
         <input type="number" id="maxSites" name="maxSites" value={maxSites} onChange={(e) => setMaxSites(e.target.value)} />

         <button type="submit">ADD</button>
       </form>
        </div>
        </section>

    </div> 
  );





}
