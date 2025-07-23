import { useState, useEffect } from 'react';
import axios from 'axios';

export const useViewCapsule = (capsuleId) => {
  const [capsule, setCapsule] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!capsuleId) {
      setError("Missing capsule ID.");
      setLoading(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Unauthorized: Please log in.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setCapsule(null);
    setCoverImage(null);
    setImage(null);
    setAudio(null);

    axios
      .get(`http://127.0.0.1:8000/api/v0.1/user/viewCapsule/${capsuleId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        if (res.data.status === "success") {
          setCapsule(res.data.payload);
        } else {
          setError("Capsule not found.");
        }
      })
      .catch(() => {
        setError("Failed to load capsule.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [capsuleId]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!capsule || !token) return;

    const fetchMedia = async (path, setter) => {
      try {
        const res = await axios.get(`http://127.0.0.1:8000/api/v0.1/user/app/${path}`, {
          headers: { Authorization: `Bearer ${token}` },
          responseType: "blob",
        });
        const url = URL.createObjectURL(res.data);
        setter(url);
      } catch {
        setError("Failed to load url.");
      }
    };

    if (capsule.cover_image) fetchMedia(capsule.cover_image, setCoverImage);
    if (capsule.image_path) fetchMedia(capsule.image_path, setImage);
    if (capsule.audio_path) fetchMedia(capsule.audio_path, setAudio);
  }, [capsule]);

  return { capsule, coverImage, image, audio, error, loading };
};
