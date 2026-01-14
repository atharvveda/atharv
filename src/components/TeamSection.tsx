"use client";
import React from "react";

const TeamSection = () => {
    const doctors = [
        { name: "Dr. Rahul Sharma", specialty: "Kidney", year: "2015", img: "team-1.png" },
        { name: "Dr. Anjali Arora", specialty: "Diabetes", year: "2008", img: "team-2.png" },
        { name: "Dr. Robert Fox", specialty: "Cancer", year: "2004", img: "team-3.png" },
        { name: "Dr. Jenny Wilson", specialty: "PCOD", year: "2021", img: "team-4.png" }
    ];

    return (
        <div className="ayur-bgcover ayur-team-sec">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap">
                            <h5>Meet Our Doctors</h5>
                            <h3>Your Health, In Trusted Hands</h3>
                            <p>A panel of expert Ayurvedic physicians ready to guide your healing.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    {doctors.map((doc, index) => (
                        <div className="col-lg-3 col-md-6 col-sm-6" key={index}>
                            <div className="ayur-team-box">
                                <div className="ayur-team-img-wrapper">
                                    <div className="ayur-team-img">
                                        <img src={`/assets/images/${doc.img}`} alt={doc.name} />
                                    </div>
                                    <div className="ayur-team-hoverimg">
                                        <div className="ayur-team-hoversmall">
                                            <img src={`/assets/images/${doc.img}`} alt={doc.name} />
                                        </div>
                                        <p>special</p>
                                        <div className="ayur-team-sociallink">
                                            {/* Social links (SVGs omitted for brevity in thought, but included in implementation) */}
                                            <a href="#"><i className="fa fa-facebook"></i></a>
                                            <a href="#"><i className="fa fa-twitter"></i></a>
                                            <a href="#"><i className="fa fa-pinterest"></i></a>
                                            <a href="#"><i className="fa fa-instagram"></i></a>
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
            <div className="ayur-bgshape ayur-team-bgshape">
                <img src="/assets/images/bg-shape5.png" alt="img" />
                <img src="/assets/images/bg-leaf5.png" alt="img" />
            </div>
        </div>
    );
};

export default TeamSection;
