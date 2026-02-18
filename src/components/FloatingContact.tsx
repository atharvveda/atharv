"use client";
import React from "react";

const FloatingContact = () => {
  const phone = "+16466243465";
  const wa = "16466243465";
  const displayPhone = "+1 (646) 624 3465";

  return (
    <div className="ayur-float-contact">
      <a
        className="ayur-float-btn ayur-float-whatsapp"
        href={`https://wa.me/${wa}?text=Hello%20Atharv%20Veda`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp: ${displayPhone}`}
        title={`WhatsApp: ${displayPhone}`}
      >
        <img src="/assets/images/wp.png" alt="WhatsApp" style={{ width: "18px", height: "18px" }} />
        <span>WhatsApp</span>
      </a>
      <a
        className="ayur-float-btn ayur-float-call"
        href={`tel:${phone}`}
        aria-label={`Call Now: ${displayPhone}`}
        title={`Call Now: ${displayPhone}`}
      >
        <img src="/assets/images/call.png" alt="Call" style={{ width: "18px", height: "18px" }} />
        <span>Call Now</span>
      </a>
      <style jsx>{`
        .ayur-float-contact {
          position: fixed;
          left: 20px;
          bottom: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          z-index: 99999;
        }
        .ayur-float-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #000;
          padding: 12px 14px;
          border-radius: 999px;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);
          font-weight: 700;
          text-decoration: none;
          font-size: 15px;
          transition: transform 150ms ease, opacity 150ms ease;
        }
        .ayur-float-btn:hover {
          transform: translateY(-3px);
        }
        .ayur-float-whatsapp {
          background: #25d366;
          color: #fff;
        }
        .ayur-float-call {
          background: #fff;
          color: #000;
        }
        @media (max-width: 480px) {
          .ayur-float-contact {
            left: 12px;
            bottom: 12px;
          }
          .ayur-float-btn {
            padding: 10px;
          }
          .ayur-float-btn span {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingContact;
