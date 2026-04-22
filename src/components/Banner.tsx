"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCreative, EffectFade } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";
import "swiper/css/effect-fade";

const heroImages = [
    "/Heroimages/hero-1.jpg",
    "/Heroimages/hero-2.jpeg",
    "/Heroimages/hero-3.jpeg",
    "/Heroimages/hero-4.jpeg",
    "/Heroimages/hero-5.jpeg",
    "/Heroimages/hero-6.jpeg",
    "/Heroimages/hero-7.jpeg",
    "/Heroimages/hero-8.jpeg",
    "/Heroimages/hero-9.jpeg",
    "/Heroimages/hero-10.jpeg",
    "/Heroimages/hero-11.jpeg"
];

const Banner = () => {
    const not_active_slide_scale_value = 0.85;
    const not_active_slide_opacity_value = 0.5;

    return (
        <header className="ayur-banner-section" role="banner" style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background Image Slider */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
                <Swiper
                    modules={[Autoplay, EffectFade]}
                    effect="fade"
                    fadeEffect={{ crossFade: true }}
                    loop={true}
                    speed={2000}
                    allowTouchMove={false}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    style={{ width: '100%', height: '100%' }}
                >
                    {heroImages.map((img, i) => (
                        <SwiperSlide key={i} style={{ height: '100%', width: '100%', position: 'relative' }}>
                            {/* Blurred background to fill empty space without zooming */}
                            <Image
                                src={img}
                                alt={`Hero background blur ${i + 1}`}
                                fill
                                style={{ objectFit: 'cover', filter: 'blur(20px)', transform: 'scale(1.1)', opacity: 0.6 }}
                                priority={i === 0}
                            />
                            {/* Actual image contained so it's not cropped/zoomed */}
                            <Image
                                src={img}
                                alt={`Hero image ${i + 1}`}
                                fill
                                style={{ objectFit: 'contain' }}
                                priority={i === 0}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Overlay to ensure text readability against any image */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.8) 100%)', zIndex: 1 }}></div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="ayur-banner-heading">
                            <h1 style={{ fontWeight: 800, lineHeight: "1.3", letterSpacing: "-0.5px", color: "#ffffff" }}>
                                Integrative Ayurvedic Care for <br />
                                <span style={{ color: "#ffb300" }}>Kidney Disease & Chronic Conditions</span>
                            </h1>
                            <p className="mt-4 mb-5" style={{ fontSize: "1.25rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.7", color: "#f8f9fa" }}>
                                Atharv Veda combines ancient Ayurvedic wisdom with modern diagnostics to safely manage
                                <strong style={{ color: "#ffffff" }}> Chronic Kidney Disease (CKD)</strong>, Diabetes, and lifestyle disorders.
                                Our specialized approach focuses on root-cause healing and preserving organ function.
                            </p>

                            <div className="d-flex justify-content-center gap-3 flex-wrap mb-5">
                                <Link href="/contact" className="ayur-btn shadow-lg" style={{ padding: "16px 32px", fontSize: "1.15rem", fontWeight: 700, borderRadius: "50px" }}>
                                    Book Consultation
                                </Link>
                                <Link href="/chronic-kidney-disease" className="ayur-btn" style={{ background: "rgba(255,255,255,0.1)", border: "2px solid #fff", color: "#fff", padding: "14px 30px", fontSize: "1.15rem", borderRadius: "50px", backdropFilter: "blur(5px)" }}>
                                    Explore Kidney Care
                                </Link>
                            </div>

                            <div className="mt-5 d-flex justify-content-center align-items-center gap-4 trust-badges" style={{ opacity: 0.95 }}>
                                <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-sm">
                                    <span style={{ fontSize: "1.2rem" }}>👨‍⚕️</span>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#00423b" }}>Medically Reviewed</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-sm">
                                    <span style={{ fontSize: "1.2rem" }}>🌿</span>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#00423b" }}>100% Herbal</span>
                                </div>
                                <div className="d-flex align-items-center gap-2 bg-white px-3 py-2 rounded-pill shadow-sm">
                                    <span style={{ fontSize: "1.2rem" }}>🛡️</span>
                                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#00423b" }}>US-Support</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
            <div className="ayur-ban-leaf">
                <Image src="/assets/images/ban-leafleft.png" alt="Ayurvedic herbs leaf" width={200} height={400} style={{ width: 'auto', height: 'auto' }} />
                <Image src="/assets/images/ban-leafright.png" alt="Ayurvedic herbs leaf" width={200} height={400} style={{ width: 'auto', height: 'auto' }} />
            </div>
        </header>
    );
};

export default Banner;
