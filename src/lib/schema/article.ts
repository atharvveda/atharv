export interface ArticleSchemaProps {
    title: string;
    description: string;
    url: string;
    imageUrl: string;
    datePublished: string;
    dateModified: string;
    authorName: string;
    authorUrl?: string;
}

export function generateArticleSchema(props: ArticleSchemaProps) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: props.title,
        description: props.description,
        image: props.imageUrl,
        datePublished: props.datePublished,
        dateModified: props.dateModified,
        author: {
            "@type": "Person",
            name: props.authorName,
            url: props.authorUrl || "https://atharvveda.us/about",
        },
        publisher: {
            "@type": "Organization",
            name: "Atharv Veda",
            logo: {
                "@type": "ImageObject",
                url: "https://atharvveda.us/assets/images/New-Logo.png",
            },
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": props.url,
        },
    };
}
