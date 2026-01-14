import React from "react";
import Breadcrumb from "@/components/Breadcrumb";

export default function ServicesPage() {
    return (
        <main>
            <Breadcrumb title="Services" />

            {/* Why Section */}
            <div className="ayur-bgcover ayur-why-sec ayur-why-singleser">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap ayur-why-head">
                                <h5>Best For You</h5>
                                <h3>Why Atharv Veda</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-why-secbox">
                                {[
                                    { icon: "why-icon1.png", title: "100 % Organic", desc: "Purely natural and organic Ayurvedic remedies." },
                                    { icon: "why-icon2.png", title: "Best Quality", desc: "Highest standards of quality in every treatment." },
                                    { icon: "why-icon3.png", title: "Hygienic Product", desc: "Safe and hygienic preparation of all medicines." },
                                    { icon: "why-icon4.png", title: "Health Care", desc: "Comprehensive care for your well-being." },
                                ].map((item, index) => (
                                    <div className="ayur-why-box" key={index}>
                                        <div className="ayur-why-boxicon">
                                            <img src={`/assets/images/${item.icon}`} alt="icon" />
                                        </div>
                                        <div className="ayur-why-boxtext">
                                            <h4>{item.title}</h4>
                                            <p>{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12">
                            <div className="ayur-why-textheading">
                                <h3>Solve Your Problem with The Power of Nature</h3>
                                <p>
                                    Discover the ancient wisdom of Ayurveda combined with modern clinical excellence. We focus on treating the root cause of diseases through natural therapies and personalized care.
                                </p>
                                <ul>
                                    <li>
                                        <img src="/assets/images/tick.png" alt="icon" />
                                        <p>Personalized Consultation</p>
                                    </li>
                                    <li>
                                        <img src="/assets/images/tick.png" alt="icon" />
                                        <p>Natural Detoxification</p>
                                    </li>
                                    <li>
                                        <img src="/assets/images/tick.png" alt="icon" />
                                        <p>Herbal Remedies</p>
                                    </li>
                                    <li>
                                        <img src="/assets/images/tick.png" alt="icon" />
                                        <p>Holistic Well-being</p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pricing Section */}
            <div className="ayur-bgcover ayur-pricinplan-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap ayur-trenproduct-head">
                                <h5>Pricing Plan</h5>
                                <h3>Special Plan</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        {[
                            { title: "Basic Plan", price: "$8" },
                            { title: "Premium Plan", price: "$18" },
                            { title: "Special Plan", price: "$17" },
                        ].map((plan, index) => (
                            <div className="col-lg-4 col-md-6 col-sm-12" key={index}>
                                <div className="ayur-pricing-sec">
                                    <div className="ayur-pricing-head">
                                        <div className="ayur-price-meta">
                                            <h3>
                                                {plan.title}
                                                <span className="ayur-name-shape"></span>
                                            </h3>
                                        </div>
                                        <div className="ayur-pricing-pricevalue">
                                            <h4>{plan.price}<span> / Month</span></h4>
                                        </div>
                                    </div>
                                    <div className="ayur-price-list">
                                        <ul>
                                            <li><p>1 Product Free</p></li>
                                            <li><p>Unlimited Access</p></li>
                                            <li><p>Fresh Product</p></li>
                                            <li><p>24 X 7 Support</p></li>
                                            <li><p>Free Update</p></li>
                                        </ul>
                                    </div>
                                    <div className="ayur-price-btn">
                                        <a href="#" className="ayur-btn">Buy Plan</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
