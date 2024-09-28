

import React, { useState } from 'react';
import "./SignUp.css";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [id_number, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          f_userName: username,
          f_sno: id_number,
          f_Pwd: password,
        }),
      });

      const data = await response.json();
      console.log('Response:', data); 

      if (response.ok) {
        setSuccess(data.msg);
        navigate('/login');
      } else {
        setError(data.msg);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Server error, please try again later.');
    }
  };

  return (
    <div className='body'>
      <div className="box">
        <div className="Signupform">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id='username'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="id_number">User_ID</label>
            <input
              type="number"
              id='id_number'
              placeholder='Enter your ID number'
              value={id_number}
              onChange={(e) => setId(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id='password'
              placeholder='Create password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className='btnarea'>
              <button type='submit' id='signupbtn'>Sign Up</button>
            </div>
            <p>Already have an account? <a href='/login'>Login</a></p>
            {error && <p className="error">{error}</p>}
            {success && <p className="success">{success}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

