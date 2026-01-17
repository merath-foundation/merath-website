import {defineType, defineField} from 'sanity';

export const publication = defineType({
  name: 'publication',
  type: 'document',
  title: 'Publication',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}}),
    defineField({name: 'code', type: 'string', title: 'Code', description: 'Short monogram such as TOM, SOC'}),
    defineField({name: 'publishedMonth', type: 'string', title: 'Published Month', description: 'ISO month 01-12'}),
    defineField({name: 'publishedYear', type: 'number', title: 'Published Year'}),
    defineField({name: 'publishedDate', type: 'date', title: 'Published Date', options: {dateFormat: 'YYYY-MM-DD'}}),
    defineField({name: 'summary', type: 'text', title: 'Summary'}),
    defineField({name: 'body', type: 'array', title: 'Body', of: [{type: 'block'}]}),
    defineField({name: 'authors', type: 'array', title: 'Authors', of: [{type: 'reference', to: [{type: 'person'}]}]}),
    defineField({name: 'topics', type: 'array', title: 'Topics/Tags', of: [{type: 'string'}]}),
    defineField({name: 'heroImage', type: 'image', title: 'Hero Image', options: {hotspot: true}}),
    defineField({name: 'attachments', type: 'array', title: 'Attachments', of: [{type: 'file'}]}),
    defineField({name: 'sourceUrl', type: 'url', title: 'Source URL'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'code', media: 'heroImage'},
    prepare: ({title, subtitle, media}) => ({title, subtitle: subtitle ? `Code: ${subtitle}` : undefined, media}),
  },
});