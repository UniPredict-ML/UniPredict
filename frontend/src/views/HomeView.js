import React, { useState } from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function HomeView({ onDashboardClick }) {
    return (
        <div className="home-view">
            <div>
                <img className="fade-in-up" 
                width='500px' 
                src='/assets/students.png' 
                alt='university-students'
                style={{ marginTop: '70px' }}
                loading="lazy"
                 />
            </div>
            <div
                style={{
                    backgroundColor: '#d20f39',
                    maxWidth: '500px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100px',
                    margin: '0 auto',
                    borderRadius: '5px'
                }}
            >
                  <button onClick={onDashboardClick}>Let's find out</button>
            </div>
        </div>


    );
} 

export default HomeView; 