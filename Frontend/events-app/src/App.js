import Navbar from "./components/common/Navbar"

import React, { useState, useEffect } from 'react';

import { Outlet, Route, Routes, useNavigate } from "react-router-dom"
import axios from 'axios';


function App() {
  const [myLogin, setMyLogin] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const loginJSON = localStorage.getItem('isLogin');

    if (loginJSON == "true") {
      if (localStorage.getItem('user') != null) {

        const userJSON = localStorage.getItem('user');
        const userData = JSON.parse(userJSON);
        setMyLogin(userData.email);
      }
      setIsLogin(true);
    }    


  });


  return (
    <div>
      <Navbar/>
      <Outlet/>            
      <footer>
        <p>Events app &copy; | 2024</p>
      </footer>
    </div>
  )
}

export default App;




