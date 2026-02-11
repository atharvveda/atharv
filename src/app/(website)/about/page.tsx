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
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-about-img">
                                <img src="/assets/images/about-img.png" alt="Atharvveda Ayurveda Clinic" />
                                <div className="ayur-about-exp">
                                    <p>10+</p>
                                    <p>Years of Experience</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap ayur-about-head">
                                <h5>Who We Are</h5>
                                <h3>Embracing Authentic Ayurveda for a Healthier Tomorrow</h3>
                                <p>
                                    Atharvveda is a trusted Ayurvedic healthcare platform dedicated to
                                    restoring balance, vitality, and long-term wellness through the
                                    timeless science of Ayurveda. We believe true healing begins by
                                    understanding the root cause of disease rather than merely
                                    suppressing symptoms.
                                    <br /><br />
                                    Our approach integrates classical Ayurvedic principles with
                                    modern diagnostic understanding, offering personalized treatment
                                    plans that align with your body constitution (Prakriti) and
                                    lifestyle. From chronic illnesses to preventive healthcare, we
                                    focus on sustainable and natural healing.
                                    <br /><br />
                                    Led by <strong>Dr. Rahul Sharma (B.A.M.S., M.D. Ayurveda)</strong>,
                                    a highly experienced Ayurvedic physician with over a decade of
                                    clinical expertise, Atharvveda specializes in the management of
                                    chronic kidney diseases, autoimmune disorders, metabolic
                                    conditions, and lifestyle-related ailments.
                                    <br /><br />
                                    Our team of qualified Ayurvedic doctors and therapists is deeply
                                    committed to delivering ethical, evidence-based, and
                                    patient-centric care. Whether you seek online Ayurvedic
                                    consultation or long-term treatment guidance, Atharvveda is your
                                    partner in holistic well-being.
                                </p>
                                <Link href="/about" className="ayur-btn">
                                    Know More About Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ayur-bgshape ayur-about-bgshape">
                    <img src="/assets/images/bg-shape2.png" alt="background shape" />
                </div>
            </div>

            {/* Why Choose Us Section */}
            <div className="ayur-bgcover ayur-inner-whychoose">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap ayur-about-head">
                                <h5>Why Choose Us</h5>
                                <h3>Nature’s Wisdom Backed by Clinical Expertise</h3>

                                <p>
                                    Choosing the right Ayurvedic care is essential for long-term
                                    results. At Atharvveda, we combine traditional Ayurvedic wisdom
                                    with years of hands-on clinical practice to ensure safe,
                                    effective, and customized treatment solutions.
                                </p>

                                <div className="ayur-whycho-boxwrapper">
                                    {[
                                        {
                                            title: "Personalized Ayurvedic Care",
                                            desc: "Each treatment plan is uniquely designed after a detailed assessment of body constitution, medical history, and lifestyle factors."
                                        },
                                        {
                                            title: "Experienced Ayurvedic Doctors",
                                            desc: "Our consultations are led by highly qualified practitioners with extensive experience in treating chronic and complex health conditions."
                                        },
                                        {
                                            title: "Root-Cause Based Healing",
                                            desc: "Instead of temporary relief, we focus on correcting the underlying imbalances responsible for disease."
                                        },
                                        { 
                                            title: "Online & Accessible Consultations",
                                            desc: "Our secure online consultation services allow patients worldwide to access authentic Ayurvedic care from home."
                                        }
                                    ].map((item, index) => (
                                        <div className="ayur-whycho-box" key={index}>
                                            <div className="ayur-whycho-boximg">
                                                <img src="/assets/images/checkmark.png" alt="Ayurveda benefits" />
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
                                <img src="/assets/images/why-choose.png" alt="Why choose Atharvveda Ayurveda" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ayur-bgshape ayur-about-bgshape">
                    <img src="/assets/images/bg-leaf2.png" alt="leaf background" />
                </div>
            </div>

            {/* Mission & Vision Section */}
            <div className="ayur-bgcover ayur-why-sec ayur-why-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap ayur-why-head">
                                <h5>Our Motto</h5>
                                <h3>The Core Beliefs of Atharvveda</h3>
                                <p>
                                    At Atharvveda, our philosophy is deeply rooted in the classical
                                    teachings of Ayurveda — promoting harmony between body, mind,
                                    and soul for complete health.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="row align-items-center">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-why-secbox justify-content-center">
                                <div className="ayur-why-box">
                                    <div className="ayur-why-boxicon">
                                        <img src="/assets/images/why-icon1.png" alt="Our mission" />
                                    </div>
                                    <div className="ayur-why-boxtext">
                                        <h4>Our Mission</h4>
                                        <p>
                                            To empower individuals through authentic Ayurvedic
                                            knowledge, personalized treatment, and preventive
                                            healthcare practices that foster long-term wellness and
                                            self-healing.
                                        </p>
                                    </div>
                                </div>

                                <div className="ayur-why-box">
                                    <div className="ayur-why-boxicon">
                                        <img src="/assets/images/why-icon2.png" alt="Our vision" />
                                    </div>
                                    <div className="ayur-why-boxtext">
                                        <h4>Our Vision</h4>
                                        <p>
                                            To become a globally trusted Ayurvedic healthcare brand,
                                            bridging ancient healing wisdom with modern healthcare
                                            needs through ethical and evidence-based practice.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="ayur-bgshape ayur-why-bgshape">
                    <img src="/assets/images/bg-shape4.png" alt="decorative shape" />
                    <img src="/assets/images/bg-leaf4.png" alt="decorative leaf" />
                </div>
            </div>
        </main>
    );
}
