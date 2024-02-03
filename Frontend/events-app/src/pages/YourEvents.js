import axios from 'axios';
import { useState, useEffect } from 'react';

import { Link, useMatch, useResolvedPath } from "react-router-dom"


import img1 from '../img/bg.png';
import img2 from '../img/notes.png';
import img3 from '../img/notes3.png';

import e1 from '../img/event1.jpeg';
import e2 from '../img/event2.jpeg';
import e3 from '../img/event3.jpeg';
import e4 from '../img/event4.jpeg';
import e5 from '../img/event5.jpeg';




import '../styleYourEvents.css';



//const SERVER_URL = 'http://localhost:8080/event-app/event/add';

function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props} style={{textDecoration: 'none', fontSize:'30px'}}>
          {children}
        </Link>
      </li>
    )
  }




export default function YourEvents({myLogin}) {


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

  const getRandomImage = () => {
    const images = [e1, e2, e3, e4, e5];
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };


  const [data, setData] = useState([]);

  // const baseUrl = 'http://localhost:8080/event-app/events';


  // const showEvents = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.get(baseUrl);
  //     console.log('Events', response.data);
  //     setData(response.data);
  //   } catch (error) {
  //     if (error.response) {
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       console.log(error.request);
  //     } else {
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);
  //   }
  // };
  

  const baseUrl = 'http://localhost:8080/event-app/events';
  



  const ShowUserEvents = async (e) => {
    e.preventDefault();
    let email='';
    if (localStorage.getItem('user') != null) {

      const userJSON = localStorage.getItem('user');
      const userData = JSON.parse(userJSON);
      email = userData.email;
    }
    console.log('User MAIL:  ', email);

    const url = `${baseUrl}?user-email=${email}`;


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


  useEffect(() => {
    // This code will be executed when the component mounts
    ShowUserEvents({ preventDefault: () => {} }); // Pass a dummy event object
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  

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

  const [isHovered, setIsHovered] = useState(false);

 

  function handleMouseLeave(e){
    e.target.style.color = 'black';
  };

  function changeBackground(e) {
    e.target.style.color = 'red';
  }

  return (
    <div>

          <div id='div2' style={{height: '100vh', backgroundPositionX: 'right', background:'#474747'}}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', backgroundColor:'white', marginLeft:'20vw', marginRight:'20vw', position: 'relative', top:'30vh', padding:'100px', borderRadius:'10%'}}>
                  <div>
                    <h1 style={{fontSize:'40px'}}>Events options</h1>
                    <ul style={{listStyle:'none'}}>
                      <CustomLink to="/addEvents" onMouseOver={changeBackground} onMouseLeave={handleMouseLeave}>Add Events</CustomLink>
                      <CustomLink to="/about" onMouseOver={changeBackground} onMouseLeave={handleMouseLeave}>Delete Event</CustomLink>
                    </ul>
                  </div>

                  <div style={{marginLeft: '100px'}}>
                    <h1 style={{fontSize:'40px'}}>Events you joined</h1>
                    <a href="#inne" style={{textDecoration: 'none', fontSize:'30px'}} onMouseOver={changeBackground} onMouseLeave={handleMouseLeave}>Check</a>
                  </div>

              </div>
          </div>

          <div id='inne' style={gradientStyle}>
              <p style={{ margin: 'auto', fontSize: '100px', padding: '100px' }}>Your joined Events</p>
          </div>

          {data.map((event, index) => (
          <div key={index} className="w3-col l3 m6 w3-margin-bottom" style={{ backgroundColor: 'white' }}>
              <div className="w3-card" style={{ backgroundColor: 'white' }}>
                  <img src={getRandomImage()} alt="John" style={{ width: '100%' }} />
                  <div className="w3-container">
                      <h3 className="event-name">{event.name}</h3>
                      <p style={{ color: 'black' }}>Location:&nbsp;{event.placeOfEvent}</p>
                      <p style={{ color: 'black' }}>Date:&nbsp;{event.dateOfEvent}</p>
                      <p style={{ color: 'black' }}>
                          {event.maxSites !== null ? 'max sites: '+event.maxSites : '(not described)'}
                      </p>
                      <p style={{ color: 'black',marginBottom:'100px' }}>Time: {event.timeOfEvent}</p>
                  </div>
              </div>
          </div>
          ))}

    </div>




  );
  







}
