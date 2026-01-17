import {defineType, defineField} from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Site Title', validation: (rule) => rule.required()}),
    defineField({name: 'description', type: 'text', title: 'Description'}),
    defineField({name: 'logo', type: 'image', title: 'Logo', options: {hotspot: true}}),
    defineField({name: 'favicon', type: 'image', title: 'Favicon'}),
    defineField({
      name: 'defaultSeo',
      type: 'object',
      title: 'Default SEO',
      fields: [
        {name: 'title', type: 'string', title: 'SEO Title'},
        {name: 'description', type: 'text', title: 'SEO Description'},
        {name: 'image', type: 'image', title: 'SEO Image'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'logo'},
  },
});