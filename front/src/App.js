
// import './App.css';
import React from 'react';
import Login from "./components/Login";
import SignUp from "./components/SignUp"
import AdminPanel from './components/AdminPanel';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/navbar';
import EmployeeForm from './components/EmployeeForm';
import EditForm from './components/EditForm';
import Employee from './components/Employee';

function App() {

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<SignUp />} /> 
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path='/navbar' element={<Navbar/>}/>
        <Route path='/employeeform' element={<EmployeeForm/>}/>
        <Route path='/editform/:id' element={<EditForm/>}/>
        <Route path='/employee' element={<Employee/>}/>
      </Routes>
    </div>
    
  </Router>
  );
}

export default App;
