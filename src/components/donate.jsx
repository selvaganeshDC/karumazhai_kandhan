import React, { useState } from "react";
import axios from "axios";
import baseurl from "../apiservice/api";
import murugan from "../assets/logomurugan.jpg";

const Donate = () => {
    const [formData, setFormData] = useState({
        name: "",
        amount: "",
        phone: "",
        place: "",
        address: ""
    });
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const validateForm = () => {
        const newErrors = {};

        // Name validation
        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
        } else if (formData.name.trim().length < 2) {
            newErrors.name = "Name must be at least 2 characters";
        } else if (!/^[A-Za-z\s]+$/.test(formData.name)) {
            newErrors.name = "Name must contain only letters";
        }

        // Amount validation
        if (!formData.amount) {
            newErrors.amount = "Donation amount is required";
        } else if (parseFloat(formData.amount) < 1) {
            newErrors.amount = "Amount must be at least 1";
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
            newErrors.phone = "Invalid 10-digit mobile number";
        }

        // Place validation
        if (!formData.place.trim()) {
            newErrors.place = "Place is required";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validateForm()) {
            try {
                const response = await axios.post(
                    `${baseurl}/api/donations/donate`,
                    formData,
                    { headers: { "Content-Type": "application/json" } }
                );

                if (response.data.success) {
                    setSubmitted(true);
                }
            } catch (error) {
                console.error("Donation submission error:", error);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear specific field error on change
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
                            {submitted ? (
                                <div className="d-flex flex-column align-items-center justify-content-center">
                                    <div className="text-center">
                                        <h2 className="display-4 text-success mb-4">
                                            Thank You for Your Donation!
                                        </h2>
                                    </div>
                                </div>
                            ) : (

                                <div className="text-center">
                                    <div className="text-center mb-4">
                                        <img
                                            src={murugan}
                                            alt="Donation Logo"
                                            className="rounded-circle shadow-sm"
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                                            <h2 className="text-primary mt-2">Karumazhai Kandhan</h2>
                                    </div>
                                    <h2 className="mb-4">Donate Now</h2>
                                </div>
                            )}

                            {!submitted && (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name</label>
                                        <input
                                            type="text"
                                            name="name"
                                            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                        {errors.name && (
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Donation Amount</label>
                                        <div className="input-group">
                                            <span className="input-group-text">₹</span>
                                            <input
                                                type="number"
                                                name="amount"
                                                className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                                value={formData.amount}
                                                onChange={handleInputChange}
                                            />
                                            {errors.amount && (
                                                <div className="invalid-feedback">
                                                    {errors.amount}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Phone Number</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                        />
                                        {errors.phone && (
                                            <div className="invalid-feedback">
                                                {errors.phone}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Place</label>
                                        <input
                                            type="text"
                                            name="place"
                                            className={`form-control ${errors.place ? 'is-invalid' : ''}`}
                                            value={formData.place}
                                            onChange={handleInputChange}
                                        />
                                        {errors.place && (
                                            <div className="invalid-feedback">
                                                {errors.place}
                                            </div>
                                        )}
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Address (Optional)</label>
                                        <textarea
                                            name="address"
                                            className="form-control"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary w-100"
                                    >
                                        Submit Donation
                                    </button>
                                </form>
                            )}
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

export default Donate;