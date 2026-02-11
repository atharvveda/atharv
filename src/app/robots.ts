import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: [
                    '/api/',
                    '/admin/',
                    '/shop/checkout',
                    '/_next/',
                    '/private/',
                ],
            },
            {
                userAgent: 'GPTBot',
                allow: '/',
            },
            {
                userAgent: 'CCBot',
                allow: '/',
            },
        ],
        sitemap: 'https://atharvveda.us/sitemap.xml',
        host: 'https://atharvveda.us',
    };
}
