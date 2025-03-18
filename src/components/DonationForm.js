import React, { useState, useEffect  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Button, Offcanvas, Alert } from 'react-bootstrap';
import { FaHome, FaDonate, FaBars } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import axios from 'axios';
import bg from '../assets/karumalaikandhavelarthirukovil.Background.jpg'
import logo from '../assets/logo.jpeg';
import logo2 from '../assets/karumalaikandhavelarthirukovil.God.png'
import { useNavigate } from 'react-router-dom';
import baseurl from '../apiservice/api';

const DonationForm = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    amount: ''
  });

  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);
  const navigate = useNavigate();
   useEffect(() => {
      const adminData = JSON.parse(localStorage.getItem('adminData'));
      if (!adminData) {
        navigate('/');
        return;
      }
    });

  const handleDonationClick = () => {
    const userData = localStorage.getItem("adminData");
    if (userData) {
      navigate("/donationlist");
    } else {
      navigate("/");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("adminData");
      navigate("/");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error for the field being updated
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Phone number validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    // Email validation
    // if (!formData.email) {
    //   newErrors.email = 'Email is required';
    // } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    //   newErrors.email = 'Email is invalid';
    // }
    
    // Donation amount validation
    if (!formData.amount) {
      newErrors.amount = 'Donation amount is required';
    } else if (isNaN(formData.amount) || Number(formData.amount) <= 0) {
      newErrors.amount = 'Donation amount must be a positive number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setApiError('');

    if (validateForm()) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          `${baseurl}/api/donations/donate`,
          formData,
          { headers: { "Content-Type": "application/json" } }
        );

        if (response.data.success) {
          setSubmitted(true);
          // Reset form
          setFormData({
            name: '',
            phone: '',
            amount: ''
          });
        } else {
          setApiError(response.data.message || 'Failed to submit donation. Please try again.');
        }
      } catch (error) {
        console.error("Donation submission error:", error);
        setApiError('An error occurred. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleBack = () => {
    navigate(-1); 
  };

  return (
    <div className="donation-app">
      {/* Navbar */}
      <Navbar bg="white" expand={false} className="shadow-sm nav-bar">
        <Container fluid>
          <Button
            variant="link"
            className="text-dark border-0 p-0 me-3"
            onClick={handleShowSidebar}
          >
            <FaBars size={20} />
          </Button>
          <Navbar.Brand className="me-0">New Donation</Navbar.Brand>
          <Button
            variant="link"
            className="text-dark border-0 p-0 me-3"
            onClick={handleShowSidebar}
          >
          </Button>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar}>
        <Offcanvas.Header closeButton className="border-bottom">
          <div className="d-flex align-items-center">
            <img
              src={logo2}
              alt="Temple Logo"
              className="img-fluid me-2"
              style={{ maxHeight: "40px" }}
            />
            <span className="fw-bold">karumalaikandhavelarthirukovil</span>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
          <Nav.Link href="#" className="py-3 px-3 d-flex align-items-center" onClick={() => navigate('/home')}>
                      <FaHome size={20} color="#0d6efd" className='me-2'/>
                        Home
                      </Nav.Link>
                      <Nav.Link href="#" className="py-3 px-3 d-flex align-items-center" onClick={() => navigate('/donationlist')}>
                      <FaDonate size={20} color="#0d6efd" className='me-2'/>
                        Donation
                      </Nav.Link>
          </Nav>

          {/* <div className="mt-auto position-absolute bottom-0 w-100"> */}
            {localStorage.getItem("adminData") ? (
              <Nav.Link
                href="#"
                className="py-3 px-3 d-flex align-items-center"
                style={{ color: "#d9534f" }}
                onClick={handleLogout}
              >
                <BiLogIn size={20} className="me-2" />
                Logout
              </Nav.Link>
            ) : (
              <Nav.Link
                href="/login"
                className="py-3 px-3 d-flex align-items-center"
                style={{ color: "#3e6344" }}
              >
                <BiLogIn size={20} className="me-2" />
                Login
              </Nav.Link>
            )}
          {/* </div> */}
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      <div className="donation-content p-0" style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        minHeight: "calc(100vh - 110px)",
        width: "100%",
        height: "100%"
      }}>
        <Container className="pt-4 d-flex flex-column align-items-center">
          {/* Logo */}
          <div className="text-center mb-4">
            <img
              src={logo}
              alt="Temple Logo"
              className="img-fluid"
              style={{ maxHeight: "120px" }}
            />
          </div>

          {/* Success Message */}
          {submitted && (
            <Alert variant="success" className="w-100 mb-4">
              Thank you for your donation! Your contribution has been received successfully.
            </Alert>
          )}

          {/* API Error Message */}
          {apiError && (
            <Alert variant="danger" className="w-100 mb-4">
              {apiError}
            </Alert>
          )}

          {/* Form */}
          <Form className="w-100 mb-4" onSubmit={handleSubmit}>
            <Form.Group className="text-left mb-3">
              <Form.Label className="fw-bold">
                Name <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="text-left mb-3">
              <Form.Label className="text-left fw-bold">
                Phone Number <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            {/* <Form.Group className="text-left mb-3">
              <Form.Label className="text-left fw-bold">
                Email <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group> */}

            <Form.Group className="text-left mb-3">
              <Form.Label className="text-left fw-bold">
                Donation Amount <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control 
                type="number" 
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                isInvalid={!!errors.amount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-around">
              <Button 
                variant="outline-secondary" 
                className="px-4"
                onClick={handleBack}
                disabled={isLoading}
              >
                Back
              </Button>
              <Button
                variant="primary"
                type="submit"
                className="px-4"
                style={{ backgroundColor: "#2a7d8c", borderColor: "#2a7d8c" }}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Save'}
              </Button>
            </div>
          </Form>
        </Container>
      </div>

      {/* Footer */}
      <div className="donation-footer bg-white py-2 shadow-lg border-top">
        <Container>
          <div className="d-flex justify-content-between">
            <div className="text-center w-50 border-end">
              <a href="/home" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                <FaHome size={24} color="#2a7d8c" />
                <span>Home</span>
              </a>
            </div>
            <div className="text-center w-50">
              <a href="/donationlist" className="text-decoration-none text-dark d-flex flex-column align-items-center">
                <FaDonate size={24} color="#2a7d8c" />
                <span>Donation</span>
              </a>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default DonationForm;