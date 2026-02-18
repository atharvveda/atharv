export function generateOrganizationSchema() {
    return {
        "@type": "MedicalBusiness",
        "@id": "https://atharvveda.us/#organization",
        "name": "Atharv Veda",
        "url": "https://atharvveda.us",
        "logo": {
            "@type": "ImageObject",
            "url": "https://atharvveda.us/assets/images/New-Logo.png"
        },
        "image": "https://atharvveda.us/assets/images/New-Logo.png",
        "telephone": "+1-646-624-3465",
        "email": "info@atharvveda.us",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "3523 Silverside Road Suite 201-B",
            "addressLocality": "Wilmington",
            "addressRegion": "DE",
            "postalCode": "19810",
            "addressCountry": "US",
        },
        "priceRange": "$$",
        "areaServed": "Worldwide"
    };
}

export function generateGlobalSchemaGraph() {
    const org = generateOrganizationSchema();

    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "WebSite",
                "@id": "https://atharvveda.us/#website",
                "url": "https://atharvveda.us",
                "name": "Atharv Veda",
                "publisher": { "@id": "https://atharvveda.us/#organization" },
                "potentialAction": {
                    "@type": "SearchAction",
                    "target": {
                        "@type": "EntryPoint",
                        "urlTemplate": "https://atharvveda.us/search?q={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                }
            },
            org,
            {
                "@type": "Physician",
                "@id": "https://atharvveda.us/#physician",
                "name": "Dr. Rahul Sharma",
                "image": "https://atharvveda.us/assets/images/admin.jpg",
                "medicalSpecialty": ["Ayurveda", "Nephrology"],
                "description": "Specialist in Ayurvedic treatment for chronic kidney diseases and autoimmune disorders with over 10 years of experience.",
                "telephone": org.telephone,
                "address": org.address,
                "memberOf": { "@id": "https://atharvveda.us/#organization" }
            }
        ]
    };
}
