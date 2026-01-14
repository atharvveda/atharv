"use client";
import React from "react";

interface EnquiryFormSideProps {
    disease: string;
}

const EnquiryFormSide = ({ disease }: EnquiryFormSideProps) => {
    return (
        <div className="p-4 bg-white rounded shadow" style={{ maxWidth: "400px", margin: "auto" }}>
            <form action="https://nocodeform.io/f/68ffa5a79ecb162aca874c37" method="POST">
                <div className="mb-3">
                    <input type="text" name="name" className="form-control" placeholder="Full Name" required />
                </div>
                <div className="mb-3">
                    <input type="text" name="phone" className="form-control" placeholder="Enter 10 Digit Mobile No" maxLength={10} required />
                </div>
                <div className="mb-3">
                    <input type="email" name="email" className="form-control" placeholder="Email" required />
                </div>
                <div className="mb-3">
                    <input type="text" name="subject" className="form-control" value={disease} readOnly style={{ background: "#f5f5f5", fontWeight: 600 }} />
                </div>
                <div className="mb-3">
                    <textarea name="message" className="form-control" rows={2} placeholder="Describe Your Symptoms Here" required></textarea>
                </div>
                <div className="text-center mb-2">
                    <span style={{ color: "#00695c", fontSize: "1.25rem", fontWeight: 700 }}>Get Best Ayurvedic Treatment</span>
                </div>
                <div className="d-grid">
                    <button type="submit" className="btn btn-warning text-white" style={{ fontSize: "1.2rem", fontWeight: 600, background: "#ff5722", border: "none" }}>Enquire Now</button>
                </div>
            </form>
        </div>
    );
};

export default EnquiryFormSide;
