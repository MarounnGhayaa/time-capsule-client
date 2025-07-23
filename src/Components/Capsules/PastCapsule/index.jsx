import React, { useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';
import Button from '../../Buttons';
import { handleViewCapsule, handleDeleteCapsule, handleShare } from './logic';

const PastCapsule = ({ capsules, onDelete }) => {
  const navigate = useNavigate();
  const [copiedCapsuleId, setCopiedCapsuleId] = useState(null);

  return (
    <div className="past-capsules-list">
      {capsules.map(capsule => (
        <div
          key={capsule.id}
          className={`past-capsule-card ${capsule.privacy === 'unlisted' ? 'unlisted-style' : ''}`}
        >
          <div className="past-capsule-content">
            <div className="past-capsule-info">
              <h3 className="past-capsule-title">
                {capsule.emoji} {capsule.title} {capsule.is_surprise === 1 && <span className="surprise-badge">Surprise</span>}
              </h3>
              
              <p className="past-capsule-category" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {capsule.mood}
                {capsule.privacy === 'unlisted' && (
                  <>
                    <Button
                      text="Copy Link"
                      className="share-link-btn"
                      onClickListener={() => handleShare(capsule.unlisted_token, capsule.id, setCopiedCapsuleId)}
                    />
                    {copiedCapsuleId === capsule.id && (
                      <p style={{ margin: 0, color: 'black', fontWeight: 'bold' }}>Copied!</p>
                    )}
                  </>
                )}
              </p>

              <Button
                insiders={<span className="past-emoji-icon past-view" role="img" aria-label="view">👁️</span>}
                text={"View"}
                onClickListener={() => handleViewCapsule(capsule.id, navigate)}
                className="past-view-btn"
              />
              &nbsp;&nbsp;
              <Button
                insiders={<span className="past-emoji-icon past-delete" role="img" aria-label="delete">🗑️</span>}
                text={"Delete"}
                className="past-delete-btn"
                onClickListener={() => handleDeleteCapsule(capsule.id, onDelete)}
              />
            </div>
            <div className="past-capsule-badge">
              <span>Opened {capsule.reveal_at}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PastCapsule;
