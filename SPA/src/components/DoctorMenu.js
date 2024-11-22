// src/components/DoctorMenu.js
import React from 'react';
import { Link } from 'react-router-dom';

function DoctorMenu() {
  return (
    <div>
      <h3>Doctor Menu</h3>
      <ul>
        <li><Link to="/doctor/patient-list">Patient List</Link></li>
        <li><Link to="/doctor/appointments">Appointments</Link></li>
        {/* Add more doctor-specific links as needed */}
      </ul>
    </div>
  );
}

export default DoctorMenu;
