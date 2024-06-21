import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobApplicationForm from './components/JobApplicationForm';
import Summary from './components/Summary';

export default function App() {
  const [formData, setFormData] = useState({});

  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobApplicationForm setFormData={setFormData} />} />
        <Route path="/summary" element={<Summary formData={formData} />} />
      </Routes>
    </Router>
  );
}
