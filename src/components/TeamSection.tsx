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
                            <div className="ayur-team-box w-100 text-center">
                                {doc.image && (
                                    <div className="ayur-team-img mb-3" style={{ width: '150px', height: '150px', margin: '0 auto', overflow: 'hidden', borderRadius: '50%' }}>
                                        <Image src={doc.image} alt={doc.name} width={150} height={150} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                    </div>
                                )}
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
