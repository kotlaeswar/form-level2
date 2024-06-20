import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobApplicationForm from './components/JobApplicationForm';
import Summary from './components/Summary';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<JobApplicationForm />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </Router>
  );
}
