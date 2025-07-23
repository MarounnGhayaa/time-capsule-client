import { useState } from "react";
import axios from "axios";

export const useCreateCapsule = () => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [mood, setMood] = useState("");
  const [emoji, setEmoji] = useState("");
  const [privacy, setPrivacy] = useState("private");
  const [isSurprise, setIsSurprise] = useState(false);
  const [revealAt, setRevealAt] = useState("");
  const [audio, setAudio] = useState(null);
  const [audioName, setAudioName] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverImageName, setCoverImageName] = useState("");
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [color, setColor] = useState("#000000");

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleCoverImageChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await fileToBase64(file);
      setCoverImage(base64);
      setCoverImageName(file.name);
    } else {
      setCoverImage(null);
      setCoverImageName("");
    }
  };

  const handleImageChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await fileToBase64(file);
      setImage(base64);
      setImageName(file.name);
    } else {
      setImage(null);
      setImageName("");
    }
  };

  const handleAudioChange = async (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      const base64 = await fileToBase64(file);
      setAudio(base64);
      setAudioName(file.name);
    } else {
      setAudio(null);
      setAudioName("");
    }
  };

  const handleCreateCapsule = async (navigate) => {
    const token = localStorage.getItem("token");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("message", text);
    formData.append("mood", mood);
    formData.append("emoji", emoji);
    formData.append("privacy", privacy);
    formData.append("is_surprise", isSurprise ? 1 : 0);
    formData.append("reveal_at", revealAt);
    formData.append("color", color);

    if (coverImage) formData.append("cover_image", coverImage);
    if (image) formData.append("image_path", image);
    if (audio) formData.append("audio_path", audio);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/v0.1/user/createCapsule",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/userDashboard");
    } catch (error) {
      console.error("Failed to create capsule:", error.response?.data || error.message);
    }
  };

  return {
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
    audio,
    audioName,
    coverImage,
    coverImageName,
    image,
    imageName,
    color,
    setColor,
    handleCoverImageChange,
    handleImageChange,
    handleAudioChange,
    handleCreateCapsule,
  };
};
