import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useViewCapsule } from './logic.js';
import Button from '../../Components/Buttons';
import './index.css';

const ViewCapsule = () => {
  const { capsuleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { capsule, coverImage, image, audio, error, loading } = useViewCapsule(capsuleId);

  const handleGoBack = () => {
    const from = location.state?.from;
    if (from === "public") {
      navigate('/publicWall');
    } else {
      navigate('/userDashboard');
    }
  };

  if (loading) {
    return (
      <div className="view-body">
        <p>Loading capsule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-body">
        <p style={{ color: 'red' }}>{error}</p>
        <footer className="view-footer">
          <button onClick={handleGoBack} className="view-go-back-button">Go Back</button>
        </footer>
      </div>
    );
  }

  return (
    <div
      className="view-body"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: coverImage ? `url(${coverImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="view-capsule-container">
        <div className="view-capsule-header">
          <h2 className="view-capsule-title">
            <span className="view-capsule-emoji">{capsule.emoji}</span>
            {capsule.title}
          </h2>
        </div>

        <div className="view-capsule-content">
          <div className="view-reveal-location-row">
            <div className="view-content-section reveal-location-section">
              <label className="view-section-label">Reveal Date</label>
              <div className="view-tag-input">{capsule.reveal_at}</div>
            </div>

            <div className="view-content-section reveal-location-section">
              <label className="view-section-label">Location</label>
              <div className="view-tag-input">{capsule.country}</div>
            </div>
          </div>

          <div className="view-content-section">
            <label className="view-section-label">Message</label>
            <div className="view-message-content">{capsule.message}</div>
          </div>

          <div className="view-tags-row">
            <div className="view-content-section view-color-display">
              <label className="view-section-label">Theme Color</label>
              <div className="view-color-swatch" style={{ backgroundColor: capsule.color }}></div>
              <span className="view-color-code">{capsule.color}</span>
            </div>

            <div className="view-content-section">
              <label className="view-section-label">Mood</label>
              <div className="view-tag-input">{capsule.mood}</div>
            </div>

            <div className="view-content-section">
              <label className="view-section-label">Privacy</label>
              <div className="view-tag-input">{capsule.privacy}</div>
            </div>
          </div>

          {image && (
            <div className="view-image-preview">
              <img src={image} alt="Attachment" />
            </div>
          )}

          {audio && (
            <div className="view-attachment-container">
              <audio controls src={audio} />
              <p>Audio Memory</p>
            </div>
          )}

          <div className="view-location-section">
            <iframe
              title="Mini Map"
              src={`https://maps.google.com/maps?q=${capsule.latitude},${capsule.longitude}&z=13&output=embed`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="view-go-back-wrapper" style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Button
              text="Go Back"
              onClickListener={handleGoBack}
              className="view-go-back-button"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCapsule;
