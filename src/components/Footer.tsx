"use client";
import React from "react";
import Link from "next/link";
import NextImage from "next/image";

const Footer = () => {
    return (
        <div className="ayur-footer-section">
            <div className="container">
                <div className="ayur-sign-sec">
                    <div className="row align-items-center">
                        <div className="col-lg-4 col-md-4 col-sm-12">
                            <div className="ayur-sign-head">
                                <h3>Get Ayurvedic wellness tips in your inbox...</h3>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <form action="https://nocodeform.io/f/68ffa5a79ecb162aca874c37" method="POST" className="ayur-subscribe-sec">
                                <div className="ayur-form-input">
                                    <input type="email" className="form-control" placeholder="Enter Your Email..." name="email" required />
                                </div>
                                <div className="ayur-form-btn">
                                    <button type="submit" className="ayur-btn">Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="ayur-footer-sec">
                    <div className="row">
                        <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="ayur-footer-logosec">
                                <div className="ayur-footer-logo">
                                    <NextImage
                                        src="/assets/images/New-Logo.png"
                                        alt="Atharv Veda Logo"
                                        width={160}
                                        height={50}
                                        style={{ height: 'auto', width: 'auto' }}
                                    />
                                </div>
                                <p>Discover the essence of Ayurveda with Atharv Veda. Your journey to holistic health and well-being starts here.</p>
                                <ul className="ayur-social-link">
                                    {/* Facebook */}
                                    <li>
                                        <a href="https://www.facebook.com/atharvvedaa" target="_blank" rel="noopener noreferrer">
                                            <svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M6.74157 20V10.8777H9.80231L10.2615 7.32156H6.74157V5.05147C6.74157 4.0222 7.02622 3.32076 8.50386 3.32076L10.3854 3.31999V0.13923C10.06 0.0969453 8.94308 0 7.64308 0C4.92848 0 3.07002 1.65697 3.07002 4.69927V7.32156H0V10.8777H3.07002V20H6.74157Z" fill="#E4D4CF" />
                                            </svg>
                                        </a>
                                    </li>

                                    {/* X (Twitter) */}
                                    <li>
                                        <a href="https://x.com/Atharv_veda" target="_blank" rel="noopener noreferrer">
                                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M11.8138 8.46864L19.0991 0H17.3727L11.0469 7.3532L5.9944 0H0.166992L7.8073 11.1193L0.166992 20H1.89349L8.57377 12.2348L13.9095 20H19.7369L11.8133 8.46864H11.8138Z" fill="#E4D4CF" />
                                            </svg>
                                        </a>
                                    </li>

                                    {/* Instagram */}
                                    <li>
                                        <a href="https://www.instagram.com/atharv_veda/" target="_blank" rel="noopener noreferrer">
                                            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.4996 0H5.49988C2.75019 0 0.5 2.25019 0.5 4.99988V15.0001C0.5 17.7491 2.75019 20 5.49988 20H15.4996C18.2493 20 20.4995 17.7491 20.4995 15.0001V4.99988C20.4995 2.25019 18.2493 0 15.4996 0Z" fill="#E4D4CF" />
                                                <path d="M10.4999 5C7.73793 5 5.5 7.23818 5.5 9.99988C5.5 12.7606 7.73793 15.0002 10.4999 15.0002C13.261 15.0002 15.4998 12.7606 15.4998 9.99988C15.4998 7.23818 13.261 5 10.4999 5Z" fill="#E4D4CF" />
                                            </svg>
                                        </a>
                                    </li>

                                    {/* LinkedIn */}
                                    <li>
                                        <a href="https://www.linkedin.com/in/atharv-veda-b636163a6/" target="_blank" rel="noopener noreferrer">
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="#E4D4CF" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M22.23 0H1.77C.79 0 0 .774 0 1.727V22.27C0 23.227.79 24 1.77 24H22.23C23.21 24 24 23.227 24 22.27V1.727C24 .774 23.21 0 22.23 0ZM7.12 20.452H3.56V9H7.12V20.452ZM5.34 7.433C4.21 7.433 3.29 6.51 3.29 5.38C3.29 4.25 4.21 3.33 5.34 3.33C6.47 3.33 7.39 4.25 7.39 5.38C7.39 6.51 6.47 7.433 5.34 7.433ZM20.45 20.452H16.89V14.86C16.89 13.53 16.86 11.82 15.04 11.82C13.19 11.82 12.91 13.29 12.91 14.76V20.452H9.35V9H12.77V10.56H12.82C13.3 9.66 14.47 8.71 16.2 8.71C19.8 8.71 20.45 11.08 20.45 14.17V20.452Z" />
                                            </svg>
                                        </a>
                                    </li>
                                </ul>

                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="ayur-footer-box">
                                <h4>Quick Links</h4>
                                <ul className="ayur-links">
                                    <li><Link href="/">Home</Link></li>
                                    <li><Link href="/about">About</Link></li>
                                    <li><Link href="/diseases/kidney">Health Concerns</Link></li>
                                    <li><Link href="/blog">Blog</Link></li>
                                    <li><Link href="/contact">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-2 col-md-6 col-sm-6">
                            <div className="ayur-footer-box">
                                <h4>Consultation</h4>
                                <ul className="ayur-links">
                                    <li><Link href="/contact">Book Now</Link></li>
                                    <li><Link href="/contact">Process</Link></li>
                                    <li><Link href="/about">Doctors</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-6">
                            <div className="ayur-social-list">
                                {/* Social links to be added when available */}
                            </div>
                            <div className="ayur-footer-box">
                                <h4>Connect with Us</h4>
                                <ul className="ayur-contact-list">
                                    <li className="ayur-contact-box">
                                        <img src="/assets/images/email.png" alt="icon" />
                                        <p>support@atharvveda.us</p>
                                    </li>
                                    <li className="ayur-contact-box">
                                        <img src="/assets/images/mobile.png" alt="icon" />
                                        <p>+1 (202) 202 1159</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div className="ayur-copyright-para">
                            <p>Copyright © 2026. All Right Reserved. Atharv Veda</p>
                        </div>
                        <div className="ayur-disclaimer" style={{ marginTop: "20px", fontSize: "0.85rem", color: "#666", textAlign: "center", borderTop: "1px solid #eee", paddingTop: "15px" }}>
                            <p><strong>Medical Disclaimer:</strong> The information on this website is for educational purposes only and not intended as medical advice. Always consult with a qualified healthcare professional before starting any new treatment or making changes to your healthcare regimen. Atharv Veda does not claim to cure diseases but provides supportive Ayurvedic care.</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ayur-bgshape ayur-footer-bgshape">
                <img src="/assets/images/footer-left.png" alt="img" />
                <img src="/assets/images/footer-right.png" alt="img" />
            </div>
        </div>
    );
};

export default Footer;
