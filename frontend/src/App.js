import React, { useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import DashboardView from './views/DashboardView';
import HomeView from './views/HomeView';
import AboutUsView from './views/AboutUsView';
import NavBar from './components/NavBar';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="App">
      <div style={{display: 'flex', justifyContent: 'center', marginBottom: '20px'}}>
        <NavBar
        onCoursePredictionClick={() => setCurrentView('dashboard')}
        onAboutUsClick={() => setCurrentView('about')}
        onHomeClick={() => setCurrentView('home')}
      />
      </div>
      
      {currentView === 'dashboard' && <DashboardView/>}
      {currentView === 'about' && <AboutUsView/>}
      {currentView === 'home' && (
        <HomeView onDashboardClick={() => setCurrentView('dashboard')} />
      )}
    </div>
  );
}

export default App;