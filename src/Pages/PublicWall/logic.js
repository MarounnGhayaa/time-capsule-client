import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePublicWallData = () => {
  const [capsules, setCapsules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("all countries");
  const [selectedMood, setSelectedMood] = useState("all moods");
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState('');

  useEffect(() => {
    const fetchCapsules = async () => {
      const token = localStorage.getItem('token');
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v0.1/user/publicCapsules',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.payload;

        const normalized = data.map(capsule => ({
          id: capsule.id,
          title: capsule.title,
          mood: capsule.mood || "",
          color: capsule.color || "cccccc",
          emoji: capsule.emoji || "📦",
          privacy: capsule.privacy,
          surprise: capsule.is_surprise,
          country: capsule.country || "",
          reveal_at: capsule.reveal_at,
          mediaType: capsule.image_path ? "image" : capsule.audio_path ? "audio" : "none",
          mediaUrl: capsule.image_path || capsule.audio_path || "",
          author: capsule.capsule_author.name,
        }));

        setCapsules(normalized);
      } catch (err) {
        setError(err.response?.data?.message || err.message || "Failed to fetch capsules");
      } finally {
        setLoading(false);
      }
    };

    fetchCapsules();
  }, []);

  const getFilteredCapsules = () => {
    return capsules.filter(capsule => {
      const matchesCountry =
        selectedCountry === "all countries" ||
        capsule.country.toLowerCase() === selectedCountry.toLowerCase();

      const matchesMood =
        selectedMood === "all moods" ||
        capsule.mood.toLowerCase() === selectedMood.toLowerCase();

      const revealDate = new Date(capsule.reveal_at);
      const startDate = selectedStartDate ? new Date(selectedStartDate) : null;
      const endDate = selectedEndDate ? new Date(selectedEndDate) : null;

      const matchesDateRange =
        (!startDate || revealDate >= startDate) &&
        (!endDate || revealDate <= endDate);

      return matchesCountry && matchesMood && matchesDateRange;
    });
  };

  return {
    capsules,
    loading,
    error,
    selectedCountry,
    setSelectedCountry,
    selectedMood,
    setSelectedMood,
    selectedStartDate,
    setSelectedStartDate,
    selectedEndDate,
    setSelectedEndDate,
    getFilteredCapsules,
  };
};
