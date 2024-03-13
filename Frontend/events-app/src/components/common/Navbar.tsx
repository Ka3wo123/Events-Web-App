import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from 'axios';


export default function Navbar() {
  return (
    <div className="navbar">                  
      <div>        
          <Link to="login">
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "#000", borderColor: "#BC25BF", color: "#BC25BF", marginRight: "50px" }}
              >
              LOGOUT
            </button>
          </Link>    
          <Link to="home">
            <button
              type="button"
              className="btn btn-primary"
              style={{ backgroundColor: "#000", borderColor: "#BC25BF", color: "#BC25BF", marginRight: "50px" }}
              >
              Home
            </button>
          </Link>     
      </div>

    </div>
  );
};

