import React, { useState, useEffect } from 'react';
import { Container, ListGroup, Navbar, Button, Offcanvas, Nav, Spinner, Alert, Form, Row, Col } from 'react-bootstrap';
import { FaHome, FaDonate, FaBars, FaFilter } from 'react-icons/fa';
import { BiLogIn } from 'react-icons/bi';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/karumalaikandhavelarthirukovil.God.png';
import baseurl from '../apiservice/api';

const DonationList = () => {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  // Handle Sidebar Toggle
  const handleCloseSidebar = () => setShowSidebar(false);
  const handleShowSidebar = () => setShowSidebar(true);

  // Fetch Donation List from API
  useEffect(() => {
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    if (!adminData) {
      navigate('/');
      return;
    }

    const fetchDonations = async () => {
      try {
        const response = await axios.get(`${baseurl}/api/donations/list`);
        setDonors(response.data.donations);
        setFilteredDonors(response.data.donations);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch donations');
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, [navigate]);

  // Filter donations by single date
  const applyDateFilter = () => {
    if (!selectedDate) {
      setFilteredDonors(donors);
      return;
    }

    const filtered = donors.filter(donor => {
      const donationDate = new Date(donor.createdAt);
      const filterDate = new Date(selectedDate);
      
      // Set hours to 0 for comparison to match just the date portion
      donationDate.setHours(0, 0, 0, 0);
      filterDate.setHours(0, 0, 0, 0);
      
      return donationDate.getTime() === filterDate.getTime();
    });

    setFilteredDonors(filtered);
  };

  // Reset filter
  const resetFilter = () => {
    setSelectedDate('');
    setFilteredDonors(donors);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      localStorage.removeItem("adminData");
      navigate("/");
    }
  };

  // Toggle filter section
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
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
          <Navbar.Brand className="me-0">Donation</Navbar.Brand>
          <Button
            variant="link"
            className="text-dark border-0 p-0"
            onClick={toggleFilters}
          >
            <FaFilter size={20} color={showFilters ? "#2a7d8c" : "#212529"} />
          </Button>
        </Container>
      </Navbar>

      {/* Sidebar */}
      <Offcanvas show={showSidebar} onHide={handleCloseSidebar}>
        <Offcanvas.Header closeButton className="border-bottom">
          <div className="d-flex align-items-center">
            <img src={logo} alt="Temple Logo" className="img-fluid me-2" style={{ maxHeight: "40px" }} />
            <span className="fw-bold">karumalaikandhavelarthirukovil</span>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className="p-0">
          <Nav className="flex-column">
            <Nav.Link href="#" className="py-3 px-3 d-flex align-items-center" onClick={() => navigate('/home')}>
              <FaHome size={20} color="#0d6efd" className='me-2' />
              Home
            </Nav.Link>
            <Nav.Link href="#" className="py-3 px-3 d-flex align-items-center" onClick={() => navigate('/donationlist')}>
              <FaDonate size={20} color="#0d6efd" className='me-2' />
              Donation
            </Nav.Link>
          </Nav>
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
        </Offcanvas.Body>
      </Offcanvas>

      {/* Date Filter Section */}
      {showFilters && (
        <Container className="py-3 border-bottom" style={{marginTop:'70px'}}>
          <Form>
            <Row className="mb-3">
              <Col>
                <Form.Group>
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control 
                    type="date" 
                    value={selectedDate} 
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" size="sm" className="me-2" onClick={resetFilter}>
                Reset
              </Button>
              <Button variant="" size="sm" style={{backgroundColor: "#2a7d8c", color: "white"}} onClick={applyDateFilter}>
                Apply Filter
              </Button>
            </div>
          </Form>
        </Container>
      )}

      {/* Donation List Section */}
      <Container className="donation-list">
        <h2 className="mb-3">Donation List</h2>

        {/* Loading Spinner */}
        {loading && <Spinner animation="border" variant="primary" />}

        {/* Error Message */}
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Filter Results Summary */}
        {!loading && !error && selectedDate && (
          <p className="text-muted mb-3">
            Showing donations for {new Date(selectedDate).toLocaleDateString()}
            ({filteredDonors.length} results)
          </p>
        )}

        {/* Donation List */}
        {!loading && !error && (
          <>
            {filteredDonors.length === 0 ? (
              <Alert variant="info">No donations found for the selected date.</Alert>
            ) : (
              <ListGroup>
                {filteredDonors.map((donor, index) => (
                  <ListGroup.Item key={index} className="p-3 border-bottom d-flex justify-content-between align-items-center w-100">
                    <div className='d-flex justify-content-between w-100'>
                      <div className='row'>
                        <h5 className="col-12 mb-1 text-left">{donor.name}</h5>
                        <p className="col-12 mb-1 text-left">
                          {donor.createdAt
                            ? new Date(donor.createdAt).toLocaleString('en-IN', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })
                            : 'Date'}
                        </p>
                      </div>
                      <div className='row'>
                        <p className="col-12 mb-1 text-end">{donor.phone}</p>
                        <p className="col-12 mb-0 text-success fw-bold text-end">${donor.amount}</p>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </>
        )}
      </Container>

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
    </>
  );
};

export default DonationList;