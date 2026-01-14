"use client";
import React from "react";
import Link from "next/link";

const BlogSection = () => {
    return (
        <div className="ayur-bgcover ayur-blog-sec">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="ayur-heading-wrap">
                            <h5>Our Blogs</h5>
                            <h3>Wisdom Worth Sharing</h3>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="ayur-blog-box">
                            <div className="ayur-blog-img">
                                <img src="/assets/images/blog-1.png" alt="image" />
                            </div>
                            <div className="ayur-blog-text">
                                <div className="ayur-blog-date">
                                    <h4>Ayurveda Medicine</h4>
                                    <p>June 17,2024</p>
                                </div>
                                <h3><Link href="/blog">How Ayurveda Supports Kidney Health Naturally</Link></h3>
                                <p>It is a long established was a fact that a reader will be distracted by the readable content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="ayur-blog-box">
                            <div className="ayur-blog-img">
                                <img src="/assets/images/blog-2.png" alt="image" />
                            </div>
                            <div className="ayur-blog-text">
                                <div className="ayur-blog-date">
                                    <h4>Ayurveda Medicine</h4>
                                    <p>June 17,2024</p>
                                </div>
                                <h3><Link href="/blog">The Link Between PCOS and Diet: An Ayurvedic Perspective</Link></h3>
                                <p>It is a long established was a fact that a reader will be distracted by the readable content.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        {[
                            { title: "How Ayurveda Supports Kidney Health Naturally", img: "blog-3.png" },
                            { title: "The Link Between PCOS and Diet: An Ayurvedic Perspective", img: "blog-4.png" },
                            { title: "Why Stress Management is Key in Any Healing Journey", img: "blog-5.png" }
                        ].map((post, index) => (
                            <div className="ayur-blog-box ayur-blog-inline" key={index}>
                                <div className="ayur-blog-img">
                                    <img src={`/assets/images/${post.img}`} alt="image" />
                                </div>
                                <div className="ayur-blog-text">
                                    <div className="ayur-blog-date">
                                        <h4>Ayurveda Medicine</h4>
                                    </div>
                                    <h3><Link href="/blog">{post.title}</Link></h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="ayur-bgshape ayur-blog-bgshape">
                <img src="/assets/images/bg-shape6.png" alt="img" />
                <img src="/assets/images/bg-leaf6.png" alt="img" />
            </div>
        </div>
    );
};

export default BlogSection;
