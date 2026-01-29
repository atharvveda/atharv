export function generateOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "MedicalBusiness",
        "@id": "https://atharvveda.us/#organization",
        name: "Atharv Veda",
        url: "https://atharvveda.us",
        logo: "https://atharvveda.us/assets/images/New-Logo.png",
        image: "https://atharvveda.us/assets/images/New-Logo.png",
        telephone: "+13029669159",
        email: "info@atharvveda.us",
        address: {
            "@type": "PostalAddress",
            streetAddress: "3523 Silverside Road Suite 201-B",
            addressLocality: "Wilmington",
            addressRegion: "DE",
            postalCode: "19810",
            addressCountry: "US",
        },
        sameAs: [
            // Add verified social profiles when available
            // "https://www.facebook.com/atharvveda",
            // "https://www.instagram.com/atharvveda",
        ],
    };
}
