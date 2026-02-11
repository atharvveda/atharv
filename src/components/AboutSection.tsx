"use client";
import React from "react";
import Link from "next/link";
import NextImage from "next/image";

const AboutSection = () => {
    return (
        <div className="ayur-bgcover ayur-about-sec">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12 col-sm-12">
                        <div className="ayur-about-img">
                            <NextImage
                                src="/assets/images/about-img.png"
                                alt="Atharv Veda Expertise"
                                width={500}
                                height={500}
                                style={{ width: '100%', height: 'auto' }}
                            />
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
                            <p style={{ fontWeight: 600, color: "#2e7d32" }}>
                                Atharv Veda is a specialized Ayurvedic clinic focused on the management of Chronic Kidney Disease (CKD) and lifestyle disorders.
                            </p>
                            <p>
                                Dedicated to helping you achieve wellness through time-tested natural remedies.
                                With a global reach and US-based support, our expert doctors design condition-specific healing plans
                                that work with your body - not against it.
                            </p>
                            <Link href="/about" className="ayur-btn">More About Us</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ayur-bgshape ayur-about-bgshape">
                <NextImage src="/assets/images/bg-shape2.png" alt="" width={200} height={200} style={{ width: 'auto', height: 'auto' }} />
                <NextImage src="/assets/images/bg-leaf2.png" alt="" width={100} height={100} style={{ width: 'auto', height: 'auto' }} />
            </div>
        </div>
    );
};

export default AboutSection;
