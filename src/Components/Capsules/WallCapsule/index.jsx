import React from 'react';
import './index.css';
import Button from '../../Buttons';
import { useNavigate } from 'react-router-dom';

const WallCapsule = ({ capsules }) => {
  const navigate = useNavigate();
  const handleViewCapsule = (capsuleId) => {
    localStorage.setItem("viewCapsuleId", capsuleId);
    navigate(`/viewCapsule/${capsuleId}`, { state: { from: "public" } });

  };
  const visibleCapsules = capsules.filter(capsule =>
    capsule.privacy.toLowerCase() !== 'private' &&
    capsule.privacy.toLowerCase() !== 'unlisted'
  );

  return (
    <>
      {visibleCapsules.map((capsule, index) => (
        <div key={index} className="public-capsule-card">
          <div className="public-capsule-image"
            style={{ backgroundColor: capsule.color || '#DEECFB' }}>
          </div>

          <div className="public-capsule-content">
            <div className="public-capsule-info">
              <h3 className="public-capsule-title">{capsule.title}</h3>
              <p className="public-capsule-author">by {capsule.author}
                              {capsule.country && (
                <span className="public-capsule-tag">{capsule.country}</span>
              )}
              </p>
              {capsule.emoji && (
                <span className="public-capsule-tag">{capsule.emoji}</span>
              )}
              {capsule.mood && (
                <span className="public-capsule-tag">{capsule.mood}</span>
              )}
              {capsule.tag && (
                <span className="public-capsule-tag">{capsule.tag}</span>
              )}

              <span className={`public-capsule-tag privacy-${capsule.privacy}`}>
                {capsule.privacy}
              </span>

              {capsule.is_surprise === 1 && <span className="surprise-badge">Surprise</span>}

              <Button
                text={"View"}
                onClickListener={() => handleViewCapsule(capsule.id)}
                className="public-view-btn"
              />
            </div>

            <div className="public-capsule-date">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Opened on:<br />
              {capsule.reveal_at}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default WallCapsule;
