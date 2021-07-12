import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import MyStations from './components/MyStations';
import Loader from './components/Loader';
const App = () => {
  return (
    <div>
      {/* <Loader /> */}
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
