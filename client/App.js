import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import MyStations from './components/MyStations';
const App = () => {
  return (
    <div>
      <React.Fragment>
        <Navbar />
        <Routes />
      </React.Fragment>
    </div>
  );
};

export default App;
