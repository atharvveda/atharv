export interface MedicalWebPageSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  conditionName?: string;
  conditionDescription?: string;
  reviewerName: string;
  reviewerCredentials: string;
}

export function generateMedicalWebPageSchema(
  props: MedicalWebPageSchemaProps
) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "headline": props.title,
    "description": props.description,
    "url": props.url,
    "datePublished": props.datePublished,
    "dateModified": props.dateModified,
    "mainEntity": props.conditionName ? {
      "@type": "MedicalCondition",
      "name": props.conditionName,
      "description": props.conditionDescription
    } : undefined,
    "medicalAudience": {
      "@type": "MedicalAudience",
      "audienceType": "Patient",
    },
    "reviewedBy": {
      "@type": "Person",
      "name": props.reviewerName,
      "honorificSuffix": props.reviewerCredentials,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Atharv Veda",
      "logo": {
        "@type": "ImageObject",
        "url": "https://atharvveda.us/assets/images/New-Logo.png"
      }
    }
  };
}
