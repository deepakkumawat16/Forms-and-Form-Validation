import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  phoneCode: '',
  phoneNumber: '',
  country: '',
  city: '',
  pan: '',
  aadhar: '',
};

const countries = {
  India: ['Delhi', 'Mumbai', 'Bangalore','kolkata','hyderabad','lucknow','jaipur','ahmedabad','bhilwara','indore','bhopal'],
  USA: ['New York', 'Los Angeles', 'Chicago'],
  Canada: ['Toronto', 'Vancouver', 'Montreal'],
};

export default function Form() {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    for (const field in formData) {
      if (!formData[field]) {
        newErrors[field] = `${field} is required`;
      }
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be 10 digits';
    }
    if (formData.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) {
      newErrors.pan = 'Invalid PAN number';
    }
    if (formData.aadhar && !/^\d{12}$/.test(formData.aadhar)) {
      newErrors.aadhar = 'Aadhar must be 12 digits';
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isFormValid) {
      navigate('/success', { state: formData });
    }
  };

  return (
    <div className="container">
      <h1 className="form">Registration Form</h1>
      <form onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'username', 'email'].map(name => (
          <div key={name}>
            <label>{name.replace(/([A-Z])/g, ' $1')}</label>
            <input name={name} value={formData[name]} onChange={handleChange} />
            {errors[name] && <div className="error">{errors[name]}</div>}
          </div>
        ))}

        <div>
          <label>Password</label>
          <div className="password-toggle">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="flex">
          <div>
            <label>Country Code</label>
            <input name="phoneCode" value={formData.phoneCode} onChange={handleChange} />
            {errors.phoneCode && <div className="error">{errors.phoneCode}</div>}
          </div>
          <div>
            <label>Phone Number</label>
            <input name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
            {errors.phoneNumber && <div className="error">{errors.phoneNumber}</div>}
          </div>
        </div>

        <div>
          <label>Country</label>
          <select name="country" value={formData.country} onChange={handleChange}>
            <option value="">Select Country</option>
            {Object.keys(countries).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.country && <div className="error">{errors.country}</div>}
        </div>

        <div>
          <label>City</label>
          <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.country}>
            <option value="">Select City</option>
            {formData.country && countries[formData.country].map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {errors.city && <div className="error">{errors.city}</div>}
        </div>

        <div>
          <label>PAN Number</label>
          <input name="pan" value={formData.pan} onChange={handleChange} />
          {errors.pan && <div className="error">{errors.pan}</div>}
        </div>

        <div>
          <label>Aadhar Number</label>
          <input name="aadhar" value={formData.aadhar} onChange={handleChange} />
          {errors.aadhar && <div className="error">{errors.aadhar}</div>}
        </div>

        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    </div>
  );
}
