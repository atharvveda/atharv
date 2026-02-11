import React from "react";
import Link from "next/link";
import Image from "next/image";
import { generateArticleSchema } from "@/lib/schema/article";
import { getBlogPosts } from "@/lib/blog/adapter";

const HomeBlogSection = async () => {
    // Fetch real blog posts
    const allPosts = await getBlogPosts();
    // Get the latest 3 posts
    const latestBlogs = allPosts.slice(0, 3);

    return (
        <section className="py-5" style={{ background: "#f9f9f9", paddingBottom: "100px" }}>
            <div className="container">
                <div className="row justify-content-center mb-5">
                    <div className="col-lg-8 text-center">
                        <h5 style={{ color: "#ff5722", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px" }}>Health Insights</h5>
                        <h2 style={{ fontSize: "2.5rem", fontWeight: 800, color: "#00423b", marginBottom: "1rem" }}>
                            Latest Insights on Kidney & Chronic Care
                        </h2>
                        <p style={{ fontSize: "1.1rem", color: "#555", maxWidth: "600px", margin: "0 auto" }}>
                            Stay informed with expert-reviewed articles on managing kidney health, understanding symptoms, and natural healing.
                        </p>
                    </div>
                </div>

                <div className="row">
                    {latestBlogs.map((blog, index) => {
                        // Create structured data for each article
                        const articleSchema = generateArticleSchema({
                            title: blog.title,
                            description: blog.description || "",
                            url: `https://atharvveda.us/blog/${blog.slug}`,
                            datePublished: blog.publishedAt ? new Date(blog.publishedAt).toISOString() : new Date().toISOString(),
                            dateModified: blog.updatedAt ? new Date(blog.updatedAt).toISOString() : new Date().toISOString(),
                            authorName: blog.author || "Dr. Rahul Sharma",
                            imageUrl: blog.image
                        });

                        // Format Date
                        const formattedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        });

                        return (
                            <div className="col-lg-4 col-md-6 mb-4" key={index}>
                                <script
                                    type="application/ld+json"
                                    dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
                                />
                                <div className="card h-100 border-0 shadow-sm" style={{ borderRadius: "12px", overflow: "hidden", transition: "transform 0.3s" }}>
                                    <div style={{ position: "relative", height: "240px", width: "100%" }}>
                                        <Image
                                            src={blog.image}
                                            alt={blog.title}
                                            fill
                                            style={{ objectFit: "cover" }}
                                            className="blog-card-img"
                                        />
                                    </div>
                                    <div className="card-body p-4 d-flex flex-column">
                                        <div className="mb-2">
                                            <span style={{ fontSize: "0.85rem", color: "#666", fontWeight: 600 }}>{formattedDate}</span>
                                            <span className="mx-2 text-muted">•</span>
                                            <span style={{ fontSize: "0.85rem", color: "#2e7d32", fontWeight: 600 }}>{blog.category || "Kidney Health"}</span>
                                        </div>
                                        <h3 className="card-title h5 mb-3">
                                            <Link href={`/blog/${blog.slug}`} style={{ textDecoration: "none", color: "#00423b", fontWeight: 700 }}>
                                                {blog.title}
                                            </Link>
                                        </h3>
                                        <p className="card-text flex-grow-1" style={{ fontSize: "0.95rem", color: "#555", lineHeight: "1.6" }}>
                                            {blog.description ? (blog.description.length > 100 ? blog.description.substring(0, 100) + "..." : blog.description) : ""}
                                        </p>
                                        <div className="mt-3">
                                            <Link href={`/blog/${blog.slug}`} style={{ color: "#ff5722", fontWeight: 700, textDecoration: "none", display: "inline-flex", alignItems: "center" }}>
                                                Read Article
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "5px" }}>
                                                    <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <Link href="/blog" className="btn btn-outline-dark" style={{ padding: "12px 30px", fontSize: "1rem", fontWeight: 600, borderRadius: "50px", border: "2px solid #00423b", color: "#00423b" }}>
                            View All Articles
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeBlogSection;
