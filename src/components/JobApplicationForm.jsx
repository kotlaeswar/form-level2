import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobApplicationForm.css';

export default function JobApplicationForm() {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    relevantExperience: '',
    portfolioUrl: '',
    managementExperience: '',
    additionalSkills: [],
    interviewTime: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setValues({
        ...values,
        additionalSkills: checked
          ? [...values.additionalSkills, value]
          : values.additionalSkills.filter(skill => skill !== value),
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      navigate('/summary', { state: { formData: values } });
      resetForm();
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!values.fullName) {
      errors.fullName = 'Full Name is required';
    }
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email must be a valid email address';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((values.position === 'Developer' || values.position === 'Designer') && !values.relevantExperience) {
      errors.relevantExperience = 'Relevant Experience is required';
    } else if (values.relevantExperience && values.relevantExperience <= 0) {
      errors.relevantExperience = 'Relevant Experience must be greater than 0';
    }
    if (values.position === 'Designer' && !values.portfolioUrl) {
      errors.portfolioUrl = 'Portfolio URL is required';
    }
    if (values.position === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (!values.additionalSkills.length) {
      errors.additionalSkills = 'At least one additional skill must be selected';
    }
    if (!values.interviewTime) {
      errors.interviewTime = 'Preferred Interview Time is required';
    }
    return errors;
  };

  const resetForm = () => {
    setValues({
      fullName: '',
      email: '',
      phoneNumber: '',
      position: '',
      relevantExperience: '',
      portfolioUrl: '',
      managementExperience: '',
      additionalSkills: [],
      interviewTime: '',
    });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div>
        <label>Full Name</label>
        <input
          type="text"
          name="fullName"
          value={values.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <p className="error">{errors.fullName}</p>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div>
        <label>Phone Number</label>
        <input
          type="text"
          name="phoneNumber"
          value={values.phoneNumber}
          onChange={handleChange}
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label>Applying for Position</label>
        <select name="position" value={values.position} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
        {errors.position && <p className="error">{errors.position}</p>}
      </div>
      {(values.position === 'Developer' || values.position === 'Designer') && (
        <div>
          <label>Relevant Experience (years)</label>
          <input
            type="number"
            name="relevantExperience"
            value={values.relevantExperience}
            onChange={handleChange}
          />
          {errors.relevantExperience && <p className="error">{errors.relevantExperience}</p>}
        </div>
      )}
      {values.position === 'Designer' && (
        <div>
          <label>Portfolio URL</label>
          <input
            type="text"
            name="portfolioUrl"
            value={values.portfolioUrl}
            onChange={handleChange}
          />
          {errors.portfolioUrl && <p className="error">{errors.portfolioUrl}</p>}
        </div>
      )}
      {values.position === 'Manager' && (
        <div>
          <label>Management Experience</label>
          <input
            type="text"
            name="managementExperience"
            value={values.managementExperience}
            onChange={handleChange}
          />
          {errors.managementExperience && <p className="error">{errors.managementExperience}</p>}
        </div>
      )}
      <div>
        <label>Additional Skills</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="JavaScript"
              checked={values.additionalSkills.includes('JavaScript')}
              onChange={handleChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="CSS"
              checked={values.additionalSkills.includes('CSS')}
              onChange={handleChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="additionalSkills"
              value="Python"
              checked={values.additionalSkills.includes('Python')}
              onChange={handleChange}
            />
            Python
          </label>
        </div>
        {errors.additionalSkills && <p className="error">{errors.additionalSkills}</p>}
      </div>
      <div>
        <label>Preferred Interview Time</label>
        <input
          type="datetime-local"
          name="interviewTime"
          value={values.interviewTime}
          onChange={handleChange}
        />
        {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
