import React from 'react';
import { useViewSharedCapsule } from './logic.js';
import './index.css';

const ViewSharedCapsule = () => {
  const { capsule, error, loading } = useViewSharedCapsule();

  if (loading) {
    return (
      <div className="view-shared-body">
        <p>Loading capsule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="view-shared-body">
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div
      className="view-shared-body"
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundImage: `url("http://127.0.0.1:8000/api/v0.1/guest/app/${capsule.cover_image}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="view-shared-capsule-container">
        <div className="view-shared-capsule-header">
          <h2 className="view-shared-capsule-title">
            <span className="view-shared-capsule-emoji">{capsule.emoji}</span>
            {capsule.title}
          </h2>
        </div>

        <div className="view-shared-capsule-content">
          <div className="view-shared-reveal-location-row">
            <div className="view-shared-content-section reveal-location-section">
              <label className="view-shared-section-label">Reveal Date</label>
              <div className="view-shared-tag-input">{capsule.reveal_at}</div>
            </div>

            <div className="view-shared-content-section reveal-location-section">
              <label className="view-shared-section-label">Location</label>
              <div className="view-shared-tag-input">{capsule.country}</div>
            </div>
          </div>

          <div className="view-shared-content-section">
            <label className="view-shared-section-label">Message</label>
            <div className="view-shared-message-content">{capsule.message}</div>
          </div>

          <div className="view-shared-tags-row">
            <div className="view-shared-content-section view-shared-color-display">
              <label className="view-shared-section-label">Theme Color</label>
              <div
                className="view-shared-color-swatch"
                style={{ backgroundColor: capsule.color }}
              ></div>
              <span className="view-shared-color-code">{capsule.color}</span>
            </div>

            <div className="view-shared-content-section">
              <label className="view-shared-section-label">Mood</label>
              <div className="view-shared-tag-input">{capsule.mood}</div>
            </div>

            <div className="view-shared-content-section">
              <label className="view-shared-section-label">Privacy</label>
              <div className="view-shared-tag-input">{capsule.privacy}</div>
            </div>
          </div>

          {capsule.image_path && (
            <div className="view-shared-image-preview">
              <img
                src={`http://127.0.0.1:8000/api/v0.1/guest/app/${capsule.image_path}`}
                alt="Capsule"
              />
            </div>
          )}

          {capsule.audio_path && (
            <div className="view-shared-attachment-container">
              <audio
                controls
                src={`http://127.0.0.1:8000/api/v0.1/guest/app/${capsule.audio_path}`}
              />
              <p>Audio Memory</p>
            </div>
          )}

          <div className="view-shared-location-section">
            <iframe
              title="Mini Map"
              src={`https://maps.google.com/maps?q=${capsule.latitude},${capsule.longitude}&z=13&output=embed`}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewSharedCapsule;
