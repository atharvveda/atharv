import { BlogPost } from './types';

interface LinkConfig {
    pillar: { url: string; text: string };
    disease: { url: string; text: string };
}

const CATEGORY_LINKS: Record<string, LinkConfig> = {
    kidney: {
        pillar: {
            url: 'https://atharvveda.us/ayurvedic-treatment-of-kidney-diseases',
            text: 'ayurvedic treatment of kidney diseases'
        },
        disease: {
            url: 'https://atharvveda.us/diseases/kidney',
            text: 'Ayurvedic kidney treatment options'
        }
    }
};

/**
 * Injects internal links into blog content based on disease category.
 * Rules:
 * 1. Pillar link: Inserted at the end of the first paragraph.
 * 2. Disease link: Inserted at the end of the content.
 */
export function injectInternalLinks(content: string, category?: string): string {
    if (!category || category === 'generic' || !CATEGORY_LINKS[category]) {
        return content;
    }

    const config = CATEGORY_LINKS[category];
    let newContent = content;

    // 1. Inject Pillar Link (First 20% - typically after first paragraph)
    // We look for the first closing </p> tag
    const firstParagraphEndIndex = newContent.indexOf('</p>');

    if (firstParagraphEndIndex !== -1) {
        const pillarLinkHtml = ` Learn more about <a href="${config.pillar.url}" style="color: #cd8973; text-decoration: underline;">${config.pillar.text}</a>.`;
        newContent = newContent.slice(0, firstParagraphEndIndex) + pillarLinkHtml + newContent.slice(firstParagraphEndIndex);
    } else {
        // Fallback: Prepend if no paragraph found (unlikely with Lexical)
        const pillarLinkHtml = `<p>Learn more about <a href="${config.pillar.url}" style="color: #cd8973; text-decoration: underline;">${config.pillar.text}</a>.</p>`;
        newContent = pillarLinkHtml + newContent;
    }

    // 2. Inject Disease Link (Near End)
    // We strictly append a new paragraph at the end
    const diseaseLinkHtml = `<p style="margin-top: 20px; font-weight: 500;">Explore our full range of <a href="${config.disease.url}" style="color: #cd8973; text-decoration: underline;">${config.disease.text}</a>.</p>`;
    newContent = newContent + diseaseLinkHtml;

    return newContent;
}
