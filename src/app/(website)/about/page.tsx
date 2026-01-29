import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";

export default function About() {
    return (
        <main>
            <Breadcrumb title="About Us" />

            {/* About Section */}
            <div className="ayur-bgcover ayur-about-sec ayur-inner-about">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-about-img">
                                <img src="/assets/images/about-img.png" alt="img" />
                                <div className="ayur-about-exp">
                                    <p>10</p>
                                    <p>Years of Experience</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap ayur-about-head">
                                <h5>Who We Are</h5>
                                <h3>Embracing Ayurveda for a Healthier Tomorrow</h3>
                                <p>
                                    At Atharvveda, we believe in the timeless wisdom of Ayurveda to
                                    guide individuals toward a balanced and healthy lifestyle. Our
                                    mission is to provide personalized Ayurvedic consultations and
                                    remedies that address the root causes of health issues,
                                    fostering holistic well-being.
                                    <br />
                                    <br />
                                    Led by <strong>Dr. Rahul Sharma (B.A.M.S., M.D. Ayurveda)</strong>, a renowned specialist with over 10 years of clinical experience in treating chronic kidney diseases and autoimmune disorders. Our team of dedicated Ayurvedic practitioners is committed to reviving traditional healing practices for modern
                                    health challenges. With a focus on individualized care, we offer
                                    consultations for various health concerns, ensuring each patient
                                    receives tailored guidance backed by professional expertise.
                                </p>
                                <Link href="/about" className="ayur-btn">Know More</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ayur-bgshape ayur-about-bgshape">
                    <img src="/assets/images/bg-shape2.png" alt="img" />
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="ayur-bgcover ayur-inner-whychoose">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap ayur-about-head">
                                <h5>Why Choose Us</h5>
                                <h3>Nature's secret for your truly health</h3>
                                <div className="ayur-whycho-boxwrapper">
                                    {[
                                        { title: "Personalized Care", desc: "We understand that each individual's health journey is unique, and we tailor our consultations accordingly." },
                                        { title: "Experienced Practitioners", desc: "Our team comprises seasoned Ayurvedic doctors with extensive knowledge and practice." },
                                        { title: "Holistic Approach", desc: "We address the root causes of ailments, not just the symptoms, promoting overall wellness." },
                                        { title: "Accessible Services", desc: "Our online consultation platform ensures you can access our services from the comfort of your home." }
                                    ].map((item, index) => (
                                        <div className="ayur-whycho-box" key={index}>
                                            <div className="ayur-whycho-boximg">
                                                <img src="/assets/images/checkmark.png" alt="checkmark" />
                                            </div>
                                            <div className="ayur-whycho-boxtext">
                                                <h3>{item.title}</h3>
                                                <p>{item.desc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-about-img">
                                <img src="/assets/images/why-choose.png" alt="img" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ayur-bgshape ayur-about-bgshape">
                    <img src="/assets/images/bg-leaf2.png" alt="img" />
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="ayur-bgcover ayur-why-sec ayur-why-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap ayur-why-head">
                                <h5>Our Motto</h5>
                                <h3>Beliefs of Atharv Veda</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-why-secbox justify-content-center">
                                <div className="ayur-why-box">
                                    <div className="ayur-why-boxicon">
                                        <img src="/assets/images/why-icon1.png" alt="icon" />
                                    </div>
                                    <div className="ayur-why-boxtext">
                                        <h4>Our Mission</h4>
                                        <p>
                                            To empower individuals with the knowledge and tools of
                                            Ayurveda, enabling them to take charge of their health and
                                            lead balanced lives.
                                        </p>
                                    </div>
                                </div>
                                <div className="ayur-why-box">
                                    <div className="ayur-why-boxicon">
                                        <img src="/assets/images/why-icon2.png" alt="icon" />
                                    </div>
                                    <div className="ayur-why-boxtext">
                                        <h4>Our Vision</h4>
                                        <p>
                                            To be a global leader in Ayurvedic healthcare, bridging
                                            traditional wisdom with contemporary needs.
                                        </p>
                                    </div>
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
        </main>
    );
}
