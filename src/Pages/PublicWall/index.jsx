import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../Components/Buttons';
import WallCapsule from '../../Components/Capsules/WallCapsule';
import PublicFilters from '../../Components/PublicFilters';
import { usePublicWallData } from './logic.js';
import './index.css';

const PublicWall = () => {
  const navigate = useNavigate();

  const {
    loading,
    error,
    selectedCountry,
    setSelectedCountry,
    selectedMood,
    setSelectedMood,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    getFilteredCapsules,
  } = usePublicWallData();

  return (
    <div className="public-body">
      <header className="public-header">
        <div className="public-logo">
          <span className="public-logo-icon">⏳</span>
          Time'sApp
        </div>
        <nav className="public-nav-buttons">
          <Button
            text={"Dashboard"}
            onClickListener={() => navigate("/userDashboard")}
            className="public-nav-button"
          />
          <Button
            text={"Profile"}
            onClickListener={() => navigate("/userProfile")}
            className="public-nav-button"
          />
          <Button
            text={"Logout"}
            onClickListener={() => navigate("/")}
            className="public-nav-button"
          />
        </nav>
      </header>

      <main className="public-main-content">
        <h1 className="public-main-title">
          <span className="public-main-icon">🌍</span>
          Public Capsule Wall
        </h1>
        <p className="public-main-subtitle">
          Discover time capsules from around the world
        </p>
      </main>

      <PublicFilters
        selectedCountry={selectedCountry}
        selectedMood={selectedMood}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        onCountryChange={setSelectedCountry}
        onMoodChange={setSelectedMood}
        onStartDateChange={setSelectedStartDate}
        onEndDateChange={setSelectedEndDate}
      />

      <section className="public-capsules-container">
        {loading ? (
          <p>Loading capsules...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <WallCapsule capsules={getFilteredCapsules()} />
        )}
      </section>
    </div>
  );
};

export default PublicWall;
