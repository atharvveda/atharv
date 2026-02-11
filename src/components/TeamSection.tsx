"use client";
import React from "react";
import NextImage from "next/image";

const TeamSection = () => {
    const doctors = [
        {
            name: "Dr. Rahul Sharma",
            specialty: "Ayurvedic Nephrology Expert",
            year: "M.D. (Ayu)",
            img: "team-1.png"
        },
        {
            name: "Dr. Anjali Arora",
            specialty: "Diabetes & Lifestyle Disorders",
            year: "B.A.M.S.",
            img: "team-2.png"
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

                                <div className="ayur-team-img-wrapper">
                                    <div className="ayur-team-img">
                                        <NextImage
                                            src={`/assets/images/${doc.img}`}
                                            alt={doc.name}
                                            width={300}
                                            height={350}
                                            style={{ width: "100%", height: "auto" }}
                                        />
                                    </div>

                                    <div className="ayur-team-hoverimg">
                                        <div className="ayur-team-hoversmall">
                                            <NextImage
                                                src={`/assets/images/${doc.img}`}
                                                alt={doc.name}
                                                width={80}
                                                height={80}
                                                style={{ width: "100%", height: "auto" }}
                                            />
                                        </div>
                                        <p>{doc.specialty}</p>
                                        <div className="ayur-team-sociallink">
                                            {/* Social links removed until real profiles are available */}
                                        </div>
                                    </div>
                                </div>

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

            {/* Background Shapes */}
            <div className="ayur-bgshape ayur-team-bgshape">
                <NextImage
                    src="/assets/images/bg-shape5.png"
                    alt="bg-shape"
                    width={200}
                    height={200}
                />
                <NextImage
                    src="/assets/images/bg-leaf5.png"
                    alt="bg-leaf"
                    width={100}
                    height={100}
                />
            </div>
        </div>
    );
};

export default TeamSection;
