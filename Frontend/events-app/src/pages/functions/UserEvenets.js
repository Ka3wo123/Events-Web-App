import { useState } from 'react';
import axios from 'axios';

export default function DoSomething (email) {
  const [data, setData] = useState([]);

  const baseUrl = 'http://localhost:8080/event-app/events';
  const url = `${baseUrl}?user-email=${email}`;

  axios
    .get(url)
    .then((response) => {
      console.log('Events for User', email, '\n', response.data);
      setData(response.data);

    })
    .catch((error) => {
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

