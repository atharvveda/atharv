"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { CircularProgress, Alert, Box } from "@mui/material";

export default function Contact() {
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

        // Map first/last name to 'name' for our API
        const data = {
            name: `${rawData.first_name} ${rawData.last_name}`.trim(),
            email: rawData.email,
            subject: rawData.subject,
            message: rawData.message
        };

        try {
            const res = await fetch('/api/enquiries', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            const result = await res.json();
            if (res.ok) {
                setStatus({ type: 'success', msg: 'Message sent! We will get back to you shortly.' });
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus({ type: 'error', msg: result.error || 'Failed to send message.' });
            }
        } catch (error) {
            setStatus({ type: 'error', msg: 'Network error. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main>
            <Breadcrumb title="Contact Us" />

            <div className="ayur-bgcover ayur-contactpage-wrapper">
                <div className="container">
                    <div className="ayur-contactpage-box">
                        <div className="ayur-contact-map">
                            <iframe 
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.21333642108!2d-74.00971940000001!3d40.713319899999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a18e02a7ccd%3A0x98f5f904c5cc9379!2s102%20Church%20St%2C%20New%20York%2C%20NY%2010007%2C%20USA!5e0!3m2!1sen!2sin!4v1776865240180!5m2!1sen!2sin" 
                                width="100%" 
                                height="450" 
                                style={{ border: 0 }} 
                                allowFullScreen 
                                loading="lazy" 
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                        <div className="ayur-contact-pageinfo">
                            <div className="ayur-contact-heading">
                                <h3>Get in touch with us</h3>
                                <p>
                                    Have questions about Ayurvedic treatment? Our team is here to help you understand how we can support your health journey.
                                </p>
                                <div className="mt-4">
                                    <h5 className="font-weight-bold" style={{ color: "#00695c" }}>Our Location</h5>
                                    <p className="mb-0">102 Church St</p>
                                    <p>New York, NY 10007, USA</p>
                                </div>
                            </div>
                            <div className="ayur-contact-form-wrapper">
                                {status && <Alert severity={status.type} sx={{ mb: 3 }}>{status.msg}</Alert>}
                                <form onSubmit={handleSubmit} className="ayur-contact-form">
                                    <div className="row">
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="ayur-form-input">
                                                <input type="text" name="first_name" className="form-control" placeholder="First Name" required disabled={loading} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="ayur-form-input">
                                                <input type="text" name="last_name" className="form-control" placeholder="Last Name" required disabled={loading} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="ayur-form-input">
                                                <input type="email" name="email" className="form-control" placeholder="Your Email" required disabled={loading} />
                                            </div>
                                        </div>
                                        <div className="col-lg-6 col-md-6 col-sm-6">
                                            <div className="ayur-form-input">
                                                <input type="text" name="subject" className="form-control" placeholder="Subject" required disabled={loading} />
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <div className="ayur-form-input">
                                                <textarea name="message" cols={3} rows={8} className="form-control" placeholder="Your Message..." required disabled={loading}></textarea>
                                            </div>
                                        </div>
                                        <div className="col-lg-12 col-md-12">
                                            <button type="submit" className="ayur-btn ayur-con-btn" disabled={loading} style={{ position: 'relative' }}>
                                                {loading ? <CircularProgress size={24} color="inherit" /> : 'Send Message'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
