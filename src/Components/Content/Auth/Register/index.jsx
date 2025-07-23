import "./index.css";
import Input from "../../../Inputs";
import Button from "../../../Buttons";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const SignUpForm = ({ toggle }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/v0.1/guest/register", {
        name,
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
        "Registration failed. Please check your inputs.";
      setErrorMessage(message);
    }
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h1 className="register-h1">
          <Button
            text={"←"}
            onClickListener={() => {
              navigate("/");
            }}
            className="left-button"
          />
          <span>Time'sApp ⏳</span>
        </h1>

        <form className="register-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name" className="register-label">Name</label>
            <Input
              type={"text"}
              name={"name"}
              hint={"Example"}
              required={true}
              onChangeListener={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="email" className="register-label">Email</label>
            <Input
              type={"text"}
              name={"email"}
              hint={"email@example.com"}
              required={true}
              onChangeListener={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="register-label">Password</label>
            <Input
              type={"password"}
              name={"password"}
              hint={"************"}
              required={true}
              onChangeListener={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button
            text={"Signup"}
            className="register-button"
            onClickListener={handleRegister}
          />

          {errorMessage && (
            <p className="register-error">{errorMessage}</p>
          )}
        </form>

        <p className="login-link">
          Already have an account?
          <span className="login-link-span" onClick={toggle}>
            {" "}Login Here
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;
