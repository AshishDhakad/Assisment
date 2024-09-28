import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditForm.css';

const EditForm = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: '',
    f_Course: '',
  });

  useEffect(() => {
    
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/employees/${id}`);
        setFormState(response.data);
      } catch (error) {
        console.error('Error fetching employee details', error);
      }
    };

    fetchEmployee();
  }, [id]);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/employees/${id}`, formState);
      navigate('/employee'); 
    } catch (error) {
      console.error('Error updating employee', error);
    }
  };

  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="employee-form-container">
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="f_Name"
          value={formState.f_Name}
          onChange={handleInputChange}
        />
        
        <label>Email:</label>
        <input
          type="email"
          name="f_Email"
          value={formState.f_Email}
          onChange={handleInputChange}
        />
        
        <label>Mobile:</label>
        <input
          type="text"
          name="f_Mobile"
          value={formState.f_Mobile}
          onChange={handleInputChange}
        />
        
        <label>Designation:</label>
        <input
          type="text"
          name="f_Designation"
          value={formState.f_Designation}
          onChange={handleInputChange}
        />
        
        <div className="gender-group">
          <label>Gender:</label>
          <label>
            <input
              type="radio"
              name="f_gender"
              value="Male"
              checked={formState.f_gender === 'Male'}
              onChange={handleInputChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="f_gender"
              value="Female"
              checked={formState.f_gender === 'Female'}
              onChange={handleInputChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="f_gender"
              value="Other"
              checked={formState.f_gender === 'Other'}
              onChange={handleInputChange}
            />
            Other
          </label>
        </div>
        
        <label>Course:</label>
        <input
          type="text"
          name="f_Course"
          value={formState.f_Course}
          onChange={handleInputChange}
        />
        
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};

export default EditForm;
