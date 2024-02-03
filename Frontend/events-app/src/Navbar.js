import { Link, useMatch, useResolvedPath } from "react-router-dom"
import React, { useState, useEffect } from 'react';
import axios from 'axios';





function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })
  const { isLogin } = props;

  // If the link is for User Events and isLogin is false, don't show
  if (to === "/UserProfile" && !isLogin) {
    return null;
  }

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}

export default function Navbar({myLogin, isLogin}) {
  return (
    <nav className="nav">
      <p style={{ lineHeight: '50px', color: 'lime' }}>{myLogin}</p>
      <ul style={{ justifyContent: 'flex-end', marginLeft: 'auto' }}>
        <CustomLink className="site-title" to="/" isLogin={isLogin}>HOME</CustomLink>      
        <CustomLink to="/UserProfile" isLogin={isLogin}>User Events</CustomLink>
        <CustomLink to="/login" isLogin={isLogin}>{isLogin ? 'Log out' : 'Log in'}</CustomLink>
      </ul>
    </nav>
  )
}
