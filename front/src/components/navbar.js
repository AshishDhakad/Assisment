import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    const checkLoginStatus = () => {
      const storedUser = localStorage.getItem('user'); 

      if (storedUser) {
        const user = JSON.parse(storedUser); 
        setIsLoggedIn(true);
        setUsername(user.f_userName); 
      } else {
        setIsLoggedIn(false);
      }
    };

    checkLoginStatus();
  }, []);

  
  const handleLogout = async () => {
    try {
      
      await axios.post('http://localhost:8000/logout', {}, { withCredentials: true });
      
      
      localStorage.removeItem('user');
   
      setIsLoggedIn(false);
      setUsername('');
      
     
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <a href="/admin">Home</a>
        <a href="/employee">Employee List</a>
      </div>
      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <span>{username}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <a href="/">Signup</a>
            <a href="/login">Login</a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
