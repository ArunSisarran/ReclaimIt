import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Homepage from './components/Homepage';
import AddSubmission from './components/AddSubmission';
import Contact from './components/Contact';
import About from './components/About';
import FoundItemsPage from './components/FoundItemsPage';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/submit" element={<AddSubmission />} />
          <Route path="/submit2" element={<FoundItemsPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;