import React from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { getBlogPost, getBlogPosts } from "@/lib/blog/adapter";
import { generateArticleSchema } from "@/lib/schema/article";
import { generateBreadcrumbSchema } from "@/lib/schema/breadcrumb";
import { notFound } from "next/navigation";
import Link from "next/link";
import { injectInternalLinks } from "@/lib/blog/linkInjector";


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogPost(slug);

    if (!blog) {
        return {};
    }

    return {
        title: blog.seoTitle || blog.title,
        description: blog.seoDescription || blog.description,
        keywords: blog.keywords,
        alternates: {
            canonical: `https://atharvveda.us/blog/${blog.slug}`,
        },
        openGraph: {
            title: blog.title,
            description: blog.description,
            type: 'article',
            publishedTime: blog.publishedAt.toISOString(),
            modifiedTime: blog.updatedAt?.toISOString(),
            authors: [blog.author],
            images: [blog.image],
            url: `https://atharvveda.us/blog/${blog.slug}`,
        },
    };
}

export default async function BlogSinglePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlogPost(slug);
    const allPosts = await getBlogPosts();


    if (!blog) {
        notFound();
    }

    // Auto-inject internal links
    const contentWithLinks = injectInternalLinks(blog.content, blog.diseaseCategory);

    // Filter recent blogs logic: ensure we show SOMETHING even if there's only 1 post
    let recentBlogs = allPosts.filter(p => p.slug !== slug).slice(0, 3);

    // Fallback: if no other posts exist, just show the current one again (or empty if truly none)
    // Ideally we'd show other relevant content, but for "Recent" showing the same post is better than empty if user insists on "Must be there"
    if (recentBlogs.length === 0 && allPosts.length > 0) {
        recentBlogs = allPosts.slice(0, 3);
    }

    const articleSchema = generateArticleSchema({
        title: blog.title,
        description: blog.description,
        url: `https://atharvveda.us/blog/${blog.slug}`,
        imageUrl: `https://atharvveda.us${blog.image}`,
        datePublished: blog.publishedAt.toISOString(),
        dateModified: blog.updatedAt?.toISOString() || blog.publishedAt.toISOString(),
        authorName: blog.author,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: blog.title, url: `/blog/${blog.slug}` },
    ]);

    return (
        <main>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <Breadcrumb title="Blog" />

            <div className="ayur-bgcover ayur-blogsin-section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className="ayur-blogsingle-sec">
                                <div className="ayur-blogsingle-imgsec">
                                    <div className="ayur-blog-img">
                                        <img src={blog.image} alt={blog.title} />
                                    </div>
                                    <div className="ayur_blosing-postdata">
                                        <div className="ayur-blogsingle-title">
                                            <h3>{blog.title}</h3>
                                        </div>
                                        <div className="ayur-post-data">
                                            <span className="post-like">
                                                <img src="/assets/images/user-svg.svg" alt="icon" style={{ width: "20px", marginRight: "8px" }} />
                                                <span>Post by - {blog.author}</span>
                                            </span>
                                            <span className="post-like" style={{ marginLeft: "20px" }}>
                                                <img src="/assets/images/calender.svg" alt="icon" style={{ width: "20px", marginRight: "8px" }} />
                                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(blog.publishedAt)}
                                            </span>
                                        </div>

                                        <div
                                            className="blog-content"
                                            style={{ marginTop: "24px", fontSize: "1.1rem" }}
                                            dangerouslySetInnerHTML={{ __html: contentWithLinks }}
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
                                    {recentBlogs.map((post, i) => (
                                        <div className="ayur-blog-box ayur-blog-inline" key={i}>
                                            <div className="ayur-blog-img">
                                                <img src={post.image} alt={post.title} />
                                            </div>
                                            <div className="ayur-blog-text">
                                                <div className="ayur-blog-date">
                                                    <h4>{post.category}</h4>
                                                </div>
                                                <h3>
                                                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
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
