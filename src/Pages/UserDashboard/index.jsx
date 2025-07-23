import React from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderNav from '../../Components/HeaderNav';
import UpcomingCapsule from '../../Components/Capsules/UpcomingCapsule';
import PastCapsule from '../../Components/Capsules/PastCapsule';
import Statistic from '../../Components/Statistics';
import Footer from '../../Components/Footer';
import Button from '../../Components/Buttons';
import { useUserDashboardData } from './logic.js';
import './index.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const userName = JSON.parse(localStorage.getItem("userName"));

  const {
    upcomingCapsules,
    pastCapsules,
    error,
    loading,
    refreshCapsules,
    deletePastCapsuleById,
  } = useUserDashboardData();

  if (loading) {
    return (
      <div className="user-body">
        <HeaderNav />
        <main className="user-main-content">
          <p>Loading capsules...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-body">
        <HeaderNav />
        <main className="user-main-content">
          <p style={{ color: "red" }}>{error}</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="user-body">
      <HeaderNav />
      <main className="user-main-content">
        <div className="user-welcome-section">
          <h2 className="user-welcome-text">
            Welcome |{userName}| Your time capsules are waiting to be discovered!
          </h2>
        </div>

        <div className="user-action-buttons">
          <Button
            text={"Create New Capsule"}
            insiders={<span className="user-text-icon user-plus">+</span>}
            onClickListener={() => navigate("/createCapsule")}
            className="user-action-btn"
          />

          <Button
            text={"Public Wall"}
            insiders={
              <span
                className="user-emoji-icon user-globe"
                role="img"
                aria-label="globe"
              >
                🌐
              </span>
            }
            onClickListener={() => navigate("/publicWall")}
            className="user-action-btn"
          />

          <Button
            text={"Profile"}
            insiders={<span className="user-text-icon user-plus">👤</span>}
            onClickListener={() => navigate("/userProfile")}
            className="user-action-btn"
          />
        </div>

        <section className="user-capsules-section">
          <div className="user-section-header">
            <div className="user-section-title">
              <span
                className="user-emoji-icon user-calendar"
                role="img"
                aria-label="calendar"
              >
                📅
              </span>
              <h2>Upcoming Capsules</h2>
            </div>
          </div>
          <UpcomingCapsule
            capsules={upcomingCapsules}
            onCapsuleRevealed={refreshCapsules}
          />
        </section>

        <section className="user-capsules-section">
          <div className="user-section-header">
            <div className="user-section-title">
              <span
                className="user-emoji-icon user-calendar"
                role="img"
                aria-label="calendar"
              >
                📅
              </span>
              <h2>Past Capsules</h2>
            </div>
          </div>
          <PastCapsule capsules={pastCapsules} onDelete={deletePastCapsuleById} />
        </section>

        <section className="user-stats">
          <div className="user-stats-header">
            <h3>Your stats!</h3>
          </div>
          <Statistic upcomingCapsules={upcomingCapsules} pastCapsules={pastCapsules} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
