import "./index.css";
import timeCapsuleImage from "../../Assets/Time-Capsule-IMG.png";
import Button from "../../Components/Buttons";
import { useNavigate } from "react-router-dom";
import Footer from "../../Components/Footer";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-body">
      <header className="landing-nav">
        <div className="landing-logo">
          ⏳ <span>Time'sApp</span>
        </div>
          <Button
            text={"Start Your Capsule"}
            onClickListener={ () => {
             navigate("/authentication");
            }}
            className = "landing-header-button"
          />
      </header>

      <main className="landing-main">
        <section className="landing-hero">
          <div className="landing-hero-text">
            <h1>
              Plant your words in time's garden; let them bloom when destiny
              calls.
            </h1>
            <p>
              Capture today. Reveal tomorrow. For yourself, or for the waiting
              world.
            </p>
          <Button
            text={"Start Your Capsule"}
            onClickListener={ () => {
             navigate("/authentication");
            }}
            className = "landing-header-button"
          />
          </div>
          <div className="landing-hero-image">
            <img src={timeCapsuleImage} alt="Time Capsule" />
          </div>
        </section>

        <section className="landing-features">
          <h2>✨What do we do?🔭</h2>
          <div className="landing-feature-list">
            <div className="landing-feature-item">
              <span>📝</span>
              <h3>Write future messages to yourself or share it publicly.</h3>
            </div>
            <div className="landing-feature-item">
              <span>💾</span>
              <h3>Attach images, audio, markdown notes. Export memories.</h3>
            </div>
            <div className="landing-feature-item">
              <span>🎁</span>
              <h3>Surprise mode: hide even from yourself until reveal.</h3>
            </div>
            <div className="landing-feature-item">
              <span>🏛️</span>
              <h3>Public wall to explore revealed capsules by multiple users.</h3>
            </div>
          </div>
        </section>
      </main>
      <Footer/>
    </div>
  );
};

export default LandingPage;
