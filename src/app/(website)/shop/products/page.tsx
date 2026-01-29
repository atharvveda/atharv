import React from "react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

async function getProducts() {
    return await prisma.product.findMany({
        orderBy: { createdAt: "desc" },
    });
}

export default async function ProductsPage() {
    const products = await getProducts();

    return (
        <section className="shop-products-page py-5">
            <div className="container">
                <h2 className="mb-4">All Products</h2>
                <div className="row">
                    {products.map((product) => (
                        <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                            <div className="card h-100 product-card">
                                {/* Images would go here */}
                                <div className="card-body">
                                    <h5 className="card-title">{product.name}</h5>
                                    <p className="card-text text-muted">
                                        {product.description?.substring(0, 100)}...
                                    </p>
                                    <h6 className="card-subtitle mb-2 text-primary">
                                        ${Number(product.price).toFixed(2)}
                                    </h6>
                                    <Link href={`/shop/products/${product.slug}`} className="btn btn-primary section-btn">
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
