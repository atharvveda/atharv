"use client";

import React, { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

interface ProductActionsProps {
    product: {
        id: string;
        slug: string;
        name: string;
        price: number | string;
        images?: string;
    };
}

export default function ProductActions({ product }: ProductActionsProps) {
    const { addItem } = useCartStore();
    const router = useRouter(); // Initialize hook
    const [zipCode, setZipCode] = useState("");
    const [availability, setAvailability] = useState<{
        checked: boolean;
        serviceable: boolean;
        message: string;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleCheckAvailability = async () => {
        if (!zipCode) return;
        setLoading(true);
        try {
            const res = await fetch("/api/shop/zip-check", {
                method: "POST",
                body: JSON.stringify({ zipCode }),
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();

            if (data.serviceable) {
                setAvailability({
                    checked: true,
                    serviceable: true,
                    message: `Available! Delivery in ${data.deliveryDays} days.`,
                });
            } else {
                setAvailability({
                    checked: true,
                    serviceable: false,
                    message: "Sorry, delivery not available to this zip code.",
                });
            }
        } catch (e) {
            setAvailability({
                checked: true,
                serviceable: false,
                message: "Error checking availability.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = () => {
        addItem({
            ...product,
            price: Number(product.price)
        });
        alert("Added to cart!");
    };

    return (
        <div>
            <div className="availability-check my-4 p-3 bg-white border rounded">
                <h6>Check Availability</h6>
                <div className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Zip Code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                    />
                    <button
                        className="btn btn-outline-primary"
                        type="button"
                        onClick={handleCheckAvailability}
                        disabled={loading}
                    >
                        {loading ? "..." : "Check"}
                    </button>
                </div>
                {availability && (
                    <small className={availability.serviceable ? "text-success" : "text-danger"}>
                        {availability.message}
                    </small>
                )}
                {!availability && <small className="text-muted">Enter zip code to verify delivery.</small>}
            </div>

            <div className="d-flex gap-3">
                <button onClick={handleAddToCart} className="btn btn-outline-success btn-lg flex-grow-1">
                    Add to Cart
                </button>
                <button
                    onClick={() => {
                        addItem({
                            ...product,
                            price: Number(product.price)
                        });
                        router.push('/shop/checkout');
                    }}
                    className="btn btn-success btn-lg flex-grow-1"
                >
                    Buy Now
                </button>
            </div>
        </div>
    );
}
