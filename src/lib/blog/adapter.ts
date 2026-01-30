import { BlogPost, BlogCardData } from './types';
import { blogs as fallbackBlogs } from '@/data/blogs';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

const CMS_ENABLED = process.env.NEXT_PUBLIC_CMS_ENABLED === 'true';

// GROQ Query for all posts
const POSTS_QUERY = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  description,
  author,
  category
}`;

// GROQ Query for single post
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0] {
  title,
  "slug": slug.current,
  publishedAt,
  mainImage,
  description,
  body,
  author,
  category,
  diseaseCategory,
  seoTitle,
  seoDescription,
  keywords
}`;

/**
 * Fetch all published blog posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
    if (!CMS_ENABLED) {
        return normalizeFallbackBlogs();
    }

    try {
        const posts = await client.fetch(POSTS_QUERY);
        return posts.map(transformSanityPost);
    } catch (error) {
        console.error('Sanity fetch error:', error);
        return normalizeFallbackBlogs();
    }
}

/**
 * Fetch a single blog post by slug
 */
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
    if (!CMS_ENABLED) {
        const fallback = normalizeFallbackBlogs();
        return fallback.find((post) => post.slug === slug) || null;
    }

    try {
        const post = await client.fetch(POST_QUERY, { slug });
        return post ? transformSanityPost(post) : null;
    } catch (error) {
        console.error('Sanity fetch error:', error);
        const fallback = normalizeFallbackBlogs();
        return fallback.find((post) => post.slug === slug) || null;
    }
}

/**
 * Transform Sanity post to BlogPost format
 */
function transformSanityPost(doc: any): BlogPost {
    // Basic Portable Text to HTML conversion (simplified for now)
    // For production, use @portabletext/react for formatting
    const content = doc.body ? portableTextToHtml(doc.body) : '';

    return {
        slug: doc.slug,
        title: doc.title,
        description: doc.description,
        content,
        author: doc.author || 'Dr. Rahul Sharma',
        authorBio: '', // Sanity schema doesn't have this yet
        category: doc.category || 'Ayurveda Medicine',
        diseaseCategory: doc.diseaseCategory || 'generic',
        image: doc.mainImage ? urlFor(doc.mainImage).url() : '/assets/images/blog-single.png',
        publishedAt: new Date(doc.publishedAt || new Date()),
        updatedAt: new Date(doc.publishedAt || new Date()),
        status: 'published',
        seoTitle: doc.seoTitle,
        seoDescription: doc.seoDescription,
        keywords: doc.keywords || [],
    };
}

/**
 * Simple Portable Text to HTML converter
 * This is a basic implementation. For rich content, use @portabletext/react
 */
function portableTextToHtml(blocks: any[]): string {
    if (!Array.isArray(blocks)) return '';

    return blocks.map(block => {
        if (block._type !== 'block' || !block.children) return '';

        let text = block.children.map((child: any) => child.text).join('');

        // Handle basic styles
        if (block.style === 'h1') return `<h1>${text}</h1>`;
        if (block.style === 'h2') return `<h2>${text}</h2>`;
        if (block.style === 'h3') return `<h3>${text}</h3>`;
        if (block.style === 'blockquote') return `<blockquote>${text}</blockquote>`;

        return `<p>${text}</p>`;
    }).join('');
}

/**
 * Convert BlogPost to BlogCardData (for existing components)
 */
export function toBlogCardData(post: BlogPost): BlogCardData {
    return {
        image: post.image,
        category: post.category,
        date: formatDate(post.publishedAt),
        title: post.title,
        description: post.description,
        slug: post.slug,
    };
}

/**
 * Normalize hardcoded blogs to BlogPost format
 */
function normalizeFallbackBlogs(): BlogPost[] {
    return fallbackBlogs.map((blog) => ({
        slug: blog.slug,
        title: blog.title,
        description: blog.content.substring(0, 200).replace(/<[^>]*>/g, '') + '...',
        content: blog.content,
        author: blog.author,
        category: 'Ayurveda Medicine',
        image: blog.image,
        publishedAt: parseDate(blog.date),
        status: 'published' as const,
    }));
}

/**
 * Format date for display
 */
function formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }).format(new Date(date));
}

/**
 * Parse date string to Date object
 */
function parseDate(dateStr: string): Date {
    return new Date(dateStr);
}
