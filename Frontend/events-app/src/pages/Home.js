import React, { useState, useEffect } from 'react';
import axios from 'axios';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceRelieved } from '@fortawesome/free-solid-svg-icons'




import img1 from '../img/bg.png';
import e1 from '../img/event1.jpeg';
import e2 from '../img/event2.jpeg';
import e3 from '../img/event3.jpeg';
import e4 from '../img/event4.jpeg';
import e5 from '../img/event5.jpeg';

import '../styleHome.css';
import '../style.css';
import '../styles.css';

export default function Home({isLogin, myLogin}) {
  const [data, setData] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const [buttonColors, setButtonColors] = useState({}); // Use an object to store button colors
  const [eventImages, setEventImages] = useState([]); // Use an array to store random image URLs for each event

  const baseUrl = 'http://localhost:8080/event-app/events';


function UserEvents(){
  const email = myLogin;
  const baseUrl = 'http://localhost:8080/event-app/events';
  const url = `${baseUrl}?user-email=${email}`;


    axios
    .get(url)
    .then(response => {
      console.log('Events', response.data);
      setUserEvents(response.data);
      console.log('111111111 ', userEvents);
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

  const showEvents = async (e) => {
    e.preventDefault();
    const userEventsData = await UserEvents();
  
    try {
      const response = await axios.get(baseUrl);
      console.log('Events', response.data);
  
      // Tworzenie listy nazw wydarzeń
      const eventNames = response.data.map(event => event.name);
      console.log('Event Names', eventNames);
  
      setData(response.data);



      // Initialize button colors and random image URLs for each event
      const initialButtonColors = {};
      const initialEventImages = response.data.map(() => getRandomImage());
      response.data.forEach((event, index) => {
        initialButtonColors[index] = 'gray';
      });
      setButtonColors(initialButtonColors);
      setEventImages(initialEventImages);

    } catch (error) {
      // ... (error handling code)
    }
  };



  useEffect(() => {
    console.log('DO Effect')
    // This code will be executed when the component mounts
    showEvents({ preventDefault: () => {} }); // Pass a dummy event object
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts



  const getRandomImage = () => {
    const images = [e1, e2, e3, e4, e5];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };



  function RemoveEvenetForUser (name) {

    const email = myLogin;
  
    console.log('Saved DATA -----------------');
    console.log('name:  ', name);
    console.log('email:  ', email);

    const baseUrl = 'http://localhost:8080/event-app/user/';
    const url = `${baseUrl}delete-event?email=${email}&name=${name}`;

    axios.delete(url, /* other data or configuration */)
      .then(response => {
        console.log('Success delete event for user: ',response.data);
      })
      .catch(error => {
        console.error('Error:',error);
      });


  }



  function AddEventToUser (name) {

    const email = myLogin;
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







  const handleJoinButtonClick = (eventId, eventName) => {
    console.log('Button ID: ', eventId);

    if (!isLogin) {
      alert('Login before to join event!');
      return; 
    }

    const eventNames = userEvents.map((event) => (event.name));
    console.log('999999999994444444 ', userEvents);
    console.log('99999999999@@@@@@@: ', eventNames);
    // ----------------------------------If not loggin STOP here, and show Alert

    setButtonColors((prevColors) => {
      const currentColor = prevColors[eventId];
      const newColor = currentColor === 'green' ? 'gray' : 'green';

      if (newColor === 'green') {
        AddEventToUser(eventName);
      } 
      else {
        RemoveEvenetForUser(eventName);
      }

      return {
        ...prevColors,
        [eventId]: newColor,
      };
    });
  };




  return (
    <>
      {/* Add the new JSX code here */}
      <header className="bgimg-1" id="home" style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundColor: 'lime', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', padding: '48px', background: '#000000c2' }}>
          <span className="w3-jumbo w3-hide-small" style={{ color: 'white' }}>Find events which are next to YOU ...</span><br />
          <span className="w3-large" style={{ color: 'white' }}>Join and follow interesting you</span>
          <p><a href="#evenList_screen" className="w3-button w3-white w3-padding-large w3-large w3-margin-top w3-opacity w3-hover-opacity-off" style={{ color: 'red' }}>Show events</a></p>
        
        </div>
      </header>



      <div id="evenList_screen" style={{ backgroundColor: 'white', zIndex: 1, minHeight: '100vh' }}>
        <h3>EVENTS</h3>
        <p>The ones who run this company</p>
 

        {data.map((event, index) => (
          <div key={index} className="w3-col l3 m6 w3-margin-bottom" style={{ backgroundColor: 'white' }}>
            <div className="w3-card" style={{ backgroundColor: 'white' }}>
              <img src={eventImages[index]} alt="John" style={{ width: '100%' }} />
              <div className="w3-container">
                <h3 className="event-name">{event.name}</h3>
                <p className="event-name" style={{ color: 'black' }}>
                  {event.placeOfEvent}
                </p>
                <p style={{ color: 'black' }}>{event.dateOfEvent}</p>

                <button
                  style={{
                    backgroundColor: buttonColors[index],
                    width: '200px',
                    padding: '10px',
                    borderRadius: '5px',
                    cursor: 'pointer', // Set cursor to pointer on hover
                  }}
                  onClick={() => handleJoinButtonClick(index, event.name)}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}