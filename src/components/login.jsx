import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import murugan from "../assets/logomurugan.jpg";
import axios from 'axios';
import baseurl from '../apiservice/api';

// Landing Page with Two Login Options
const LoginOptions = () => {
    const navigate = useNavigate();

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body text-center">
                            <img
                                src={murugan}
                                alt="Logo"
                                className="rounded-circle shadow-sm mb-4"
                                style={{
                                    width: '150px',
                                    height: '150px',
                                    objectFit: 'cover'
                                }}
                            />
                            <h2 className="text-primary mt-2">Karumazhai Kandhan</h2>
                            <h2 className="mb-4">Choose Login Type</h2>
                            <div className="d-grid gap-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate('/admin-login')}
                                >
                                    Login as Admin
                                </button>
                                <button
                                    className="btn btn-success"
                                    onClick={() => navigate('/donate')}
                                >
                                    Continue as Guest For Donation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
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

// Admin Login Component
const AdminLogin = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};

        if (!loginData.username.trim()) {
            newErrors.username = "Username is required";
        }

        if (!loginData.password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post(
                    `${baseurl}/api/login/adminlogin`,
                    loginData,
                    { headers: { "Content-Type": "application/json" } }
                );

                if (response.data.success) {
                    localStorage.setItem('adminData', JSON.stringify(response.data.user));
                    navigate('/donationlist');
                }
            } catch (error) {
                console.error("Donation submission error:", error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: value
        }));

        if (errors[name]) {
            const newErrors = { ...errors };
            delete newErrors[name];
            setErrors(newErrors);
        }
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <div className="text-center mb-4">
                                <img
                                    src={murugan}
                                    alt="Admin Login"
                                    className="rounded-circle shadow-sm"
                                    style={{
                                        width: '150px',
                                        height: '150px',
                                        objectFit: 'cover'
                                    }}
                                />
                                <h2 className="text-primary mt-2">Karumazhai Kandhan</h2>
                                <h2 className="mt-3">Admin Login</h2>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        name="username"
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                        value={loginData.username}
                                        onChange={handleInputChange}
                                    />
                                    {errors.username && (
                                        <div className="invalid-feedback">
                                            {errors.username}
                                        </div>
                                    )}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                                        value={loginData.password}
                                        onChange={handleInputChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">
                                            {errors.password}
                                        </div>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success w-100"
                                >
                                    Login
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
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

export { LoginOptions, AdminLogin };