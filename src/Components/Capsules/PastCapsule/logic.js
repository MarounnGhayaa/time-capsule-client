import axios from 'axios';

export const handleViewCapsule = (capsuleId, navigate) => {
  localStorage.setItem("viewCapsuleId", capsuleId);
  navigate(`/viewCapsule/${capsuleId}`, { state: { from: "dashboard" } });
};

export const handleDeleteCapsule = async (capsuleId, onDelete) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    await axios.delete(
      `http://127.0.0.1:8000/api/v0.1/user/deleteCapsule/${capsuleId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    onDelete(capsuleId);
  } catch (error) {
    console.error('Error deleting capsule:', error);
  }
};

export const handleShare = (unlistedToken, capsuleId, setCopiedCapsuleId) => {
  if (!unlistedToken) return;

  const shareLink = `http://localhost:3000/viewSharedCapsule/${unlistedToken}`;
  navigator.clipboard.writeText(shareLink)
    .then(() => {
      setCopiedCapsuleId(capsuleId);
      setTimeout(() => setCopiedCapsuleId(null), 3000);
    })
    .catch(() => console.log("Failed to copy link."));
};
