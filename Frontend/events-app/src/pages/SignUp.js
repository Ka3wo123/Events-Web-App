import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"


//const SERVER_URL = 'http://localhost:8080/event-app/event/add';

export default function SignUp({setMyLogin, setIsLogin}) {

  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [user, setUser] = useState();


  const navigate = useNavigate();



  function SignUpForm() {
  
    // Validate form fields
    if (!password || !email) {
      console.error('Please fill in all fields.');
      return;
    }
  
    console.log('Saved DATA -----------------');
    console.log('password:  ', password);
    console.log('email:  ', email);

    const baseUrl = 'http://localhost:8080/event-app/user/';
    const userData = { email, password }; // Renamed to userData


    const url = `${baseUrl}validate?email=${email}&password=${password}`;

    axios.get(url, /* other data or configuration */)
      .then(response => {

        console.log('Get data correctly');
        if(response.data===true){
          console.log('Success Login');
      
          setUser(userData); // Update the user state with userData
          console.log('Save data: ', userData);
          localStorage.setItem('user', JSON.stringify(userData)); // Store userData in localStorage
          setIsLogin(true);
          localStorage.setItem('isLogin', JSON.stringify(true)); // Store userData in localStorage
          setMyLogin(email); // Show the logged-in email
          console.log('-------------', userData); 
          
          navigate('/'); // Go to the main page                    // [rzejdź do strony głownej]
        }
        else{
          alert('Inwalid password or email');
          console.log('Inwalid password or email');
        }
      })
      .catch(error => {
        // Handle error
        console.error('Error:',error);
      });

  }




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form fields
    if (!name || !surname || !email || !password) {
      console.error('Please fill all fields');
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
      SignUpForm();
    } catch (error) {
      console.error('Error:', error);
    }

  };


  const gradientStyle = {
    background: 'linear-gradient(30deg, red, blue)',
    height: '100vh',
    display: 'flex',
    // alignItems: '500px',
    paddingTop: '20vh',
    justifyContent: 'center',
  };
  

  return (
    <div style={gradientStyle}>
      <section style={{backgroundColor:'black', borderRadius: '30%', paddingLeft:'100px', paddingRight:'100px', paddingBottom:'0', marginBottom:'0'}}>
      <h1 style={{color: 'white'}}>Sign Up</h1>
      <form id="bmiCalculator" style={{ display: 'grid', gap: '10px' }} onSubmit={handleSubmit}>

      <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="place">Surname:</label>
        <input type="text" id="place" name="place" value={surname} onChange={(e) => setSurname(e.target.value)} />

        <label htmlFor="date">Email:</label>
        <input type="text" id="date" name="date" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="time">Password:</label>
        <input type="password" id="time" name="time" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
      </form>
    </section>
    </div>
  );
}
