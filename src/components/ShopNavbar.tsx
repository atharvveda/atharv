"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

const ShopNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();
    const totalItems = useCartStore((state) => state.totalItems());
    const [mounted, setMounted] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.classList.add("ayur-menu-open");
        } else {
            document.body.classList.remove("ayur-menu-open");
        }
    };

    useEffect(() => {
        setMounted(true);
        // Close menu when pathname changes
        setIsMenuOpen(false);
        document.body.classList.remove("ayur-menu-open");
    }, [pathname]);

    return (
        <div className="ayur-menu-wrapper">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-2 col-md-4 col-sm-5 col-6">
                        <div className="ayur-menu-logo">
                            <Link href="/">
                                <img src="/assets/images/New-Logo.png" alt="Logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-10 col-md-8 col-sm-7 col-6">
                        <div className="ayur-navmenu-wrapper">
                            <div className="ayur-nav-menu">
                                <ul>
                                    <li className={pathname === "/shop" ? "active" : ""}>
                                        <Link href="/shop">Shop Home</Link>
                                    </li>
                                    <li className={pathname?.startsWith("/shop/products") ? "active" : ""}>
                                        <Link href="/shop/products">Products</Link>
                                    </li>
                                    <li>
                                        <Link href="/">Main Site</Link>
                                    </li>
                                    <li className={pathname === "/shop/cart" ? "active" : ""}>
                                        <Link href="/shop/cart">
                                            Cart ({mounted ? totalItems : 0})
                                        </Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="ayur-toggle-btn" onClick={toggleMenu}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopNavbar;
