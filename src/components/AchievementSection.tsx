"use client";
import React from "react";

const AchievementSection = () => {
    return (
        <div className="ayur-bgcover ayur-achievement-sec">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap ayur-heading-left">
                            <h5>Our Milestones & Impact</h5>
                            <h3>Trusted by Thousands Across the Globe</h3>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-12 col-sm-12">
                        <div className="ayur-achieve-box-wrapper">
                            <div className="ayur-achieve-box">
                                <div className="ayur-achieve-icon">
                                    <img src="/assets/images/achieve-icon1.png" alt="icon" />
                                </div>
                                <div className="ayur-achieve-text">
                                    <h2 className="ayur-counting">167,576 +</h2>
                                    <p>Patients Consulted</p>
                                </div>
                            </div>
                            <div className="ayur-achieve-box">
                                <div className="ayur-achieve-icon">
                                    <img src="/assets/images/achieve-icon2.png" alt="icon" />
                                </div>
                                <div className="ayur-achieve-text">
                                    <h2 className="ayur-counting">30 +</h2>
                                    <p>Health Conditions Treated</p>
                                </div>
                            </div>
                            <div className="ayur-achieve-box">
                                <div className="ayur-achieve-icon">
                                    <img src="/assets/images/achieve-icon3.png" alt="icon" />
                                </div>
                                <div className="ayur-achieve-text">
                                    <h2 className="ayur-counting">17 +</h2>
                                    <p>Years of Combined Expertise</p>
                                </div>
                            </div>
                            <div className="ayur-achieve-box">
                                <div className="ayur-achieve-icon">
                                    <img src="/assets/images/achieve-icon4.png" alt="icon" />
                                </div>
                                <div className="ayur-achieve-text">
                                    <h2 className="ayur-counting percent">98%</h2>
                                    <p>Satisfaction Rate</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AchievementSection;
