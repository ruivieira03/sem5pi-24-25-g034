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

        <li><Link to="/api/OperationRequest">All Operation Requests</Link></li>
        <li><Link to="/api/OperationRequest/5">Operation Request by ID</Link></li>
        <li><Link to="/api/OperationRequest/patient/5">Operation Request by Patient</Link></li>
        <li><Link to="/api/OperationRequest/type/5">Operation Request by Type</Link></li>
        <li><Link to="/api/OperationRequest/priority/5">Operation Request by Priority</Link></li>
        {/* Add more doctor-specific links as needed */}
      </ul>
    </div>
  );
}

export default DoctorMenu;
