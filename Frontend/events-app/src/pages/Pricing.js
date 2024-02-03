import axios from 'axios';
import { useState, useEffect } from 'react';



export default function EventsShow() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    // Fetch events when the component mounts
    fetchEvents();
  }, []);
  
  const fetchEvents = () => {
    axios.get('http://localhost:8080/event-app/events')
    .then(response => {
      console.log('Events', response.data);
      setData(response.data);
    }).catch(err => {
      console.log(err);
    });
  }
  return (
    <div className="App">
      <h1>List of Events</h1>
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



// function App() { 
//   const [data, setData] = useState([]);
  
//   useEffect(() => {
//     // Fetch events when the component mounts
//     fetchEvents();
//   }, []);
  
//   const fetchEvents = () => {
//     axios.get('http://localhost:8080/event-app/events')
//     .then(response => {
//       console.log('Events', response.data);
//       setData(response.data);
//     }).catch(err => {
//       console.log(err);
//     });
//   }
//   return (
//     <div className="App">
//       <h1>List of Events</h1>
//       <ul>
//         {data.map(event => (
//           <li key={event.id}>
//             {event.name} - {event.dateOfEvent}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;
