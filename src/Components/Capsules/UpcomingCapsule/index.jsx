import './index.css';
import { useEffect, useState } from 'react';
import { getRemainingTime } from './logic';

const Countdown = ({ revealAt, onEnd }) => {
  const [timeLeft, setTimeLeft] = useState(getRemainingTime(revealAt));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getRemainingTime(revealAt);
      setTimeLeft(remaining);

      if (!remaining) {
        clearInterval(timer);
        onEnd();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [revealAt, onEnd]);

  if (!timeLeft) return <span>Revealed!</span>;

  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <span>
      {days}d {hours}h {minutes}m {seconds}s
    </span>
  );
};

const UpcomingCapsule = ({ capsules, onCapsuleRevealed }) => {
  return (
    <div className="upcoming-capsules-list">
      {capsules.filter(capsule => !capsule.is_surprise).map(capsule => (
        <div
          key={capsule.id}
          className={`upcoming-capsule-card ${capsule.privacy === 'unlisted' ? 'unlisted-style' : ''}`}
        >
          <div className="upcoming-capsule-content">
            <div className="upcoming-capsule-info">
              <div className="upcoming-capsule-title-row">
                <h3 className="upcoming-capsule-title">
                  {capsule.emoji} {capsule.title}
                </h3>
              </div>
              <p className="upcoming-capsule-category">{capsule.mood}</p>
            </div>
            <div className="upcoming-capsule-badge">
              <Countdown
                revealAt={capsule.reveal_at}
                onEnd={() => onCapsuleRevealed(capsule.id)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingCapsule;
