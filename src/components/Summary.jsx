import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Summary() {
  const location = useLocation();
  const formData = location.state?.formData;

  return (
    <div>
      <h2>Application Summary</h2>
      {formData ? (
        <div>
          <p><strong>Full Name:</strong> {formData.fullName}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
          <p><strong>Applying for Position:</strong> {formData.position}</p>
          {(formData.position === 'Developer' || formData.position === 'Designer') && (
            <p><strong>Relevant Experience:</strong> {formData.experience} years</p>
          )}
          {formData.position === 'Designer' && (
            <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
          )}
          {formData.position === 'Manager' && (
            <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
          )}
          <p><strong>Additional Skills:</strong> {Object.keys(formData.skills).filter(skill => formData.skills[skill]).join(', ')}</p>
          <p><strong>Preferred Interview Time:</strong> {formData.interviewTime}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}
