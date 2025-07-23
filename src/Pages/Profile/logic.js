import { useState, useEffect } from 'react';
import axios from 'axios';

export const useProfile = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");

    const retrieveInfo = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:8000/api/v0.1/user/getInfo/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setName(response.data.payload.name);
        setEmail(response.data.payload.email);
        setPassword(response.data.payload.password);
      } catch (error) {}
    };

    retrieveInfo();
  }, []);

  const saveChanges = async () => {
    const token = localStorage.getItem("token");
    const userID = localStorage.getItem("userID");
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/v0.1/user/updateInfo/${userID}`,
        {
          name,
          email,
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Profile updated successfully!");
      setSuccess(true);
    } catch (error) {
      setMessage("Failed to update Profile!");
      setSuccess(false);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    message,
    success,
    saveChanges,
  };
};
