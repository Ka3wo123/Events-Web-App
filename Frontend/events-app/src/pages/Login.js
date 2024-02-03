import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link, useMatch, useResolvedPath, useNavigate } from "react-router-dom"


//const SERVER_URL = 'http://localhost:8080/event-app/event/add';

export default function Login({ setMyLogin, setIsLogin, isLogin }) {

  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState()


  const navigate = useNavigate();



  function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }


  // useEffect(() => {
  //   setIsLogin(false);
    
  // });


  // useEffect(() => {
  //   localStorage.setItem('isLogin', JSON.stringify(false));
  //   setIsLogin(false);
  //   setMyLogin(''); // Set MyLogin to an empty string
  //   setUser({}); // Initialize the user state with an empty object
  //   console.log("effect    @@@@@@@@@@@@@@");
  // }, [setIsLogin, setMyLogin]);

  useEffect(() => {
    setIsLogin(false);
    localStorage.setItem('isLogin', JSON.stringify(false));
    setMyLogin(''); // Set MyLogin to an empty string
    setUser({}); // Initialize the user state with an empty object
    console.log("effect    @@@@@@@@@@@@@@");
  }, [setIsLogin, setMyLogin]);


  const handleSubmit = async (e) => {
    e.preventDefault();
  
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
          console.log('isLogin:  @:  ', isLogin);
          console.log('isLogin:JSON  @:  ', JSON.stringify(isLogin));
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







  const handleChange = event => {
    console.log('Choosed name:', event.target.value);
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
      <h1 style={{color: 'white'}}>Login:</h1>
      <form id="bmiCalculator" style={{ display: 'grid', gap: '10px' }} onSubmit={handleSubmit}>
        
        <label htmlFor="date">Email:</label>
        <input type="text" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Login</button>
        <CustomLink to='/signUp' style={{color:'lime'}}>Sign up</CustomLink>
      </form>
    </section>
    </div>
  );
}
