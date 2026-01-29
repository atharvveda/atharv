"use client";

import React, { useState, useEffect } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "USA"
    });

    const [zipVerified, setZipVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return <div className="py-5 text-center">Loading...</div>;

    if (items.length === 0) {
        return <div className="py-5 text-center">Your cart is empty.</div>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        if (e.target.name === 'zip') setZipVerified(false);
    };

    const checkAvailability = async () => {
        if (!formData.zip) {
            setMessage("Please enter a zip code.");
            return;
        }
        setLoading(true);
        setMessage("");
        try {
            const res = await fetch('/api/shop/zip-check', {
                method: 'POST',
                body: JSON.stringify({ zipCode: formData.zip }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (data.serviceable) {
                setZipVerified(true);
                setMessage(`Delivery available! Est. ${data.deliveryDays} days.`);
            } else {
                setZipVerified(false);
                setMessage("Sorry, we do not deliver to this zip code yet.");
            }
        } catch (e) {
            setMessage("Error validating zip code.");
        } finally {
            setLoading(false);
        }
    };

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!zipVerified) {
            setMessage("Please verify zip code availability first.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/shop/checkout', {
                method: 'POST',
                body: JSON.stringify({
                    items: items.map(i => ({ id: i.id, quantity: i.quantity })),
                    customer: formData,
                    zipCode: formData.zip
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();

            if (data.success) {
                clearCart();
                router.push(`/shop/order-success?orderId=${data.orderId}`);
            } else {
                setMessage(data.error || "Order placement failed.");
            }
        } catch (e) {
            setMessage("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container py-5">
            <h2 className="mb-4">Checkout</h2>
            <div className="row">
                <div className="col-lg-8">
                    <div className="card mb-4">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Shipping Details</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handlePlaceOrder}>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Full Name</label>
                                        <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Email</label>
                                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="tel" className="form-control" name="phone" value={formData.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleInputChange} required />
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-4">
                                        <label className="form-label">City</label>
                                        <input type="text" className="form-control" name="city" value={formData.city} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">State</label>
                                        <input type="text" className="form-control" name="state" value={formData.state} onChange={handleInputChange} required />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label">Zip Code</label>
                                        <div className="input-group">
                                            <input type="text" className="form-control" name="zip" value={formData.zip} onChange={handleInputChange} required />
                                            <button className="btn btn-outline-secondary" type="button" onClick={checkAvailability} disabled={loading}>
                                                {loading ? '...' : 'Check'}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {message && (
                                    <div className={`alert ${zipVerified ? 'alert-success' : 'alert-danger'} mb-3`}>
                                        {message}
                                    </div>
                                )}

                                <div className="d-grid mt-4">
                                    <button type="submit" className="btn btn-primary btn-lg" disabled={!zipVerified || loading}>
                                        {loading ? 'Processing...' : `Pay $${totalPrice().toFixed(2)}`}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <div className="card">
                        <div className="card-header bg-white">
                            <h5 className="mb-0">Order Summary</h5>
                        </div>
                        <div className="card-body">
                            {items.map(item => (
                                <div key={item.id} className="d-flex justify-content-between mb-2">
                                    <span>{item.name} x {item.quantity}</span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between font-weight-bold">
                                <strong>Total</strong>
                                <strong>${totalPrice().toFixed(2)}</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
