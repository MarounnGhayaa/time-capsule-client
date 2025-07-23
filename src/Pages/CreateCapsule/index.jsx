import React from "react";
import "./index.css";
import Button from "../../Components/Buttons";
import { useNavigate } from "react-router-dom";
import { useCreateCapsule } from "./logic.js";

const CreateCapsule = () => {
  const navigate = useNavigate();

  const {
    title,
    setTitle,
    text,
    setText,
    mood,
    setMood,
    emoji,
    setEmoji,
    privacy,
    setPrivacy,
    isSurprise,
    setIsSurprise,
    revealAt,
    setRevealAt,
    audioName,
    coverImageName,
    imageName,
    color,
    setColor,
    handleCoverImageChange,
    handleImageChange,
    handleAudioChange,
    handleCreateCapsule,
  } = useCreateCapsule();

  return (
    <div className="create-body">
      <div className="create-container">
        <div className="create-header">
          <h1 className="create-title">Create Capsule</h1>
          <Button
            text={"→"}
            onClickListener={() => navigate("/userDashboard")}
            className="create-close-btn"
          />
        </div>

        <div>
          <div className="create-form-group">
            <label className="create-label">Name Your Capsule</label>
            <input
              type="text"
              className="create-text-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter capsule name"
            />
          </div>

          <div className="create-form-group">
            <label className="create-label">Message</label>
            <textarea
              className="create-message-input"
              placeholder="Write your message here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <div className="create-form-group">
            <label className="create-label">Select Mood</label>
            <select
              className="create-select-input"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="">Choose mood</option>
              <option value="reflective">Reflective</option>
              <option value="hopeful">Hopeful</option>
              <option value="grateful">Grateful</option>
              <option value="excited">Excited</option>
              <option value="nostalgic">Nostalgic</option>
              <option value="determined">Determined</option>
              <option value="joyful">Joyful</option>
              <option value="curious">Curious</option>
              <option value="calm">Calm</option>
              <option value="adventurous">Adventurous</option>
            </select>
          </div>

          <div className="create-form-group">
            <label className="create-label">Select Emoji</label>
            <select
              className="create-select-input"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
            >
              <option value="">Choose emoji</option>
              <option value="🕰️">🕰️ Time</option>
              <option value="⏳">⏳ Waiting</option>
              <option value="✉️">✉️ Message</option>
              <option value="🌱">🌱 Growth</option>
              <option value="💌">💌 Love letter</option>
              <option value="🎁">🎁 Surprise</option>
              <option value="🌅">🌅 Sunrise</option>
              <option value="📸">📸 Memory</option>
              <option value="💭">💭 Thought</option>
              <option value="🌌">🌌 Dreams</option>
              <option value="🎂">🎂 Birthday / Year</option>
              <option value="🗝️">🗝️ Unlock</option>
              <option value="🚀">🚀 Future goals</option>
              <option value="📖">📖 Story</option>
              <option value="🎶">🎶 Music memory</option>
            </select>
          </div>

          <div className="create-form-group">
            <label className="create-label">Add Media</label>
            <div className="create-file-options">
              <label className="create-file-option">
                Cover Image (optional)
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleCoverImageChange}
                />
                {coverImageName && (
                  <span className="file-name">{coverImageName}</span>
                )}
              </label>

              <label className="create-file-option">
                Audio (optional)
                <input
                  type="file"
                  accept="audio/*"
                  style={{ display: "none" }}
                  onChange={handleAudioChange}
                />
                {audioName && <span className="file-name">{audioName}</span>}
              </label>

              <label className="create-file-option">
                Image (optional)
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
                {imageName && <span className="file-name">{imageName}</span>}
              </label>

              <label
                className="create-file-option"
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                Color
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    backgroundColor: color,
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                  title={`Selected color: ${color}`}
                />
              </label>
            </div>
          </div>

          <div className="create-form-group">
            <label className="create-label">When do you want to unlock your capsule?</label>
            <input
              type="datetime-local"
              className="create-date-input"
              value={revealAt}
              onChange={(e) => setRevealAt(e.target.value)}
            />
          </div>

          <div className="create-form-group">
            <label className="create-label">Privacy:</label>
            <div className="create-privacy-options">
              <div className="create-privacy-option">
                <input
                  type="radio"
                  id="private"
                  name="privacy"
                  value="private"
                  checked={privacy === "private"}
                  onChange={(e) => setPrivacy(e.target.value)}
                />
                <label htmlFor="private">Private</label>
              </div>
              <div className="create-privacy-option">
                <input
                  type="radio"
                  id="public"
                  name="privacy"
                  value="public"
                  checked={privacy === "public"}
                  onChange={(e) => setPrivacy(e.target.value)}
                />
                <label htmlFor="public">Public</label>
              </div>
              <div className="create-privacy-option">
                <input
                  type="radio"
                  id="unlisted"
                  name="privacy"
                  value="unlisted"
                  checked={privacy === "unlisted"}
                  onChange={(e) => setPrivacy(e.target.value)}
                />
                <label htmlFor="unlisted">Unlisted</label>
              </div>
            </div>
          </div>

          <div className="create-surprise-mode">
            <input
              type="checkbox"
              id="surprise"
              checked={isSurprise}
              onChange={(e) => setIsSurprise(e.target.checked)}
            />
            <label htmlFor="surprise">Surprise Mode:</label>
          </div>

          <Button
            text={"Create"}
            className="create-btn"
            onClickListener={() => handleCreateCapsule(navigate)}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCapsule;
