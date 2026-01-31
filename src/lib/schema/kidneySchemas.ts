import { generateArticleSchema, ArticleSchemaProps } from "./article";
import { generateMedicalWebPageSchema, MedicalWebPageSchemaProps } from "./medical-webpage";
import { generateFaqSchema, FaqItem } from "./faq";
import { generateBreadcrumbSchema, BreadcrumbItem } from "./breadcrumb";
import { reviewerSchema } from "./person";

export interface KidneySchemaConfig {
  articleProps: ArticleSchemaProps;
  medicalProps: MedicalWebPageSchemaProps;
  faqs: FaqItem[];
  breadcrumbs: BreadcrumbItem[];
}

export function generateKidneyPageSchemas(config: KidneySchemaConfig) {
  return [
    generateArticleSchema(config.articleProps),
    generateMedicalWebPageSchema(config.medicalProps),
    generateFaqSchema(config.faqs),
    generateBreadcrumbSchema(config.breadcrumbs),
    reviewerSchema
  ];
}

export { generateArticleSchema, generateMedicalWebPageSchema, generateFaqSchema, generateBreadcrumbSchema };
