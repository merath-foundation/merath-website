import {defineType, defineField} from 'sanity';

export const project = defineType({
  name: 'project',
  type: 'document',
  title: 'Project',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}}),
    defineField({
      name: 'subtitle',
      type: 'object',
      title: 'Subtitle',
      fields: [
        {name: 'en', type: 'string', title: 'English'},
        {name: 'ar', type: 'string', title: 'Arabic'},
      ],
    }),
    defineField({
      name: 'shortDescription',
      type: 'object',
      title: 'Short Description',
      fields: [
        {name: 'en', type: 'text', title: 'English'},
        {name: 'ar', type: 'text', title: 'Arabic'},
      ],
    }),
    defineField({
      name: 'fullDescription',
      type: 'object',
      title: 'Full Description',
      fields: [
        {name: 'en', type: 'array', title: 'English', of: [{type: 'block'}]},
        {name: 'ar', type: 'array', title: 'Arabic', of: [{type: 'block'}]},
      ],
    }),
    defineField({name: 'image', type: 'image', title: 'Image', options: {hotspot: true}}),
    defineField({name: 'sourceUrl', type: 'url', title: 'Source URL'}),
    defineField({name: 'order', type: 'number', title: 'Order'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle.en', media: 'image'},
  },
});