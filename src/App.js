import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';


import Home from './Home';
import Fisk from './Components/Pages/Fisk';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fisk" element={<Fisk />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;