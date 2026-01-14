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

const BlogCard = ({ image, category, date, title, description, slug }: BlogCardProps) => {
    return (
        <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="ayur-blog-box">
                <div className="ayur-blog-img">
                    <img src={image} alt={title} />
                </div>
                <div className="ayur-blog-text">
                    <div className="ayur-blog-date">
                        <h4>{category}</h4>
                        <p>{date}</p>
                    </div>
                    <h3>
                        <Link href={`/blog/${slug}`}>{title}</Link>
                    </h3>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
