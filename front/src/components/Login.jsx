// import React, { useState } from 'react';
// import "./SignUp.css"; 
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const [f_userName, setUsername] = useState('');
//   const [f_Pwd, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
  
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     setError('');
//     setSuccess('');

//     try {
//       const response = await fetch('http://localhost:8000/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           f_userName,
//           f_Pwd,
//         }),
//       });

//       const data = await response.json();
//       console.log('Response:', data); 

//       if (response.ok) {
//         setSuccess(data.msg);
        
//         navigate('/admin'); 
//       } else {
//         setError(data.msg);
//       }
//     } catch (err) {
//       console.error('Fetch error:', err);
//       setError('Server error, please try again later.');
//     }
//   };

//   return (
//     <div className='body'>
//       <div className="box">
//         <div className="Signupform">
//           <h2>Login</h2>
//           <form onSubmit={handleSubmit}>
//             <label htmlFor="f_userName">Username</label>
//             <input
//               type="text"
//               id='f_userName '
//               placeholder='Enter username'
//               value={f_userName}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//             <label htmlFor="f_Pwd">Password</label>
//             <input
//               type="password"
//               id='f_Pwd'
//               placeholder='Enter your password'
//               value={f_Pwd}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//             <div className='btnarea'>
//               <button type='submit' id='signinbtn'>Login</button>
//             </div>
//             <p>Create an account <a href='/'>Sign Up</a></p>
//             {error && <p className="error">{error}</p>}
//             {success && <p className="success">{success}</p>}
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;






import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Login.css"; 

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/login', {
        f_userName: username,
        f_Pwd: password,
      });

      if (response.data.msg === 'Login successful') {
        // Store user data in local storage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        alert('Login successful!');
        navigate('/admin'); 
      }
    } catch (error) {
      setError(error.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="body">
      <div className="box">
        <div className="Signupform">
          <h2>Login</h2>
          {error && <p className="error">{error}</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="btnarea">
            <button onClick={handleLogin}>Login</button>
          </div>
          <p>Create an account? <a href='/signup'>SignUp</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;



