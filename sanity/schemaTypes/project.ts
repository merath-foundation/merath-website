import {defineType, defineField} from 'sanity';

export const project = defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    defineField({name: 'titleEn', type: 'string', title: 'Title (English)', validation: (rule) => rule.required()}),
    defineField({name: 'titleAr', type: 'string', title: 'Title (Arabic)'}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'titleEn', maxLength: 96}}),
    defineField({name: 'excerptEn', type: 'text', title: 'Excerpt (English)'}),
    defineField({name: 'excerptAr', type: 'text', title: 'Excerpt (Arabic)'}),
    defineField({name: 'categoryEn', type: 'string', title: 'Category (English)'}),
    defineField({name: 'categoryAr', type: 'string', title: 'Category (Arabic)'}),
    defineField({name: 'image', type: 'image', title: 'Thumbnail Image', options: {hotspot: true}}),
    defineField({name: 'bodyEn', type: 'array', title: 'Body (English)', of: [{type: 'block'}]}),
    defineField({name: 'bodyAr', type: 'array', title: 'Body (Arabic)', of: [{type: 'block'}]}),
    defineField({name: 'year', type: 'string', title: 'Year'}),
    defineField({name: 'order', type: 'number', title: 'Order'}),
    defineField({name: 'featured', type: 'boolean', title: 'Featured', initialValue: false, description: 'Show in featured section above the grid'}),
    defineField({name: 'sourceUrl', type: 'url', title: 'Source URL'}),
    defineField({name: 'footerNoteOverride', type: 'text', title: 'Footer Note Override'}),
    defineField({name: 'footerNoteOverrideAr', type: 'text', title: 'Footer Note Override (Arabic)'}),
  ],
  preview: {
    select: {title: 'titleEn', subtitle: 'categoryEn', media: 'image'},
    prepare: ({title, subtitle, media}) => ({title, subtitle, media}),
  },
});