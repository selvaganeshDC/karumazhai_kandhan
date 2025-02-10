import React, { useState, useEffect } from 'react';
import axios from 'axios';
import baseurl from '../apiservice/api';
import { useNavigate } from 'react-router-dom'; // For navigation
import logo from '../assets/logomurugan.jpg'; // Ensure the path to your logo is correct

const DonationList = () => {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const adminData = JSON.parse(localStorage.getItem('adminData'));
        if(!adminData){
            navigate('/');
            return ;
        }
        const fetchDonations = async () => {
            try {
                const response = await axios.get(`${baseurl}/api/donations/list`);
                setDonations(response.data.donations);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch donations');
                setLoading(false);
            }
        };

        fetchDonations();
    }, []);

    const filteredDonations = donations.filter(donation => 
        donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.place.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDonations = filteredDonations.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(filteredDonations.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    if (loading) return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    if (error) return (
        <div className="alert alert-danger text-center" role="alert">
            {error}
        </div>
    );

    return (
        <div className="container-fluid py-4">
            {/* Back Button & App Header */}
            <div className="d-flex align-items-center mb-4">
                {/* Back Arrow Button */}
                <button 
                    className="btn btn-outline-primary me-3" 
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>
            </div>
             {/* Logo and App Name */}
             <div className="text-center flex-grow-1 mb-5">
                    <img 
                        src={logo} 
                        alt="App Logo" 
                        className="rounded-circle shadow" 
                        style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                    />
                    <h2 className="text-primary mt-2">Karumazhai Kandhan</h2>
                </div>

            <div className="row mb-3">
                <div className="col-md-6">
                    <h2 className="mb-3 text-primary">Donation List</h2>
                </div>
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name or place"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-success">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Phone</th>
                            <th>Place</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDonations.map((donation, index) => (
                            <tr key={donation.id}>
                                <td>{indexOfFirstItem + index + 1}</td>
                                <td>{donation.name}</td>
                                <td>₹{donation.amount}</td>
                                <td>{donation.phone}</td>
                                <td>{donation.place}</td>
                                <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <nav className='mt-3'>
                <ul className="pagination justify-content-center">
                    {pageNumbers.map(number => (
                        <li
                            key={number}
                            className={`page-item ${currentPage === number ? 'active' : ''}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => setCurrentPage(number)}
                            >
                                {number}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bootstrap 5 CDN */}
            <link
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
                rel="stylesheet"
            />
            <script
                src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
            />
        </div>
    );
};

export default DonationList;
