"use client";
import React, { useState } from "react";
import { CircularProgress, Alert, Box } from "@mui/material";

const EnquiryForm = () => {
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
                setStatus({ type: 'success', msg: 'Thank you! We will contact you soon.' });
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus({ type: 'error', msg: result.error || 'Something went wrong. Please try again.' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Failed to connect. Please check your internet.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ayur-enquire-section" style={{ background: "#071818", padding: "60px 0 40px 0" }}>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-7 col-md-12 mb-4 mb-lg-0">
                        <div className="text-white" style={{ maxWidth: "600px" }}>
                            <h2 style={{ fontSize: "2.5rem", fontWeight: 800 }}>Start Your Journey to Better Health</h2>
                            <p style={{ fontSize: "1.15rem", color: "#d7f0ec", marginTop: "12px" }}>
                                Share your details and our Ayurvedic experts will get in touch to guide you towards a personalized treatment plan.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <div className="p-4 bg-white rounded shadow" style={{ maxWidth: "400px", margin: "auto" }}>
                            {status && <Alert severity={status.type} sx={{ mb: 2 }}>{status.msg}</Alert>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <input type="text" name="name" className="form-control" placeholder="Full Name" required disabled={loading} />
                                </div>
                                <div className="mb-3">
                                    <input type="text" name="phone" className="form-control" placeholder="Enter 10 Digit Mobile No" maxLength={10} required disabled={loading} />
                                </div>
                                <div className="mb-3">
                                    <input type="email" name="email" className="form-control" placeholder="Email" required disabled={loading} />
                                </div>
                                <div className="mb-3">
                                    <select name="subject" className="form-control" required defaultValue="" style={{ background: "#f5f5f5", fontWeight: 600 }} disabled={loading}>
                                        <option value="" disabled>Choose Your Disease ▼</option>
                                        <option>Kidney</option>
                                        <option>Cancer</option>
                                        <option>Leucoderma</option>
                                        <option>Alzheimer</option>
                                        <option>Motor Neuron Disease</option>
                                        <option>Fatty Liver</option>
                                        <option>Parkinson</option>
                                        <option>Psoriasis</option>
                                        <option>PCOD / PCOS</option>
                                        <option>Erectile Dysfunction</option>
                                        <option>Eczema</option>
                                        <option>Jaundice</option>
                                        <option>Gallbladder</option>
                                        <option>Diabetes</option>
                                        <option>Arthritis</option>
                                        <option>Cerebral Palsy</option>
                                        <option>Panchkarma</option>
                                        <option>Liver Cirrhosis</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <textarea name="message" className="form-control" rows={2} placeholder="Describe Your Symptoms Here" required disabled={loading}></textarea>
                                </div>
                                <div className="text-center mb-2">
                                    <span style={{ color: "#00695c", fontSize: "1.25rem", fontWeight: 700 }}>Get Best Ayurvedic Treatment</span>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-warning text-white"
                                        style={{ fontSize: "1.2rem", fontWeight: 600, background: "#ff5722", border: "none", position: 'relative' }}
                                        disabled={loading}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Enquire Now'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EnquiryForm;
