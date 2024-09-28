import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./EmployeeForm.css";
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const [employeeData, setEmployeeData] = useState({
    f_Id: '',
    f_Image: '',
    f_Name: '',
    f_Email: '',
    f_Mobile: '',
    f_Designation: '',
    f_gender: 'Male',
    f_Course: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('You need to be logged in to access this page');
      navigate('/login'); 
    }
  }, [navigate]);

  // Validate form inputs
  const validate = () => {
    const errors = {};

    if (!employeeData.f_Id) {
      errors.f_Id = 'Employee ID is required';
    }

    if (!employeeData.f_Name) {
      errors.f_Name = 'Name is required';
    }

    if (!employeeData.f_Email) {
      errors.f_Email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(employeeData.f_Email)) {
      errors.f_Email = 'Email address is invalid';
    }

    if (!employeeData.f_Mobile) {
      errors.f_Mobile = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(employeeData.f_Mobile)) {
      errors.f_Mobile = 'Mobile number must be 10 digits';
    }

    if (!employeeData.f_Designation) {
      errors.f_Designation = 'Designation is required';
    }

    if (!employeeData.f_Image) {
      errors.f_Image = 'Employee image is required';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return; 
    }

    try {
      const formData = new FormData();
      Object.keys(employeeData).forEach(key => {
        formData.append(key, employeeData[key]);
      });

      const response = await axios.post('http://localhost:8000/employees', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Employee created:', response.data);
      navigate("/employee"); 
    } catch (error) {
      console.error('There was an error creating the employee!', error);
    }
  };

  return (
    <div className="employee-form-container">
      <h2>Create Employee</h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div>
          <label>Employee ID:</label>
          <input
            type="number"
            name="f_Id"
            value={employeeData.f_Id}
            onChange={handleChange}
            required
          />
          {errors.f_Id && <p className="error">{errors.f_Id}</p>}
        </div>

        <div>
          <label>Upload Image:</label>
          <input
            type="file"
            name="f_Image"
            onChange={(e) => setEmployeeData({ ...employeeData, f_Image: e.target.files[0] })}
            required
          />
          {errors.f_Image && <p className="error">{errors.f_Image}</p>}
        </div>

        <div>
          <label>Name:</label>
          <input
            type="text"
            name="f_Name"
            value={employeeData.f_Name}
            onChange={handleChange}
            required
          />
          {errors.f_Name && <p className="error">{errors.f_Name}</p>}
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="f_Email"
            value={employeeData.f_Email}
            onChange={handleChange}
            required
          />
          {errors.f_Email && <p className="error">{errors.f_Email}</p>}
        </div>

        <div>
          <label>Mobile:</label>
          <input
            type="text"
            name="f_Mobile"
            value={employeeData.f_Mobile}
            onChange={handleChange}
            required
          />
          {errors.f_Mobile && <p className="error">{errors.f_Mobile}</p>}
        </div>

        <div>
          <label>Designation:</label>
          <input
            type="text"
            name="f_Designation"
            value={employeeData.f_Designation}
            onChange={handleChange}
            required
          />
          {errors.f_Designation && <p className="error">{errors.f_Designation}</p>}
        </div>

        <div>
          <label>Gender:</label>
          <select
            name="f_gender"
            value={employeeData.f_gender}
            onChange={handleChange}
            required
          >
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label>Course:</label>
          <input
            type="text"
            name="f_Course"
            value={employeeData.f_Course}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Create Employee</button>
      </form>
    </div>
  );
};

export default EmployeeForm;
