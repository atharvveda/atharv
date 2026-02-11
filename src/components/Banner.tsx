"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectCreative } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-creative";

const Banner = () => {
    const not_active_slide_scale_value = 0.85;
    const not_active_slide_opacity_value = 0.5;

    return (
        <header className="ayur-banner-section" role="banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="ayur-banner-heading">
                            <h1 style={{ fontWeight: 800, lineHeight: "1.3", letterSpacing: "-0.5px" }}>
                                Integrative Ayurvedic Care for <br />
                                <span style={{ color: "#ffb300" }}>Kidney Disease & Chronic Conditions</span>
                            </h1>
                            <p className="mt-4 mb-5" style={{ fontSize: "1.25rem", maxWidth: "800px", margin: "0 auto", lineHeight: "1.7", color: "#000000ff" }}>
                                Atharv Veda combines ancient Ayurvedic wisdom with modern diagnostics to safely manage
                                <strong> Chronic Kidney Disease (CKD)</strong>, Diabetes, and lifestyle disorders.
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
                <div className="row mt-5">
                    <div className="col-lg-12">
                        <div className="ayur-banner-slider-sec">
                            <Swiper
                                modules={[Navigation, Autoplay, EffectCreative]}
                                slidesPerView={2}
                                loop={true}
                                centeredSlides={true}
                                grabCursor={true}
                                speed={1500}
                                autoplay={{
                                    delay: 4000,
                                    disableOnInteraction: true,
                                }}
                                effect="creative"
                                creativeEffect={{
                                    limitProgress: 2,
                                    prev: {
                                        opacity: not_active_slide_opacity_value,
                                        scale: not_active_slide_scale_value,
                                        translate: ["-65%", 0, 0],
                                    },
                                    next: {
                                        opacity: not_active_slide_opacity_value,
                                        scale: not_active_slide_scale_value,
                                        translate: ["65%", 0, 0],
                                    },
                                }}
                                navigation={{
                                    nextEl: ".swiper-button-next",
                                    prevEl: ".swiper-button-prev",
                                }}
                                breakpoints={{
                                    320: { slidesPerView: 1, speed: 900 },
                                    670: { slidesPerView: 1 },
                                    767: { slidesPerView: 2 },
                                    768: { slidesPerView: 2 },
                                }}
                                className="ayur-banner-slider"
                            >
                                {[1, 2, 3, 4, 5].map((item) => (
                                    <SwiperSlide key={item}>
                                        <div className="ayur-ban-slide">
                                            <Image
                                                src="/assets/images/ban-head-Image.png"
                                                alt="Ayurvedic Doctor Consultation for Kidney Disease"
                                                width={636}
                                                height={580}
                                                priority
                                                style={{ width: '100%', height: 'auto' }}
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}

                                <div className="swiper-button-prev">
                                    <svg width="46" height="22" viewBox="0 0 46 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.520424 9.74414L0.522022 9.74245L9.79254 0.51664C10.4871 -0.174498 11.6104 -0.171926 12.3017 0.522671C12.9929 1.21718 12.9903 2.34051 12.2958 3.03174L6.07152 9.22581H43.6452C44.6251 9.22581 45.4194 10.0201 45.4194 11C45.4194 11.9799 44.6251 12.7742 43.6452 12.7742H6.07161L12.2957 18.9683C12.9902 19.6595 12.9928 20.7828 12.3016 21.4773C11.6103 22.172 10.4869 22.1744 9.79245 21.4834L0.521931 12.2575L0.520336 12.2559C-0.17453 11.5623 -0.17231 10.4354 0.520424 9.74414Z" fill="#F6F1ED" />
                                    </svg>
                                </div>
                                <div className="swiper-button-next">
                                    <svg width="46" height="22" viewBox="0 0 46 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M44.899 9.74414L44.8974 9.74245L35.6269 0.51664C34.9324 -0.174498 33.8091 -0.171926 33.1177 0.522671C32.4265 1.21718 32.4292 2.34051 33.1237 3.03174L39.3479 9.22581H1.77419C0.794307 9.22581 0 10.0201 0 11C0 11.9799 0.794307 12.7742 1.77419 12.7742H39.3478L33.1238 18.9683C32.4293 19.6595 32.4266 20.7828 33.1178 21.4773C33.8091 22.172 34.9326 22.1744 35.627 21.4834L44.8975 12.2575L44.8991 12.2559C45.594 11.5623 45.5917 10.4354 44.899 9.74414Z" fill="white" />
                                    </svg>
                                </div>
                            </Swiper>
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
