import React from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { blogs } from "@/data/blogs";
import { notFound } from "next/navigation";

export default function BlogSinglePage({ params }: { params: { slug: string } }) {
    const blog = blogs.find((b) => b.slug === params.slug);

    if (!blog) {
        // For now, let's use the first blog as a fallback if the slug doesn't match
        // in a real app, you might want to call notFound()
        // but since we only have one blog in data, let's just show it.
    }

    const activeBlog = blog || blogs[0];

    return (
        <main>
            <Breadcrumb title="Blog" />

            <div className="ayur-bgcover ayur-blogsin-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="ayur-blogsingle-sec">
                                <div className="ayur-blogsingle-imgsec">
                                    <div className="ayur-blog-img">
                                        <img src={activeBlog.image} alt={activeBlog.title} />
                                    </div>
                                    <div className="ayur_blosing-postdata">
                                        <div className="ayur-blogsingle-title">
                                            <h3>{activeBlog.title}</h3>
                                        </div>
                                        <div className="ayur-post-data">
                                            <span className="post-like">
                                                <img src="/assets/images/user-svg.svg" alt="icon" style={{ width: "20px", marginRight: "8px" }} />
                                                <span>Post by - {activeBlog.author}</span>
                                            </span>
                                            <span className="post-like" style={{ marginLeft: "20px" }}>
                                                <img src="/assets/images/calender.svg" alt="icon" style={{ width: "20px", marginRight: "8px" }} />
                                                {activeBlog.date}
                                            </span>
                                        </div>

                                        <div
                                            className="blog-content"
                                            style={{ marginTop: "24px", fontSize: "1.1rem" }}
                                            dangerouslySetInnerHTML={{ __html: activeBlog.content }}
                                        />

                                        <div className="ayur-blockquote" style={{ margin: "32px 0", padding: "24px", background: "#f8f9fa", borderLeft: "4px solid #ffb300" }}>
                                            <blockquote className="blockquote">
                                                <p style={{ fontStyle: "italic", fontSize: "1.2rem" }}>
                                                    "Ayurveda is considered the world’s oldest system of medicine, with origins dating back over 5,000 years."
                                                </p>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                <div className="ayur-blogsingle-postsec">
                                    <h3 className="post-heading">Comments</h3>
                                    <div className="comment" style={{ background: "#fff", padding: "24px", borderRadius: "12px", marginBottom: "20px", border: "1px solid #eee" }}>
                                        <div style={{ display: "flex", alignItems: "center", marginBottom: "12px" }}>
                                            <img src="/assets/images/comment-author-1.jpg" alt="author" style={{ width: "50px", borderRadius: "50%", marginRight: "16px" }} />
                                            <div>
                                                <span style={{ fontWeight: 700, display: "block" }}>Jhini Snow</span>
                                                <span style={{ fontSize: "0.9rem", color: "#888" }}>15.04.2024</span>
                                            </div>
                                        </div>
                                        <p>Truly inspiring! Ayurveda has changed my life for the better.</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className="ayur-shop-sidebar">
                                <div className="ayur-widget ayur-blog-recent">
                                    <h3>Recent Blog</h3>
                                    {[3, 4, 5].map((i) => (
                                        <div className="ayur-blog-box ayur-blog-inline" key={i}>
                                            <div className="ayur-blog-img">
                                                <img src={`/assets/images/blog-${i}.png`} alt="image" />
                                            </div>
                                            <div className="ayur-blog-text">
                                                <div className="ayur-blog-date">
                                                    <h4>Ayurveda Medicine</h4>
                                                </div>
                                                <h3>
                                                    <a href="#">Duis aute irure dolor in velit</a>
                                                </h3>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
