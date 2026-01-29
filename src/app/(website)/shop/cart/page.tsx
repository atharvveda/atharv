"use client";

import React, { useEffect, useState } from "react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="py-5 text-center">Loading Cart...</div>;

    if (items.length === 0) {
        return (
            <div className="py-5 text-center">
                <h2>Your Cart is Empty</h2>
                <Link href="/shop/products" className="btn btn-primary mt-3">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h2 className="mb-4">Shopping Cart</h2>
            <div className="row">
                <div className="col-lg-8">
                    {items.map((item) => (
                        <div key={item.id} className="card mb-3">
                            <div className="row g-0 align-items-center">
                                <div className="col-md-2 p-2">
                                    <div style={{ position: 'relative', width: '100%', height: '80px' }}>
                                        <img src={item.image} alt={item.name} className="img-fluid rounded" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
                                    </div>
                                </div>
                                <div className="col-md-10">
                                    <div className="card-body d-flex justify-content-between align-items-center">
                                        <div>
                                            <h5 className="card-title mb-1">{item.name}</h5>
                                            <p className="card-text text-muted mb-0">${item.price.toFixed(2)}</p>
                                        </div>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="input-group input-group-sm" style={{ width: '120px' }}>
                                                <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                                                <input type="text" className="form-control text-center" value={item.quantity} readOnly />
                                                <button className="btn btn-outline-secondary" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.id)}>
                                                <i className="fa fa-trash"></i> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Order Summary</h5>
                            <hr />
                            <div className="d-flex justify-content-between mb-2">
                                <span>Subtotal</span>
                                <span>${totalPrice().toFixed(2)}</span>
                            </div>
                            <div className="d-flex justify-content-between mb-3">
                                <span>Shipping</span>
                                <span className="text-muted">Calculated at checkout</span>
                            </div>
                            <hr />
                            <div className="d-flex justify-content-between mb-4">
                                <strong>Total</strong>
                                <strong>${totalPrice().toFixed(2)}</strong>
                            </div>
                            <Link href="/shop/checkout" className="btn btn-success w-100 btn-lg">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
