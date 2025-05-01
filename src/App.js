// src/App.js
// src/App.js
//import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import './App.css';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Main landing page */}
          <Route path="/" element={<Home />} />


        </Routes>
      </Router>
    </div>
  );
}

export default App;
