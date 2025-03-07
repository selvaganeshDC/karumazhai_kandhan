import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css"; // Ensure this file exists
import bg from "../assets/logo.jpeg";
import baseurl from '../apiservice/api';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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

    if (password !== confirmPassword) {
      formErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const registerData = { username, password };

    try {
      const response = await axios.post(
        `${baseurl}/api/register/adminregister`, 
        registerData,
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.data.success) {
        alert("Registration successful! You can now log in.");
        navigate("/login");
      } else {
        setErrors({ apiError: response.data.message || "Registration failed." });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ apiError: "Something went wrong. Please try again later." });
    }
  };

  const handleFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleBlur = () => {
    setFocusedInput(null);
  };

  return (
    <div className="register-page">
      <Container className="register-container h-100">
        <Row className="d-flex justify-content-center h-100">
          <Col xs={12} className="register-form-container" style={{ margin: "auto" }}>
            <div className="text-center mb-4">
              <Image src={bg} className="img-fluid logo_img" alt="karumalaikandhavelarthirukovil logo" />
            </div>

            <h3 className="app-name text-center mb-4">karumalaikandhavelarthirukovil</h3>

            {errors.apiError && <p className="text-danger text-center">{errors.apiError}</p>}

            <Form onSubmit={handleSubmit}>
              {/* Username */}
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

              {/* Password */}
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

              {/* Confirm Password */}
              <Form.Group className="mb-4 floating-label-group" controlId="formConfirmPassword">
                <div className="input-container text-left">
                  <Form.Label className={`floating-label ${focusedInput === "confirmPassword" || confirmPassword ? "active" : ""}`}>
                    Confirm Password <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className={`custom-input ${errors.confirmPassword ? "is-invalid" : ""}`}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={handleBlur}
                  />
                  {errors.confirmPassword && <div className="text-danger small">{errors.confirmPassword}</div>}
                </div>
              </Form.Group>

              <div className="d-grid">
                <Button variant="primary" type="submit" className="register-button" style={{ backgroundColor: "#2a7d8c", borderColor: "#2a7d8c" }}>
                  Register
                </Button>
              </div>
            </Form>

            <div className="text-center mt-4">
              <Button 
                variant="link" 
                onClick={() => navigate("/login")}
                className="text-decoration-none"
                style={{ color: "#000" }}
              >
                Already have an account? Login
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default RegisterForm;
