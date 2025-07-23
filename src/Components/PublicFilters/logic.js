import axios from 'axios';

export const fetchFiltersData = async () => {
  const token = localStorage.getItem('token');
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/v0.1/user/publicCapsules', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const capsules = res.data.payload || [];
    const countriesSet = new Set();
    const moodsSet = new Set();

    capsules.forEach((capsule) => {
      if (capsule.country) countriesSet.add(capsule.country);
      if (capsule.mood) moodsSet.add(capsule.mood);
    });

    return {
      countries: [...countriesSet],
      moods: [...moodsSet],
    };
  } catch (error) {
    console.error('Failed to load filters:', error);
    throw error;
  }
};
