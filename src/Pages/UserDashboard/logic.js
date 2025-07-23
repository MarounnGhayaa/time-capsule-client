import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const useUserDashboardData = () => {
  const [upcomingCapsules, setUpcomingCapsules] = useState([]);
  const [pastCapsules, setPastCapsules] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const refreshCapsules = useCallback(async () => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");

    if (!token || !userID) {
      setError("Missing authentication or user ID.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const [upcomingRes, pastRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/v0.1/user/getUpcomingCapsules/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://127.0.0.1:8000/api/v0.1/user/getPastCapsules/${userID}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setUpcomingCapsules(upcomingRes.data.payload || []);
      setPastCapsules(pastRes.data.payload || []);
    } catch (err) {
      setError("Failed to load capsules.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCapsules();
  }, [refreshCapsules]);

  const deletePastCapsuleById = (deletedId) => {
    setPastCapsules(prev => prev.filter(capsule => capsule.id !== deletedId));
  };

  return {
    upcomingCapsules,
    pastCapsules,
    error,
    loading,
    refreshCapsules,
    deletePastCapsuleById,
  };
};
