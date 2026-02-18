import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Archivo, Inter } from "next/font/google";
import Script from "next/script";
import "../../styles/bootstrap.min.css";
import "../../styles/font-awesome.min.css";
import "../../styles/select2.min.css";
import "../../styles/flatpickr.min.css";
import "../../styles/swiper-bundle.min.css";
import "../../styles/style.css";
import "../../styles/responsive.css";
import "../../styles/login.css";
import "../globals.css";

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
  description:
    "Discover the best Ayurvedic treatments for chronic diseases. Expert doctors specializing in Kidney, Cancer, and 18+ health concerns using natural, holistic healing.",
  keywords: [
    "Atharv Veda",
    "Ayurveda Treatment",
    "Ayurvedic Hospital",
    "Kidney Treatment Ayurveda",
    "Natural Healing",
    "Holistic Medicine",
    "Ayurvedic Doctor USA",
    "Ayurveda for Kidney Failure",
  ],
  authors: [{ name: "Dr. Rahul Sharma" }],
  creator: "Atharv Veda",
  publisher: "Atharv Veda",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  // alternates: {
  //   canonical: "/",
  // },
  openGraph: {
    title: "Atharv Veda - Best Ayurveda Treatment",
    description:
      "Personalized Ayurvedic care for chronic health concerns guided by expert doctors.",
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
    description:
      "Expert Ayurvedic care for chronic diseases using natural healing methods.",
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
import { generateGlobalSchemaGraph } from "@/lib/schema/organization";

const globalSchemaGraph = generateGlobalSchemaGraph();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en-US" suppressHydrationWarning>
        <head>
          {/* Google Tag Manager */}
          <Script id="gtm-script" strategy="beforeInteractive">
            {`
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-TD492XD4');
    `}
          </Script>
          {/* End Google Tag Manager */}

          {/* Ahrefs Web Analytics */}
          <Script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key="SIKdrSujSdMovr9jcFfYIw"
            strategy="afterInteractive"
          />
        </head>


        <body className={`${archivo.variable} ${inter.variable}`}>
          {/* Google Tag Manager (noscript) */}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-TD492XD4"
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
          {/* End Google Tag Manager (noscript) */}

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchemaGraph) }}
          />

          <Navbar />
          {children}
          <Footer />
          <FloatingContact />
        </body>
      </html>
    </ClerkProvider>
  );
}
