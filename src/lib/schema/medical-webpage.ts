export interface MedicalWebPageProps {
    title: string;
    description: string;
    url: string;
    datePublished: string;
    dateModified: string;
    conditionName: string;
    conditionDescription: string;
    reviewerName: string;
    reviewerCredentials: string;
}

export function generateMedicalWebPageSchema(props: MedicalWebPageProps) {
    return {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: props.title,
        description: props.description,
        url: props.url,
        datePublished: props.datePublished,
        dateModified: props.dateModified,
        reviewedBy: {
            "@type": "Person",
            name: props.reviewerName,
            jobTitle: "Ayurvedic Physician",
            hasCredential: props.reviewerCredentials.split(", ").map((cred) => ({
                "@type": "EducationalOccupationalCredential",
                credentialCategory: cred,
            })),
        },
        mainEntity: {
            "@type": "MedicalCondition",
            name: props.conditionName,
            description: props.conditionDescription,
        },
        medicalAudience: {
            "@type": "MedicalAudience",
            audienceType: "Patient",
        },
    };
}
