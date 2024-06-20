import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobApplicationForm.css';

export default function JobApplicationForm() {
  const [values, setValues] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    experience: '',
    portfolioURL: '',
    managementExperience: '',
    skills: {
      JavaScript: false,
      CSS: false,
      Python: false,
    },
    interviewTime: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setValues({
        ...values,
        skills: {
          ...values.skills,
          [name]: checked,
        },
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
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = 'Email must be a valid email address';
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d+$/.test(values.phoneNumber)) {
      errors.phoneNumber = 'Phone Number must be a valid number';
    }
    if ((values.position === 'Developer' || values.position === 'Designer') && !values.experience) {
      errors.experience = 'Relevant Experience is required';
    } else if (values.experience && values.experience <= 0) {
      errors.experience = 'Experience must be greater than 0';
    }
    if (values.position === 'Designer' && !values.portfolioURL) {
      errors.portfolioURL = 'Portfolio URL is required';
    } else if (values.portfolioURL && !/^https?:\/\/\S+$/.test(values.portfolioURL)) {
      errors.portfolioURL = 'Portfolio URL must be a valid URL';
    }
    if (values.position === 'Manager' && !values.managementExperience) {
      errors.managementExperience = 'Management Experience is required';
    }
    if (!Object.values(values.skills).some(skill => skill)) {
      errors.skills = 'At least one skill must be selected';
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
      experience: '',
      portfolioURL: '',
      managementExperience: '',
      skills: {
        JavaScript: false,
        CSS: false,
        Python: false,
      },
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
          required
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
          required
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
          required
        />
        {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
      </div>
      <div>
        <label>Applying for Position</label>
        <select name="position" value={values.position} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Manager">Manager</option>
        </select>
      </div>
      {(values.position === 'Developer' || values.position === 'Designer') && (
        <div>
          <label>Relevant Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={values.experience}
            onChange={handleChange}
            min="1"
            required
          />
          {errors.experience && <p className="error">{errors.experience}</p>}
        </div>
      )}
      {values.position === 'Designer' && (
        <div>
          <label>Portfolio URL</label>
          <input
            type="text"
            name="portfolioURL"
            value={values.portfolioURL}
            onChange={handleChange}
            required
          />
          {errors.portfolioURL && <p className="error">{errors.portfolioURL}</p>}
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
            required
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
              name="JavaScript"
              checked={values.skills.JavaScript}
              onChange={handleChange}
            />
            JavaScript
          </label>
          <label>
            <input
              type="checkbox"
              name="CSS"
              checked={values.skills.CSS}
              onChange={handleChange}
            />
            CSS
          </label>
          <label>
            <input
              type="checkbox"
              name="Python"
              checked={values.skills.Python}
              onChange={handleChange}
            />
            Python
          </label>
        </div>
        {errors.skills && <p className="error">{errors.skills}</p>}
      </div>
      <div>
        <label>Preferred Interview Time</label>
        <input
          type="datetime-local"
          name="interviewTime"
          value={values.interviewTime}
          onChange={handleChange}
          required
        />
        {errors.interviewTime && <p className="error">{errors.interviewTime}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
