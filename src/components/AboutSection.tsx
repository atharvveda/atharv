"use client";
import React from "react";
import Link from "next/link";

const AboutSection = () => {
    return (
        <div className="ayur-bgcover ayur-about-sec">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-about-img">
                            <img src="/assets/images/about-img.png" alt="img" />
                            <div className="ayur-about-exp">
                                <p>50+</p>
                                <p>Years of Expertise</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap ayur-about-head">
                            <h5>Who We Are</h5>
                            <h3>Science of the Ancients. Solutions for Today.</h3>
                            <p>
                                Atharvveda is a modern Ayurvedic consultation platform dedicated to helping you achieve
                                wellness through time-tested natural remedies. With a global reach and US-based support, our
                                expert doctors design condition-specific healing plans that work with your body - not
                                against it.
                            </p>
                            <Link href="/about" className="ayur-btn">Know More</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ayur-bgshape ayur-about-bgshape">
                <img src="/assets/images/bg-shape2.png" alt="img" />
                <img src="/assets/images/bg-leaf2.png" alt="img" />
            </div>
        </div>
    );
};

export default AboutSection;
