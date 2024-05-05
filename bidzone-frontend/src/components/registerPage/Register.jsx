import { useState } from "react";
import axios from "axios";
import "./register.scss";

const Register = () => {
  const [profilePicture, setProfilePicture] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    address: "",
  });
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.append("profilePicture", profilePicture);
      userData.append("userName", formData.username);
      userData.append("password", formData.password);
      userData.append("email", formData.email);
      userData.append("address", formData.address);

      const response = await axios.post(
        "http://localhost:8080/api/users/save",
        userData
      );
      console.log("Registration successful:", response.data);
      setRegistrationMessage("Registration successful!");
      alert("Account created successfully!");

      // Reset form data
      setFormData({
        username: "",
        password: "",
        email: "",
        address: "",
      });
      setProfilePicture(null);
    } catch (error) {
      console.error("Registration failed:", error);
      setRegistrationMessage("Registration failed. Please try again.");
      alert("Account creation failed!");
    }
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>BidZone</h1>
          <p>Join us and connect, share, discover, and bid on a wide variety of quality items!</p>
          <span id="registrationMessage">{registrationMessage}</span>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleRegister}>
            <div className="profile-picture">
              <label htmlFor="profilePictureInput">
                Choose Profile Picture
                <input
                  type="file"
                  accept="image/*"
                  id="profilePictureInput"
                  onChange={handleProfilePictureChange}
                />
              </label>
            </div>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
