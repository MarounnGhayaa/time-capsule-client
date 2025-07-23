import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export const useViewSharedCapsule = () => {
  const { unlisted_token } = useParams();
  const [capsule, setCapsule] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!unlisted_token) {
      setError("Missing capsule token in URL.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setCapsule(null);

    axios
      .get(`http://127.0.0.1:8000/api/v0.1/guest/viewSharedCapsule/${unlisted_token}`)
      .then((res) => {
        if (res.data.status === 'success') {
          setCapsule(res.data.payload);
        } else {
          setError("Capsule not found or is private.");
        }
      })
      .catch(() => {
        setError("Failed to load capsule.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [unlisted_token]);

  return { capsule, error, loading };
};
