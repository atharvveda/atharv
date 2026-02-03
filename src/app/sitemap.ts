import { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog/adapter";

const baseUrl = "https://atharvveda.us";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date("2024-01-01"),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/dr-rahul-sharma`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/ayurvedic-treatment-of-kidney-diseases`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/herbal-treatment-of-kidney-disease`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/kidney-disease-stages`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/chronic-kidney-disease`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/shop`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Disease pages (hardcoded, not from CMS)
  const diseases = [
    "kidney",
    "cancer",
    "leucoderma",
    "alzheimer",
    "motor-neuron-disease",
    "fatty-liver",
    "parkinson",
    "psoriasis",
    "pcod",
    "erectile-dysfunction",
    "eczema",
    "jaundice",
    "gallbladder",
    "diabetes",
    "arthritis",
    "cerebral-palsy",
    "panchkarma",
    "liver-cirrhosis",
  ];

  const diseasePages: MetadataRoute.Sitemap = diseases.map((slug) => ({
    url: `${baseUrl}/diseases/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Blog posts (from adapter - CMS or fallback)
  const blogPosts = await getBlogPosts();
  const blogPages: MetadataRoute.Sitemap = blogPosts
    .filter((post) => post.status === 'published') // Exclude drafts
    .map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt || post.publishedAt || now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  return [...staticPages, ...diseasePages, ...blogPages];
}
