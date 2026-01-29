import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProducts() {
    try {
        const products = await prisma.product.findMany({
            take: 6,
            orderBy: { createdAt: "desc" },
        });
        return products;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
}

export default async function ShopHome() {
    const products = await getProducts();

    return (
        <div className="shop-home-container">
            {/* Hero Section */}
            <section className="shop-hero py-5 bg-light">
                <div className="container text-center">
                    <h1>Welcome to Atharv Veda Shop</h1>
                    <p className="lead">Holistic Healing Products directly from us.</p>
                </div>
            </section>

            {/* Products Section */}
            <section className="shop-products py-5">
                <div className="container">
                    <h2 className="mb-4">Featured Products</h2>
                    <div className="row">
                        {products.length === 0 ? (
                            <div className="col-12 text-center">
                                <p>No products found. seeding...</p>
                            </div>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                                    <div className="card h-100 product-card">
                                        <div className="card-body">
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text text-muted">
                                                {/* product.description - trimmed */}
                                                {product.description?.substring(0, 100)}...
                                            </p>
                                            <h6 className="card-subtitle mb-2 text-primary">
                                                ${Number(product.price).toFixed(2)}
                                            </h6>
                                            <Link href={`/shop/products/${product.slug}`} className="btn btn-outline-success section-btn">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
