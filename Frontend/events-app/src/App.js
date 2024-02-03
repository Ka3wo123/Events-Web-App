import Navbar from "./Navbar"
import Home from "./pages/Home"
import About from "./pages/DeleteEvents"
import Login from "./pages/Login"
import UserProfile from "./pages/YourEvents"
import AddEvents from "./pages/AddEvents"
import SignUp from "./pages/SignUp"

import React, { useState, useEffect } from 'react';

import { Route, Routes, useNavigate } from "react-router-dom"
import axios from 'axios';

import './mystyle.css'

function App() {


  const [myLogin, setMyLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);




  useEffect(() => {
    console.log("effect    @@@@@@@@@@@@@@        APP         @@@@@@@@@@@@@@");
    console.log('LOGINn:    ', isLogin);
    const loginJSON = localStorage.getItem('isLogin');
    console.log('localStorage Login: ',loginJSON);

    if(loginJSON=="true"){
      console.log('condtition: ');
          // Check if the userJSON is not null
    if (localStorage.getItem('user') != null) {

      const userJSON = localStorage.getItem('user');
      const userData = JSON.parse(userJSON);
      setMyLogin(userData.email);
    }
      setIsLogin(true);
    }


    console.log('localStorage  IS Login: ',typeof(loginJSON));


  });



  // useEffect(() => {
  //   console.log('PREZD NAPIS: Login:    ', isLogin);
  //   try {
  //     const userJSON = localStorage.getItem('user');
  //     if (userJSON != null) {
  //       console.log('Pamietam email: ', userJSON);
  //       setIsLogin(true);
        
  //       try {
  //         const userData = JSON.parse(userJSON);
  //         console.log('Email: ', userData.email);
  //         setMyLogin(userData.email);
  //       } catch (error) {
  //         console.error('Error parsing user data:', error);
  //       }
  //     } else {
  //       console.log('NIE Pamietam email: ', userJSON);
  //     }
  //   } catch (error) {
  //     console.error('An error occurred:', error);
  //   }



  //   console.log('PO NAPIS: Login:    ', isLogin);
  // });
  

  





  return (
<>
      <div className="container">
        {/* <Navbar myLogin={myLogin} /> */}
        <Navbar myLogin={myLogin} isLogin={isLogin}/>
        <Routes>
          <Route path="/" element={<Home isLogin={isLogin} myLogin={myLogin}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/addEvents" element={<AddEvents />} />
          {/* Correct the prop passing here */}
          <Route path="/login" element={<Login setMyLogin={setMyLogin} setIsLogin={setIsLogin} isLogin={isLogin} />} />
          <Route path="/signUp" element={<SignUp setMyLogin={setMyLogin} setIsLogin={setIsLogin}/>} />
          <Route path="/UserProfile" element={<UserProfile myLogin={myLogin}/>} />
        </Routes>
      </div>

      <footer>
        <p>Events app® | 2024</p>
      </footer>
    </>
  )
}

export default App;




