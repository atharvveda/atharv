"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import BlogCard from "@/components/BlogCard";

export default function Blog() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    const allBlogs = [
        {
            image: "/assets/images/blog-single.png",
            category: "Ayurveda Medicine",
            date: "24 March 2022",
            title: "Why Choose Ayurveda for a Healthier Life?",
            description: "Discover the ancient wisdom of Ayurveda combined with modern clinical excellence.",
            slug: "why-choose-ayurveda-for-a-healthier-life"
        },
        { image: "/assets/images/blog-1.png", category: "Ayurveda Medicine", date: "June 17,2024", title: "Duis aute irure dolor in velit voluptate esse", description: "It is a long established was a fact that a reader will be distracted by the readable content.", slug: "why-choose-ayurveda-for-a-healthier-life" },
        { image: "/assets/images/blog-2.png", category: "Ayurveda Medicine", date: "June 17,2024", title: "Duis aute irure dolor in velit voluptate esse", description: "It is a long established was a fact that a reader will be distracted by the readable content.", slug: "why-choose-ayurveda-for-a-healthier-life" },
    ];

    return (
        <main>
            <Breadcrumb title="Blog" />

            <div className="ayur-bgcover ayur-blog-sec ayur-blogsin-page">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-heading-wrap">
                                <h5>Blog</h5>
                                <h3>Our Latest News</h3>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {allBlogs.map((blog, index) => (
                            <BlogCard key={index} {...blog} />
                        ))}
                    </div>

                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-pagination-wrappper">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.930801 5.93376L6.42152 0.443038C7.01224 -0.147679 7.96624 -0.147679 8.55696 0.443038C9.14768 1.03376 9.14768 1.98776 8.55696 2.57848L4.13249 7L8.55696 11.4215C9.14768 12.0122 9.14768 12.9662 8.55696 13.557C7.96624 14.1477 7.01224 14.1477 6.42152 13.557L0.930801 8.06625C0.343038 7.47848 0.343038 6.52152 0.930801 5.93376Z" fill="white" />
                                                </svg>
                                            </a>
                                        </li>
                                        <li className="page-item"><a className="page-link active" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#">
                                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.0692 5.93376L2.57848 0.443038C1.98776 -0.147679 1.03376 -0.147679 0.443038 0.443038C-0.147679 1.03376 -0.147679 1.98776 0.443038 2.57848L4.86751 7L0.443038 11.4215C-0.147679 12.0122 -0.147679 12.9662 0.443038 13.557C1.03376 14.1477 1.98776 14.1477 2.57848 13.557L8.0692 8.06625C8.65696 7.47848 8.65696 6.52152 8.0692 5.93376Z" fill="white" />
                                                </svg>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ayur-bgshape ayur-blog-bgshape">
                    <img src="/assets/images/bg-shape6.png" alt="img" />
                    <img src="/assets/images/bg-leaf6.png" alt="img" />
                </div>
            </div>

            <div className="ayur-bgcover ayur-videosin-sec">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-video-section">
                                <div className="ayur-video-img">
                                    <img src="/assets/images/video-bg.png" alt="img" />
                                    <button className="ayur-video-playicon" onClick={() => setIsVideoOpen(true)} style={{ border: "none", background: "none" }}>
                                        <img src="/assets/images/play-icon.svg" alt="icon" />
                                    </button>
                                    {isVideoOpen && (
                                        <div id="videoPopup1" className="ayur-popup" style={{ display: "block" }}>
                                            <div className="ayur-popup-content">
                                                <span className="close" onClick={() => setIsVideoOpen(false)}>×</span>
                                                <iframe src="https://www.youtube.com/embed/hJTmi9euoNg?autoplay=1" frameBorder="0" allowFullScreen></iframe>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
