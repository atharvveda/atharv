"use client";

import React, { useState } from "react";

const WhySection = () => {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <div className="ayur-bgcover ayur-why-sec">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap ayur-why-head">
                            <h5>How Atharvveda Works</h5>
                            <h3>Why Atharv Veda</h3>
                        </div>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="ayur-why-secbox">
                            {[
                                { title: "Experienced Ayurvedic Doctors", desc: "Every consultation is handled by seasoned practitioners with proven results.", icon: "why-icon1.png" },
                                { title: "Root-Cause Healing, Not Just Symptom Relief", desc: "We design holistic plans that address your lifestyle, diet, and doshic balance.", icon: "why-icon2.png" },
                                { title: "Online, Personalized & Private", desc: "Book consultations from home with complete confidentiality and continuous support.", icon: "why-icon3.png" },
                                { title: "Health Care", desc: "Experience holistic care with a focus on natural remedies and personalized solutions.", icon: "why-icon4.png" }
                            ].map((item, index) => (
                                <div className="ayur-why-box" key={index}>
                                    <div className="ayur-why-boxicon">
                                        <img src={`/assets/images/${item.icon}`} alt="icon" />
                                    </div>
                                    <div className="ayur-why-boxtext">
                                        <h4>{item.title}</h4>
                                        <p>{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="ayur-video-section">
                            <div className="ayur-video-img">
                                <img src="/assets/images/video-bg.png" alt="img" />
                                <button className="ayur-video-playicon" onClick={() => setIsVideoOpen(true)} style={{ border: "none", background: "none" }}>
                                    <img src="/assets/images/play-icon.svg" alt="icon" />
                                </button>
                                {isVideoOpen && (
                                    <div id="videoPopup1" className="ayur-popup" style={{ display: "block" }}>
                                        <div className="ayur-popup-content">
                                            <span className="close" onClick={() => setIsVideoOpen(false)}>×</span>
                                            <iframe src="https://www.youtube.com/embed/hJTmi9euoNg?autoplay=1" frameBorder="0" allowFullScreen></iframe>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ayur-bgshape ayur-why-bgshape">
                <img src="/assets/images/bg-shape4.png" alt="img" />
                <img src="/assets/images/bg-leaf4.png" alt="img" />
            </div>
        </div>
    );
};

export default WhySection;
