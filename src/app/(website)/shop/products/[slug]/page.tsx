import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";

export const dynamic = "force-dynamic";

async function getProduct(slug: string) {
    return await prisma.product.findUnique({
        where: { slug },
        // include: { testimonials: true }
    });
}

export default async function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const product = await getProduct(slug);

    if (!product) {
        return notFound();
    }

    return (
        <section className="product-detail py-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        {/* Image Placeholder */}
                        <div className="bg-light p-5 text-center" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <i className="fa fa-image fa-5x text-muted mb-3"></i>
                            <p className="text-muted">Product Image<br /><small>(Images coming soon)</small></p>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <h2>{product.name}</h2>
                        <div className="mb-3 text-warning">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star-half-o"></i>
                            <span className="text-muted ms-2">({(product as any).testimonials?.length || 0} reviews)</span>
                        </div>
                        <h4 className="text-primary my-3">${Number(product.price).toFixed(2)}</h4>
                        <p>{product.description}</p>

                        <div className="my-4">
                            <h5>Ingredients</h5>
                            <p>{product.ingredients || "Natural Ayurvedic Ingredients"}</p>
                        </div>

                        <ProductActions
                            product={{
                                ...product,
                                price: Number(product.price),
                            }}
                        />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12">
                        <h3>Customer Reviews</h3>
                        <hr />
                        {((product as any).testimonials || []).length === 0 ? (
                            <p className="text-muted">No reviews yet.</p>
                        ) : (
                            <div className="row">
                                {((product as any).testimonials || []).map((t: any) => (
                                    <div key={t.id} className="col-md-6 mb-3">
                                        <div className="card h-100">
                                            <div className="card-body">
                                                <div className="mb-2 text-warning">
                                                    {[...Array(t.rating)].map((_, i) => <i key={i} className="fa fa-star"></i>)}
                                                </div>
                                                <p className="card-text">"{t.comment}"</p>
                                                <small className="text-muted">- {t.name}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
