import React from "react";
import Link from "next/link";
import { getBlogPosts } from "@/lib/blog/adapter";

const BlogSection = async () => {
    const allPosts = await getBlogPosts();
    const recentPosts = allPosts.slice(0, 5); // Get first 5 for the section

    const mainPosts = recentPosts.slice(0, 2);
    const sidePosts = recentPosts.slice(2, 5);

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
                    {mainPosts.map((post, idx) => (
                        <div className="col-lg-4 col-md-6 col-sm-6" key={idx}>
                            <div className="ayur-blog-box">
                                <div className="ayur-blog-img">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="ayur-blog-text">
                                    <div className="ayur-blog-date">
                                        <h4>{post.category}</h4>
                                        <p>{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).format(post.publishedAt)}</p>
                                    </div>
                                    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
                                    <p>{post.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-lg-4 col-md-12 col-sm-12">
                        {sidePosts.map((post, index) => (
                            <div className="ayur-blog-box ayur-blog-inline" key={index}>
                                <div className="ayur-blog-img">
                                    <img src={post.image} alt={post.title} />
                                </div>
                                <div className="ayur-blog-text">
                                    <div className="ayur-blog-date">
                                        <h4>{post.category}</h4>
                                    </div>
                                    <h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3>
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
