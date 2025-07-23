import React, { useEffect, useState } from 'react';
import './index.css';
import { fetchFiltersData } from './logic';

const PublicFilters = ({
  selectedCountry,
  selectedMood,
  selectedStartDate,
  selectedEndDate,
  onCountryChange,
  onMoodChange,
  onStartDateChange,
  onEndDateChange,
}) => {
  const [countries, setCountries] = useState([]);
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    fetchFiltersData()
      .then(({ countries, moods }) => {
        setCountries(countries);
        setMoods(moods);
      })
      .catch(() => {
        setCountries([]);
        setMoods([]);
      });
  }, []);

  return (
    <section className="public-filters">
      <div className="public-filter-group">
        <label className="public-filter-label">Country:</label>
        <select
          className="public-filter-select"
          value={selectedCountry}
          onChange={(e) => onCountryChange(e.target.value)}
        >
          <option value="all countries">All Countries</option>
          {countries.map((country, idx) => (
            <option key={idx} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      <div className="public-filter-group">
        <label className="public-filter-label">Mood:</label>
        <select
          className="public-filter-select"
          value={selectedMood}
          onChange={(e) => onMoodChange(e.target.value)}
        >
          <option value="all moods">All Moods</option>
          {moods.map((mood, idx) => (
            <option key={idx} value={mood}>
              {mood}
            </option>
          ))}
        </select>
      </div>

      <div className="public-filter-group">
        <label className="public-filter-label">Start Date:</label>
        <input
          type="date"
          className="public-filter-select"
          value={selectedStartDate}
          onChange={(e) => onStartDateChange(e.target.value)}
        />
      </div>

      <div className="public-filter-group">
        <label className="public-filter-label">End Date:</label>
        <input
          type="date"
          className="public-filter-select"
          value={selectedEndDate}
          onChange={(e) => onEndDateChange(e.target.value)}
        />
      </div>
    </section>
  );
};

export default PublicFilters;
