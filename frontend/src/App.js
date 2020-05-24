import React from 'react';
import logo from './assets/logo.svg';
import Routes from './routes';
import './App.css';

function App() {

  return (
    <div className="container">
      <img src={logo} alt="AirCnc"/>
      <div className="content">
          <Routes/>
      </div>
    </div>
  );

}

export default App;