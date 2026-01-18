import {defineField, defineType} from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  type: 'document',
  title: 'Home Page',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title'}),
    defineField({name: 'titleAr', type: 'string', title: 'Title (Arabic)'}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}}),
    defineField({name: 'heroSubtitle', type: 'text', title: 'Hero Subtitle'}),
    defineField({name: 'heroSubtitleAr', type: 'text', title: 'Hero Subtitle (Arabic)'}),
    defineField({name: 'heroDescription', type: 'text', title: 'Hero Description'}),
    defineField({name: 'heroDescriptionAr', type: 'text', title: 'Hero Description (Arabic)'}),
    defineField({name: 'heroDescriptionSecondary', type: 'text', title: 'Hero Description Secondary'}),
    defineField({name: 'heroDescriptionSecondaryAr', type: 'text', title: 'Hero Description Secondary (Arabic)'}),
    defineField({
      name: 'cards',
      type: 'array',
      title: 'Hero Cards',
      validation: (Rule) => Rule.max(6),
      of: [
        defineField({
          name: 'card',
          type: 'object',
          title: 'Card',
          fields: [
            {name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required()},
            {name: 'titleAr', type: 'string', title: 'Title (Arabic)'},
            {name: 'description', type: 'text', title: 'Description'},
            {name: 'descriptionAr', type: 'text', title: 'Description (Arabic)'},
            {name: 'ctaLabel', type: 'string', title: 'CTA Label'},
            {name: 'ctaLabelAr', type: 'string', title: 'CTA Label (Arabic)'},
            {name: 'ctaHref', type: 'string', title: 'CTA Href'},
            {name: 'order', type: 'number', title: 'Order'},
          ],
        }),
      ],
    }),
    defineField({name: 'projectShowcaseImages', type: 'array', title: 'Project Showcase Images', of: [{type: 'image'}]}),
    defineField({name: 'sourceUrl', type: 'url', title: 'Source URL'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
    prepare: ({title, subtitle}) => ({title: title || 'Home Page', subtitle: subtitle ? `/${subtitle}` : undefined}),
  },
});
