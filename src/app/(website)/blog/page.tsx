import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import BlogCard from "@/components/BlogCard";
import { getBlogPosts, toBlogCardData } from "@/lib/blog/adapter";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Ayurveda Health Blog | Expert Insights & Tips",
    description: "Read the latest articles on Ayurveda, kidney health, lifestyle tips, and natural remedies from expert practitioners at Atharv Veda.",
    alternates: {
        canonical: "/blog",
    },
};

export default async function Blog() {
    const posts = await getBlogPosts();
    const allBlogs = posts.map(toBlogCardData);

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
                                        <li className="page-item disabled">
                                            <span className="page-link">
                                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M0.930801 5.93376L6.42152 0.443038C7.01224 -0.147679 7.96624 -0.147679 8.55696 0.443038C9.14768 1.03376 9.14768 1.98776 8.55696 2.57848L4.13249 7L8.55696 11.4215C9.14768 12.0122 9.14768 12.9662 8.55696 13.557C7.96624 14.1477 7.01224 14.1477 6.42152 13.557L0.930801 8.06625C0.343038 7.47848 0.343038 6.52152 0.930801 5.93376Z" fill="white" />
                                                </svg>
                                            </span>
                                        </li>
                                        <li className="page-item"><span className="page-link active">1</span></li>
                                        <li className="page-item disabled"><span className="page-link">2</span></li>
                                        <li className="page-item disabled"><span className="page-link">3</span></li>
                                        <li className="page-item disabled">
                                            <span className="page-link">
                                                <svg width="9" height="14" viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M8.0692 5.93376L2.57848 0.443038C1.98776 -0.147679 1.03376 -0.147679 0.443038 0.443038C-0.147679 1.03376 -0.147679 1.98776 0.443038 2.57848L4.86751 7L0.443038 11.4215C-0.147679 12.0122 -0.147679 12.9662 0.443038 13.557C1.03376 14.1477 1.98776 14.1477 2.57848 13.557L8.0692 8.06625C8.65696 7.47848 8.65696 6.52152 8.0692 5.93376Z" fill="white" />
                                                </svg>
                                            </span>
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
