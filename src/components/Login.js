import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Ensure this file exists
import bg from "../assets/logo.jpeg";
import baseurl from '../apiservice/api';
import { FaArrowLeft } from 'react-icons/fa';

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};

    if (!username.trim()) {
      formErrors.username = "Username is required.";
    } else if (/\s/.test(username)) {
      formErrors.username = "Username cannot contain spaces.";
    }

    if (!password) {
      formErrors.password = "Password is required.";
    } else if (password.length < 6) {
      formErrors.password = "Password must be at least 6 characters long.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    const loginData = {
      username,
      password,
    };
  
    try {
      const response = await axios.post(
        `${baseurl}/api/login/adminlogin`,
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.data.success) {
        // Store user data & token securely in local storage
        localStorage.setItem("adminToken", response.data.token); // Assuming token is returned
        localStorage.setItem("adminData", JSON.stringify(response.data.user));
  
        navigate("/");
      } else {
        setErrors({ apiError: "Invalid username or password." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ apiError: "Something went wrong. Please try again later." });
    }
  };
  
  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  const handleBackToDonation = () => {
    navigate("/"); // Navigate to the donation page
  };

  return (
    <div className="login-page">
      <Container className="login-container h-100">
        <Row className="d-flex justify-content-center h-100">
          <Col xs={12} className="login-form-container" style={{ margin: "auto" }}>
            {/* Back to Donation Link */}
            {/* <div className="text-left mb-3">
              <Link 
                to="/" 
                className="text-decoration-none d-inline-flex align-items-center"
                style={{ color: "#2a7d8c" }}
              >
                <FaArrowLeft className="me-2" /> Back to Donation
              </Link>
            </div> */}

            <div className="text-center mb-4">
              <Image src={bg} className="img-fluid logo_img" alt="karumalaikandhavelarthirukovil logo" />
            </div>

            <h3 className="app-name text-center mb-4">karumalaikandhavelarthirukovil</h3>

            {errors.apiError && <p className="text-danger text-center">{errors.apiError}</p>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4 floating-label-group" controlId="formUsername">
                <div className="input-container text-left">
                  <Form.Label className={`floating-label ${focusedInput === "username" || username ? "active" : ""}`}>
                    Email <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className={`custom-input ${errors.username ? "is-invalid" : ""}`}
                    onFocus={() => handleFocus("username")}
                    onBlur={handleBlur}
                  />
                  {errors.username && <div className="text-danger small">{errors.username}</div>}
                </div>
              </Form.Group>

              <Form.Group className="mb-4 floating-label-group" controlId="formPassword">
                <div className="input-container text-left">
                  <Form.Label className={`floating-label ${focusedInput === "password" || password ? "active" : ""}`}>
                    Password <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className={`custom-input ${errors.password ? "is-invalid" : ""}`}
                    onFocus={() => handleFocus("password")}
                    onBlur={handleBlur}
                  />
                  {errors.password && <div className="text-danger small">{errors.password}</div>}
                </div>
              </Form.Group>

              <div className="d-flex justify-content-between mb-4">
                <Form.Group controlId="formRememberMe">
                  <Form.Check
                    type="checkbox"
                    label="Remember me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="remember-me"
                  />
                </Form.Group>
              </div>

              <div className="d-grid">
                <Button variant="primary" type="submit" className="login-button" style={{ backgroundColor: "#2a7d8c", borderColor: "#2a7d8c" }}>
                  Login
                </Button>
              </div>
            </Form>

            {/* Alternative Back to Donation Link at Bottom */}
            <div className="text-center mt-4">
              <Button 
                variant="link" 
                onClick={handleBackToDonation}
                className="text-decoration-none"
                style={{ color: "#000" }}
              >
                Return to Donation Page
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginForm;