"use client";
import React from "react";
import Link from "next/link";

interface BlogCardProps {
    image: string;
    category: string;
    date: string;
    title: string;
    description: string;
    slug: string;
}

const BlogCard = ({
    image,
    category,
    date,
    title,
    description,
    slug,
}: BlogCardProps) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <Link
                href={`/blog/${slug}`}
                className="ayur-blog-box ayur-blog-link"
            >
                <div className="ayur-blog-img">
                    <img src={image} alt={title} />
                </div>

                <div className="ayur-blog-text">
                    <div className="ayur-blog-date">
                        <h4>{category}</h4>
                        <p>{date}</p>
                    </div>

                    <h3 className="ayur-blog-title">{title}</h3>

                    <p className="ayur-blog-desc">{description}</p>
                </div>
            </Link>
        </div>
    );
};

export default BlogCard;
