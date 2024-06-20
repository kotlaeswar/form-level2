import React from 'react';
import { useLocation } from 'react-router-dom';
import './Summary.css';

export default function Summary() {
  const location = useLocation();
  const formData = location.state?.formData;

  if (!formData) {
    return <div className="summary">No data available.</div>;
  }

  return (
    <div className="summary">
      <h2>Application Summary</h2>
      <p><strong>Full Name:</strong> {formData.fullName}</p>
      <p><strong>Email:</strong> {formData.email}</p>
      <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
      <p><strong>Applying for Position:</strong> {formData.position}</p>
      {(formData.position === 'Developer' || formData.position === 'Designer') && (
        <p><strong>Relevant Experience:</strong> {formData.relevantExperience} years</p>
      )}
      {formData.position === 'Designer' && (
        <p><strong>Portfolio URL:</strong> <a href={formData.portfolioUrl} target="_blank" rel="noopener noreferrer">{formData.portfolioUrl}</a></p>
      )}
      {formData.position === 'Manager' && (
        <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
      )}
      <p><strong>Additional Skills:</strong> {formData.additionalSkills.length > 0 ? formData.additionalSkills.join(', ') : 'None'}</p>
      <p><strong>Preferred Interview Time:</strong> {formData.interviewTime}</p>
    </div>
  );
}
