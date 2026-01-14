"use client";
import React from "react";
import Link from "next/link";

interface BreadcrumbProps {
    title: string;
}

const Breadcrumb = ({ title }: BreadcrumbProps) => {
    return (
        <div className="ayur-bread-section">
            <div className="ayur-breadcrumb-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="ayur-bread-content">
                                <h2>{title}</h2>
                                <div className="ayur-bread-list">
                                    <span>
                                        <Link href="/">Home</Link>
                                    </span>
                                    <span className="ayur-active-page">{title}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Breadcrumb;
