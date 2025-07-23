import "../Styles/App.css";

import {Routes, Route } from "react-router-dom";

import LandingPage from "../Pages/LandingPage";
import UserDashboard from "../Pages/UserDashboard";
import Profile from "../Pages/Profile";
import CreateCapsule from "../Pages/CreateCapsule";
import PublicWall from "../Pages/PublicWall";
import ViewCapsule from "../Pages/ViewCapsule";
import ViewSharedCapsule from "../Pages/ViewSharedCapsule";
import Auth from "../Pages/AuthenticationPage";

const MyRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/userDashboard" element={<UserDashboard />} />
      <Route path="/userProfile" element={<Profile />} />
      <Route path="/createCapsule" element={<CreateCapsule />} />
      <Route path="/publicWall" element={<PublicWall />} />
      <Route path="/viewCapsule/:capsuleId" element={<ViewCapsule />} />
      <Route path="/authentication" element={<Auth />} />
      <Route path="/viewSharedCapsule/:unlisted_token" element={<ViewSharedCapsule />} />
    </Routes>
  );
};

export default MyRoutes;
