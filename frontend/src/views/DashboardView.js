import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardForm from '../components/DashboardForm';

function DashboardView() {
    return (
        <div className="dashboard-view"><DashboardForm/></div>
    );
}

export default DashboardView; 