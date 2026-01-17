import {defineType, defineField} from 'sanity';

export const page = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}}),
    defineField({name: 'body', type: 'array', title: 'Body', of: [{type: 'block'}]}),
    defineField({
      name: 'sections',
      type: 'array',
      title: 'Sections',
      of: [
        defineField({
          name: 'section',
          type: 'object',
          title: 'Section',
          fields: [
            {name: 'heading', type: 'string', title: 'Heading'},
            {name: 'content', type: 'array', title: 'Content', of: [{type: 'block'}]},
            {name: 'images', type: 'array', title: 'Images', of: [{type: 'image'}]},
          ],
        }),
      ],
    }),
    defineField({name: 'sourceUrl', type: 'url', title: 'Source URL'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
    prepare: ({title, subtitle}) => ({title, subtitle: subtitle ? `/${subtitle}` : undefined}),
  },
});