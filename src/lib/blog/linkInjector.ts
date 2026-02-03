interface Anchor {
  url: string;
  texts: string[];
}

interface CategoryLinkConfig {
  pillar: Anchor;
  disease: Anchor;
  secondary?: Anchor[];
}

/**
 * SEO-optimized internal link configuration
 * Built for US medical SEO + topical authority
 */
const CATEGORY_LINKS: Record<string, CategoryLinkConfig> = {
  kidney: {
    pillar: {
      url: "https://atharvveda.us/ayurvedic-treatment-of-kidney-diseases",
      texts: [
        "ayurvedic treatment of kidney diseases",
        "natural and herbal treatment for kidney disease",
        "holistic kidney disease treatment guide",
        "kidney disease treatment approach",
        "natural kidney treatment"
      ]
    },
    disease: {
      url: "https://atharvveda.us/diseases/kidney",
      texts: [
        "Ayurvedic kidney treatment options",
        "kidney disease care options",
        "kidney health consultation"
      ]
    },
    secondary: [
      {
        url: "https://atharvveda.us/chronic-kidney-disease",
        texts: [
          "chronic kidney disease",
          "CKD",
          "long-term kidney disease"
        ]
      },
      {
        url: "https://atharvveda.us/kidney-disease-stages",
        texts: [
          "stages of kidney disease",
          "CKD stages",
          "kidney disease progression"
        ]
      },
      {
        url: "https://atharvveda.us/herbal-treatment-of-kidney-disease",
        texts: [
          "herbal treatment of kidney disease",
          "natural kidney treatment",
          "plant-based kidney support",
          "herbal kidney treatment"
        ]
      }
    ]
  }
};

/**
 * Picks a random anchor text (prevents over-optimization)
 */
function pickRandom(texts: string[]) {
  return texts[Math.floor(Math.random() * texts.length)];
}

/**
 * Injects SEO-safe internal links into blog content
 * Rules:
 * - Max 3 internal links per article
 * - Contextual keyword matching
 * - Pillar link early
 * - Secondary links only if keyword exists
 * - Disease CTA at the end
 */
export function injectInternalLinks(
  content: string,
  category?: string
): string {
  if (!category || !CATEGORY_LINKS[category]) return content;

  const config = CATEGORY_LINKS[category];
  let updated = content;
  let linksInserted = 0;

  // ---------- 1. Pillar Link (after first paragraph) ----------
  const firstParagraphEnd = updated.indexOf("</p>");
  if (firstParagraphEnd !== -1 && linksInserted < 1) {
    const anchorText = pickRandom(config.pillar.texts);
    const pillarHTML = ` Learn more in our <a href="${config.pillar.url}">${anchorText}</a>.`;
    updated =
      updated.slice(0, firstParagraphEnd) +
      pillarHTML +
      updated.slice(firstParagraphEnd);
    linksInserted++;
  }

  // ---------- 2. Contextual Secondary Links ----------
  if (config.secondary) {
    for (const sec of config.secondary) {
      if (linksInserted >= 3) break;

      for (const keyword of sec.texts) {
        const regex = new RegExp(`\\b(${keyword})\\b`, "i");
        if (regex.test(updated)) {
          updated = updated.replace(
            regex,
            `<a href="${sec.url}">$1</a>`
          );
          linksInserted++;
          break;
        }
      }
    }
  }

  // ---------- 3. Disease CTA (end of content) ----------
  if (linksInserted < 3) {
    const diseaseText = pickRandom(config.disease.texts);
    updated += `
      <p style="margin-top:24px;font-weight:500;">
        Explore our <a href="${config.disease.url}">${diseaseText}</a> for personalized guidance.
      </p>
    `;
  }

  return updated;
}
