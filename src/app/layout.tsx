import type { Metadata } from "next";
import { Archivo, Inter } from "next/font/google";
import "../styles/bootstrap.min.css";
import "../styles/font-awesome.min.css";
import "../styles/select2.min.css";
import "../styles/flatpickr.min.css";
import "../styles/swiper-bundle.min.css";
import "../styles/style.css";
import "../styles/responsive.css";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://atharvveda.us"),
  title: {
    default: "Atharv Veda - Best Ayurveda Treatment & Holistic Healing",
    template: "%s | Atharv Veda",
  },
  description: "Discover the best Ayurvedic treatments for chronic diseases. Expert doctors specializing in Kidney, Cancer, and 18+ health concerns using natural, holistic healing.",
  keywords: ["Atharv Veda", "Ayurveda Treatment", "Ayurvedic Hospital", "Kidney Treatment Ayurveda", "Natural Healing", "Holistic Medicine", "Ayurvedic Doctor USA", "Ayurveda for Kidney Failure"],
  authors: [{ name: "Dr. Rahul Sharma" }],
  creator: "Atharv Veda",
  publisher: "Atharv Veda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Atharv Veda - Best Ayurveda Treatment",
    description: "Personalized Ayurvedic care for chronic health concerns guided by expert doctors.",
    url: "https://atharvveda.us",
    siteName: "Atharv Veda",
    images: [
      {
        url: "/assets/images/New-Logo.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Atharv Veda - Best Ayurveda Treatment",
    description: "Expert Ayurvedic care for chronic diseases using natural healing methods.",
    images: ["/assets/images/New-Logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";

const medicalSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "MedicalBusiness",
      "name": "Atharv Veda",
      "image": "https://atharvveda.us/assets/images/New-Logo.png",
      "@id": "https://atharvveda.us",
      "url": "https://atharvveda.us",
      "telephone": "+13029669159",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "3523 Silverside Road Suite 201-B",
        "addressLocality": "Wilmington",
        "addressRegion": "DE",
        "postalCode": "19810",
        "addressCountry": "US"
      }
    },
    {
      "@type": "Physician",
      "name": "Dr. Rahul Sharma",
      "image": "https://atharvveda.us/assets/images/admin.jpg",
      "medicalSpecialty": ["Ayurveda", "Nephrology"],
      "description": "Specialist in Ayurvedic treatment for chronic kidney diseases and autoimmune disorders with over 10 years of experience.",
      "memberOf": {
        "@type": "Organization",
        "name": "Atharv Veda"
      }
    }
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${inter.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(medicalSchema) }}
        />
        <Navbar />
        {children}
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
