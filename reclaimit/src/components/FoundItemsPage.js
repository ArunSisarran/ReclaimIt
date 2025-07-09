// FoundItemsPage.js
import React, { useState, useEffect } from 'react';
import Header from './Header';
import FirestoreService from './FirestoreService';
import FoundItemsList from './FoundItemsList';
import './FoundItemsPage.css';

const FoundItemsPage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterSuggestions, setFilterSuggestions] = useState([]);
  const [showFilterSuggestions, setShowFilterSuggestions] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      const data = await FirestoreService.getFoundItems();
      setSubmissions(data);
    }
    fetchItems();
  }, []);

  const allLocations = Array.from(new Set(submissions.map((s) => s.location)));

  const handleFilterChange = (e) => {
    const val = e.target.value;
    setSearchInput(val);

    if (filterLocation) {
      setFilterLocation('');
    }

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
    setSearchInput(suggestion);
    setFilterSuggestions([]);
    setShowFilterSuggestions(false);
  };

  const applyFilter = () => {
    setFilterLocation(searchInput.trim());
    setShowFilterSuggestions(false);
  };

  // Use locked filter if set, otherwise use live searchInput for filtering
  const filteredSubmissions = filterLocation
    ? submissions.filter((item) =>
        item.location.toLowerCase().includes(filterLocation.toLowerCase())
      )
    : searchInput.trim()
    ? submissions.filter((item) =>
        item.location.toLowerCase().includes(searchInput.toLowerCase())
      )
    : submissions;

  return (
    <div className="submission-page">
      <Header />
      <div className="submission-container">
        <h2>Found Items</h2>

        <div className="filter-section">
          <h3>Filter by Location</h3>
          <div className="filter-input-wrapper" style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Enter location to filter..."
              value={searchInput}
              onChange={handleFilterChange}
              onBlur={() => setTimeout(() => setShowFilterSuggestions(false), 100)}
            />
            <button type="button" onClick={applyFilter}>
              Filter
            </button>
          </div>

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

        <FoundItemsList items={filteredSubmissions} />

        <div className="results-message" style={{ marginTop: '1rem', fontStyle: 'italic' }}>
          {filteredSubmissions.length > 0 ? (
            <p>
              We found {filteredSubmissions.length} item
              {filteredSubmissions.length > 1 ? 's' : ''} matching your filter.
            </p>
          ) : (
            <p>
              No items found matching your location.{' '}
              <a href="/submit" style={{ color: 'blue', textDecoration: 'underline' }}>
                Submit a lost item here.
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoundItemsPage;
