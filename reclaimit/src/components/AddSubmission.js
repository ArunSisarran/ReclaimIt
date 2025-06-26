import React, { useState } from 'react';
import './AddSubmission.css';
import Header from './Header';

const commonLocations = [
 ' North Building', 
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
  'Silberman School of Social Work (East Harlem Campus)'
];

const AddSubmission = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    location: '',
    dateFound: '',
    description: '',
    contact: '',
    imageUpload: null,
  });

  const [submissions, setSubmissions] = useState([]);
  const [filterLocation, setFilterLocation] = useState('');

  // Suggestions for form input
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Suggestions for filter input
  const [filterSuggestions, setFilterSuggestions] = useState([]);
  const [showFilterSuggestions, setShowFilterSuggestions] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateDate(formData.dateFound)) {
      alert('Please enter the date in MM/DD/YYYY format.');
      return;
    }

    const newSubmission = {
      ...formData,
      id: Date.now(),
    };

    setSubmissions((prev) => [newSubmission, ...prev]);
    alert('Thank you! Your item has been submitted.');

    setFormData({
      itemName: '',
      location: '',
      dateFound: '',
      description: '',
      contact: '',
      imageUpload: null,
    });
    setLocationSuggestions([]);
    setShowSuggestions(false);
    document.getElementById('imageUpload').value = '';
  };

  // Combine locations from submissions and common locations, unique
  const allLocations = Array.from(
    new Set([...submissions.map((s) => s.location), ...commonLocations])
  );

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setFilterLocation(val);

    if (val.trim() === '') {
      setFilterSuggestions([]);
      setShowFilterSuggestions(false);
      return;
    }

    const filtered = allLocations.filter((loc) =>
      loc.toLowerCase().startsWith(val.toLowerCase())
    );
    setFilterSuggestions(filtered);
    setShowFilterSuggestions(true);
  };

  const handleFilterSuggestionClick = (suggestion) => {
    setFilterLocation(suggestion);
    setFilterSuggestions([]);
    setShowFilterSuggestions(false);
  };

  const filteredSubmissions = filterLocation
    ? submissions.filter((item) =>
        item.location.toLowerCase().includes(filterLocation.toLowerCase())
      )
    : submissions;

  return (
    <div className="submission-page">
      <Header />
      <div className="submission-container">
        <h2>Submit a Found Item</h2>

        <form onSubmit={handleSubmit} className="submission-form" autoComplete="off">
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
            required
          />

          <label>Your Email</label>
          <input
            type="email"
            name="contact"
            value={formData.contact}
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
            required
          />

          <button type="submit">Submit Item</button>
        </form>

        {/* Filter section with dropdown suggestions */}
        <div className="filter-section">
          <h3>Filter by Location</h3>
          <div className="filter-input-wrapper">
            <input
              type="text"
              placeholder="Enter location to filter..."
              value={filterLocation}
              onChange={handleFilterChange}
              onBlur={() => setTimeout(() => setShowFilterSuggestions(false), 100)}
            />
            {showFilterSuggestions && filterSuggestions.length > 0 && (
              <ul className="filter-suggestions-list">
                {filterSuggestions.map((s, i) => (
                  <li
                    key={i}
                    onClick={() => handleFilterSuggestionClick(s)}
                    className="suggestion-item"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Display submissions */}
        <div className="submission-list">
          <h3>Found Items</h3>
          {filteredSubmissions.length === 0 ? (
            <p>No items found.</p>
          ) : (
            filteredSubmissions.map((item) => (
              <div key={item.id} className="submission-card">
                <h4>{item.itemName}</h4>
                <p><strong>Location:</strong> {item.location}</p>
                <p><strong>Date:</strong> {item.dateFound}</p>
                <p><strong>Description:</strong> {item.description}</p>
                <p><strong>Contact:</strong> {item.contact}</p>
                {item.imageUpload && (
                  <img
                    src={URL.createObjectURL(item.imageUpload)}
                    alt="Found item"
                  />
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AddSubmission;
