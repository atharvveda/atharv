import { defineField, defineType } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Dr. Rahul Sharma',
    }),

    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: { hotspot: true },
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Ayurveda Medicine', value: 'Ayurveda Medicine' },
          { title: 'Health Tips', value: 'Health Tips' },
          { title: 'Wellness', value: 'Wellness' },
          { title: 'Herbal Remedies', value: 'Herbal Remedies' },
        ],
      },
      initialValue: 'Ayurveda Medicine',
    }),

    defineField({
      name: 'diseaseCategory',
      title: 'Disease Category',
      type: 'string',
      options: {
        list: [
          { title: 'None / Generic', value: 'generic' },
          { title: 'Kidney Disease', value: 'kidney' },
        ],
      },
      initialValue: 'generic',
      description: 'Select to enable automatic SEO internal linking to pillar pages.',
    }),

    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Brief description for SEO and blog cards',
    }),

    // ✅ MAIN FIX — PORTABLE TEXT WITH LINK SUPPORT
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Numbered', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'External link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },

        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
    }),

    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
    }),

    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})
