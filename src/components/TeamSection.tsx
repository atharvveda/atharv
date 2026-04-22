"use client";
import React from "react";
import Image from "next/image";

const TeamSection = () => {
    const doctors = [
        {
            name: "Dr. Rahul Sharma",
            specialty: "Ayurvedic Nephrology Expert",
            year: "M.D. (Ayu)",
            image: "/doctorpic/dr-rahul-sharma.jpeg"
        },
        {
            name: "Dr. Ravi",
            specialty: "Dietician",
            year: "",
            image: null
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
                            <div className="ayur-team-box w-100 text-center h-100 d-flex flex-column justify-content-center py-4">
                                {doc.image ? (
                                    <div className="ayur-team-img mb-3" style={{ width: '150px', height: '150px', margin: '0 auto', overflow: 'hidden', borderRadius: '50%' }}>
                                        <Image src={doc.image} alt={doc.name} width={150} height={150} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                    </div>
                                ) : (
                                    <div className="ayur-team-img mb-3 d-flex align-items-center justify-content-center" style={{ width: '150px', height: '150px', margin: '0 auto', overflow: 'hidden', borderRadius: '50%', background: '#f4fbf9', color: '#00695c', border: '1px solid rgba(0,105,92,0.1)' }}>
                                        <svg width="60" height="60" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                        </svg>
                                    </div>
                                )}
                                <div className="ayur-team-name mt-auto">
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
