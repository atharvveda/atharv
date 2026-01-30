export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    content: string;
    author: string;
    authorBio?: string;
    authorImage?: string;
    category: string;
    diseaseCategory?: string;
    image: string;
    publishedAt: Date;
    updatedAt?: Date;
    status: 'draft' | 'published';
    seoTitle?: string;
    seoDescription?: string;
    keywords?: string[];
}

// Normalized interface matching existing BlogCard props
export interface BlogCardData {
    image: string;
    category: string;
    date: string; // Formatted string for display
    title: string;
    description: string;
    slug: string;
}
