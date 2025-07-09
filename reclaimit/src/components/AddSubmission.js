import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import FirestoreService from './FirestoreService';
import './AddSubmission.css';

const commonLocations = ['North Building', 
  'East Building', 
  'Cooperman Library', 
  'West Building', 
  'Thomas Hunter Hall', 
  'Assembly Hall (main floor)', 
  'Zabar Art Library (Room 1608, 16th floor North Building)', 
  'Sylvia and Danny Kaye Playhouse', 
  'Ida K. Lang Recital Hall', 
  'Frederick Loewe Theatre', 
  'Bertha and Karl Leubsdorf Art Gallery', 
  'Hunter Sportsplex (underground)', 
  'Brookdale Campus', 
  'Roosevelt House Public Policy Institute', 
  'MFA Building (205 Hudson Street)', 
  'Silberman School of Social Work (East Harlem Campus)'];

const AddSubmissionForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    itemName: '',
    location: '',
    dateFound: '',
    description: '',
    contactEmail: '',
    imageUpload: null,
  });

  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (name === 'location') {
      const suggestions = commonLocations.filter((loc) =>
        loc.toLowerCase().startsWith(value.toLowerCase())
      );
      setLocationSuggestions(suggestions);
      setShowSuggestions(true);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value,
    }));

    if (submitMessage) setSubmitMessage('');
  };

  const handleSuggestionClick = (suggestion) => {
    setFormData((prev) => ({ ...prev, location: suggestion }));
    setLocationSuggestions([]);
    setShowSuggestions(false);
  };

  const validateDate = (date) => {
    const pattern = /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/;
    return pattern.test(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateDate(formData.dateFound)) {
      alert('Please enter the date in MM/DD/YYYY format.');
      return;
    }

    try {
      await FirestoreService.addFoundItem(
        {
          itemName: formData.itemName,
          location: formData.location,
          dateFound: formData.dateFound,
          description: formData.description || '', // optional
          contactEmail: formData.contactEmail,
        },
        formData.imageUpload // optional, can be null
      );

      setSubmitMessage('Thank you! Your item has been submitted.');

      setFormData({
        itemName: '',
        location: '',
        dateFound: '',
        description: '',
        contactEmail: '',
        imageUpload: null,
      });

      const fileInput = document.getElementById('imageUpload');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (err) {
      console.error(err);
      alert('There was an error submitting the item. Please try again.');
    }
  };

  return (
    <div className="submission-page">
      <Header />
      <div className="submission-container">
        <h2>Submit a Found Item</h2>

        <form onSubmit={handleSubmit} className="submission-form" autoComplete="off">
          {submitMessage && (
            <div className="submit-message" style={{ color: 'green', marginBottom: '1rem' }}>
              {submitMessage}
            </div>
          )}

          <label>Item Name</label>
          <input
            type="text"
            name="itemName"
            value={formData.itemName}
            onChange={handleChange}
            required
          />

          <label>Found Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
          />

          {showSuggestions && locationSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {locationSuggestions.map((s, i) => (
                <li
                  key={i}
                  onClick={() => handleSuggestionClick(s)}
                  className="suggestion-item"
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          <label>Date Found (MM/DD/YYYY)</label>
          <input
            type="text"
            name="dateFound"
            value={formData.dateFound}
            onChange={handleChange}
            required
          />

          <label>Item Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            // removed required here, optional
          />

          <label>Your Email</label>
          <input
            type="email"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            required
          />

          <label>Upload Photo</label>
          <input
            type="file"
            id="imageUpload"
            name="imageUpload"
            accept="image/*"
            onChange={handleChange}
            // removed required here, optional
          />

          <button type="submit">Submit Item</button>
        </form>
      </div>
    </div>
  );
};

export default AddSubmissionForm;
