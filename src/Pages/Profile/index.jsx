import React from 'react';
import './index.css';
import HeaderNav from '../../Components/HeaderNav';
import Footer from '../../Components/Footer';
import Button from '../../Components/Buttons';
import { useNavigate } from 'react-router-dom';
import Input from '../../Components/Inputs';
import { useProfile } from './logic.js';

const Profile = () => {
  const navigate = useNavigate();

  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    message,
    success,
    saveChanges,
  } = useProfile();

  return (
    <>
      <HeaderNav />
      <div className="profile-body">
        <div className="profile-container">
          <h1 className="profile-h1">
            <span>Profile Page</span>
          </h1>
          <div className="profile-form">
            <div className="profile-form-group">
              <label htmlFor="name">Name</label>
              <Input
                name="name"
                hint="Example"
                required={true}
                value={name}
                onChangeListener={(e) => setName(e.target.value)}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="email">Email</label>
              <Input
                name="email"
                hint="email@example.com"
                required={true}
                value={email}
                onChangeListener={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="password">Password</label>
              <Input
                name="password"
                hint="*****************"
                required={true}
                type="password"
                value={password}
                onChangeListener={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="profile-button-group">
              <Button
                text="Go Back"
                onClickListener={() => navigate("/userDashboard")}
                className="profile-button"
              />
              <Button
                text="Save Changes"
                className="profile-button"
                onClickListener={saveChanges}
              />
            </div>
            {message && (
              <p
                className={
                  success === true
                    ? "profile-success-message"
                    : "profile-error-message"
                }
              >
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
