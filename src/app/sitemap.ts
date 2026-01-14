import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://atharvveda.us'; // Assuming this as the base URL based on previous info

  const diseases = [
    'kidney', 'cancer', 'leucoderma', 'alzheimer', 'motor-neuron-disease',
    'fatty-liver', 'parkinson', 'psoriasis', 'pcod', 'erectile-dysfunction',
    'eczema', 'jaundice', 'gallbladder', 'diabetes', 'arthritis',
    'cerebral-palsy', 'panchkarma', 'liver-cirrhosis'
  ];

  const diseaseUrls = diseases.map((disease) => ({
    url: `${baseUrl}/diseases/${disease}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
  ];

  return [...staticUrls, ...diseaseUrls];
}
