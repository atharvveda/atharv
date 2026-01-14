"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const pathname = usePathname();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (!isMenuOpen) {
            document.body.classList.add("ayur-menu-open");
        } else {
            document.body.classList.remove("ayur-menu-open");
        }
    };

    const toggleSubmenu = (menuName: string) => {
        setOpenSubmenu(openSubmenu === menuName ? null : menuName);
    };

    useEffect(() => {
        // Close menu when pathname changes
        setIsMenuOpen(false);
        document.body.classList.remove("ayur-menu-open");
        setOpenSubmenu(null);
    }, [pathname]);

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!(event.target as HTMLElement).closest(".ayur-has-menu")) {
                setOpenSubmenu(null);
            }
            if (!(event.target as HTMLElement).closest(".ayur-navmenu-wrapper")) {
                // setIsMenuOpen(false);
                // document.body.classList.remove("ayur-menu-open");
            }
        };

        document.addEventListener("click", handleOutsideClick);
        return () => document.removeEventListener("click", handleOutsideClick);
    }, []);

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
                                    <li className={pathname === "/" ? "active" : ""}>
                                        <Link href="/">Home</Link>
                                    </li>
                                    <li className={pathname === "/about" ? "active" : ""}>
                                        <Link href="/about">About</Link>
                                    </li>
                                    <li className={`ayur-has-menu ${openSubmenu === "health" ? "active" : ""}`}>
                                        <a href="javascript:void(0)" onClick={(e) => { e.preventDefault(); toggleSubmenu("health"); }}>
                                            Health Concerns
                                            <svg version="1.1" x="0" y="0" viewBox="0 0 491.996 491.996">
                                                <g>
                                                    <path d="m484.132 124.986-16.116-16.228c-5.072-5.068-11.82-7.86-19.032-7.86-7.208 0-13.964 2.792-19.036 7.86l-183.84 183.848L62.056 108.554c-5.064-5.068-11.82-7.856-19.028-7.856s-13.968 2.788-19.036 7.856l-16.12 16.128c-10.496 10.488-10.496 27.572 0 38.06l219.136 219.924c5.064 5.064 11.812 8.632 19.084 8.632h.084c7.212 0 13.96-3.572 19.024-8.632l218.932-219.328c5.072-5.064 7.856-12.016 7.864-19.224 0-7.212-2.792-14.068-7.864-19.128z" opacity="1"></path>
                                                </g>
                                            </svg>
                                        </a>
                                        <ul className={`ayur-submenu ${openSubmenu === "health" ? "ayur-submenu-open" : ""}`}>
                                            <li><Link href="/diseases/kidney">Kidney</Link></li>
                                            <li><Link href="/diseases/cancer">Cancer</Link></li>
                                            <li><Link href="/diseases/leucoderma">Leucoderma</Link></li>
                                            <li><Link href="/diseases/alzheimer">Alzheimer</Link></li>
                                            <li><Link href="/diseases/motor-neuron-disease">Motor Neuron</Link></li>
                                            <li><Link href="/diseases/fatty-liver">Fatty Liver</Link></li>
                                            <li><Link href="/diseases/parkinson">Parkinson</Link></li>
                                            <li><Link href="/diseases/psoriasis">Psoriasis</Link></li>
                                            <li><Link href="/diseases/pcod">PCOD</Link></li>
                                            <li><Link href="/diseases/erectile-dysfunction">ED</Link></li>
                                            <li><Link href="/diseases/eczema">Eczema</Link></li>
                                            <li><Link href="/diseases/jaundice">Jaundice</Link></li>
                                            <li><Link href="/diseases/gallbladder">Gallbladder</Link></li>
                                            <li><Link href="/diseases/diabetes">Diabetes</Link></li>
                                            <li><Link href="/diseases/arthritis">Arthritis</Link></li>
                                            <li><Link href="/diseases/cerebral-palsy">Cerebral Palsy</Link></li>
                                            <li><Link href="/diseases/panchkarma">Panchkarma</Link></li>
                                            <li><Link href="/diseases/liver-cirrhosis">Liver Cirrhosis</Link></li>
                                        </ul>
                                    </li>
                                    <li className={pathname === "/blog" ? "active" : ""}>
                                        <Link href="/blog">Blog</Link>
                                    </li>
                                    <li className={pathname === "/contact" ? "active" : ""}>
                                        <Link href="/contact">Contact</Link>
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

export default Navbar;
