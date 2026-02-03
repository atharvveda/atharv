// Basic Person Schema Generator
export function personSchema(props: {
  name: string;
  url: string;
  jobTitle: string;
  worksFor: string;
  specialty?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: props.name,
    url: props.url,
    jobTitle: props.jobTitle,
    worksFor: {
      "@type": "Organization",
      name: props.worksFor,
    },
    ...(props.specialty && { knowsAbout: props.specialty }),
    ...(props.image && { image: props.image }),
  };
}

export const reviewerSchema = personSchema({
  name: "Dr. Rahul Sharma",
  url: "https://atharvveda.us/dr-rahul-sharma",
  jobTitle: "Ayurvedic Physician",
  worksFor: "Atharv Veda",
  specialty: "Ayurveda, Kidney Disease",
});

