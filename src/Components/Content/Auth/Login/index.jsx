import "./index.css";
import Input from "../../../Inputs";
import Button from "../../../Buttons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginForm = ({ toggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v0.1/guest/login", {
        email,
        password,
      });

      const token = response.data.payload.token;
      const userID = response.data.payload.id;
      const userName = response.data.payload.name;

      if (!token) {
        setErrorMessage("No token returned from server.");
        return;
      }

      setErrorMessage("");
      localStorage.setItem("token", token);
      localStorage.setItem("userID", userID);
      localStorage.setItem("userName", JSON.stringify(userName));

      navigate("/UserDashboard");

    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login failed. Please check your credentials.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="login-body">
      <div className="login-container">
        <h1 className="login-h1">
          <Button
            text={"←"}
            onClickListener={() => navigate("/")}
            className="left-button"
          />
          <span>Time'sApp ⏳</span>
        </h1>

        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="login-label">Email</label>
            <Input
              type="text"
              name="email"
              hint="email@example.com"
              required={true}
              onChangeListener={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="login-label">Password</label>
            <Input
              type="password"
              name="password"
              hint="************"
              required={true}
              onChangeListener={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            text="Login"
            onClickListener={handleLogin}
            className="login-button"
          />

          {errorMessage && <p className="login-error">{errorMessage}</p>}
        </form>

        <p className="register-link">
          Don't have an account?
          <span className="register-link-span" onClick={toggle}>
            {" "}Register Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
