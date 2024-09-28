

import React from 'react';
import './AdminPanel.css';
import Navbar from './navbar';
const AdminPanel = () => {
  return (
    <><Navbar/>
    <div className="admin-panel">
      
      <main>
          <h1>Welcome to the Admin Panel</h1> 
          <p>Here you can manage your dashboard, view reports, and adjust settings.</p>
      </main>
    </div>
    </>
  );
};

export default AdminPanel;

