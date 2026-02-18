"use client";
import React from "react";

const TeamSection = () => {
    const doctors = [
        {
            name: "Dr. Rahul Sharma",
            specialty: "Ayurvedic Nephrology Expert",
            year: "M.D. (Ayu)"
        },
        {
            name: "Dr. Anjali Arora",
            specialty: "Diabetes & Lifestyle Disorders",
            year: "B.A.M.S."
        }
    ];

    return (
        <div className="ayur-bgcover ayur-team-sec">
            <div className="container">

                {/* Heading Section */}
                <div className="row justify-content-center text-center">
                    <div className="col-lg-8">
                        <div className="ayur-heading-wrap">
                            <h5>Meet Our Doctors</h5>
                            <h3>Your Health, In Trusted Hands</h3>
                            <p>
                                A panel of expert Ayurvedic physicians ready to guide your healing.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Doctors Section */}
                <div className="row justify-content-center mt-4">
                    {doctors.map((doc, index) => (
                        <div
                            className="col-lg-4 col-md-6 col-sm-8 mb-4 d-flex justify-content-center"
                            key={index}
                        >
                            <div className="ayur-team-box w-100 text-center">
                                <div className="ayur-team-name">
                                    <h3>{doc.name}</h3>
                                    <p>{doc.specialty}</p>
                                    <p>{doc.year}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default TeamSection;
