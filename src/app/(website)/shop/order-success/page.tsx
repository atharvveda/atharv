import React from "react";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PrintReceiptButton from "@/components/PrintReceiptButton";

export const dynamic = "force-dynamic";

async function getOrder(orderId: string) {
    return await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: { include: { product: true } }, customer: true },
    });
}

export default async function OrderSuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ orderId: string }>;
}) {
    const { orderId } = await searchParams;
    if (!orderId) return notFound();

    const order = await getOrder(orderId);
    if (!order) return notFound();

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card border-success">
                        <div className="card-body text-center p-5">
                            <div className="text-success mb-3" style={{ fontSize: '4rem' }}>
                                <i className="fa fa-check-circle"></i>
                            </div>
                            <h2 className="mb-3">Thank You for Your Order!</h2>
                            <p className="lead">Your order has been placed successfully.</p>
                            <p className="text-muted">Order ID: {order.id}</p>
                        </div>
                        <div className="card-footer bg-light p-4">
                            <h5>Receipt</h5>
                            <hr />
                            <div className="row mb-3">
                                <div className="col-6">
                                    <strong>Bill To:</strong><br />
                                    {order.customer.name}<br />
                                    {order.customer.address}, {order.customer.city}<br />
                                    {order.customer.state} - {order.customer.zip}
                                </div>
                                <div className="col-6 text-end">
                                    <strong>Date:</strong> {order.createdAt.toLocaleDateString()}<br />
                                    <strong>Status:</strong> {order.status}
                                </div>
                            </div>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Item</th>
                                        <th className="text-end">Qty</th>
                                        <th className="text-end">Price</th>
                                        <th className="text-end">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.items.map((item: any) => (
                                        <tr key={item.id}>
                                            <td>{item.product.name}</td>
                                            <td className="text-end">{item.quantity}</td>
                                            <td className="text-end">${Number(item.price).toFixed(2)}</td>
                                            <td className="text-end">${(Number(item.price) * item.quantity).toFixed(2)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colSpan={3} className="text-end"><strong>Total Amount:</strong></td>
                                        <td className="text-end"><strong>${Number(order.totalAmount).toFixed(2)}</strong></td>
                                    </tr>
                                </tfoot>
                            </table>
                            <div className="text-center mt-4">
                                <PrintReceiptButton />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
