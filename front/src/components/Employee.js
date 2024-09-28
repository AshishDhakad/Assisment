import React, { useState, useEffect } from 'react';
import './Employee.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import Navbar from './navbar.js';

const Employee = () => {
  const [employees, setEmployees] = useState([]); 
  const [searchKeyword, setSearchKeyword] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate();

 
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      alert('You must be logged in to access this page.');
      navigate('/login'); 
    }
  }, [navigate]);

  
  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:8000/employees'); 
      setEmployees(response.data); 
    } catch (error) {
      setError('Error fetching employees'); 
    } finally {
      setLoading(false); 
    }
  };

 
  useEffect(() => {
    fetchEmployees();
  }, []);

  
  const filteredEmployees = employees.filter((employee) =>
    employee.f_Name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  
  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/employees/${id}`);
      setEmployees(employees.filter((emp) => emp._id !== id)); 
    } catch (error) {
      setError('Error deleting employee');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Navbar />
      <div className="employee-container">
        <h2 className="header-title">Employee List</h2>
        <div className="header-row">
          <div className="total-count">
            <strong>Total Count: {employees.length}</strong>
          </div>
          <Link to='/employeeform'>
            <button className="create-employee-button">Create Employee</button>
          </Link>
        </div>

        <div className="search-row">
          <button className="search-button">Search</button>
          <input
            type="text"
            placeholder="Enter Search Keyword"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="employee-list">
          <table className="employee-table">
            <thead>
              <tr>
                <th>Unique Id</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No</th>
                <th>Designation</th>
                <th>Gender</th>
                <th>Course</th>
                <th>Create date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.f_Id}>
                  <td>{employee.f_Id}</td>
                  <td>
                    <img src={employee.f_Image} alt="employee" className="employee-image" />
                  </td>
                  <td>{employee.f_Name}</td>
                  <td>
                    <a href={`mailto:${employee.f_Email}`} className="employee-email">
                      {employee.f_Email}
                    </a>
                  </td>
                  <td>{employee.f_Mobile}</td>
                  <td>{employee.f_Designation}</td>
                  <td>{employee.f_gender}</td>
                  <td>{employee.f_Course}</td>
                  <td>{new Date(employee.f_Createdate).toLocaleDateString()}</td>
                  <td>
                    <Link to={`/editform/${employee._id}`}>
                      <button className="edit-button">Edit</button>
                    </Link>
                    -
                    <button
                      className="delete-button"
                      onClick={() => deleteEmployee(employee._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Employee;
