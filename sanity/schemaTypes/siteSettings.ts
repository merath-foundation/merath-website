import {defineType, defineField} from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  title: 'Site Settings',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Site Title', validation: (rule) => rule.required()}),
    defineField({name: 'titleAr', type: 'string', title: 'Site Title (Arabic)'}),
    defineField({name: 'description', type: 'text', title: 'Description'}),
    defineField({name: 'descriptionAr', type: 'text', title: 'Description (Arabic)'}),
    defineField({name: 'logo', type: 'image', title: 'Logo', options: {hotspot: true}}),
    defineField({name: 'favicon', type: 'image', title: 'Favicon'}),
    defineField({
      name: 'footerLinks',
      type: 'array',
      title: 'Footer Links',
      of: [{
        type: 'object',
        fields: [
          {name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required()},
          {name: 'labelAr', type: 'string', title: 'Label (Arabic)'},
          {name: 'href', type: 'string', title: 'Href'},
          {name: 'order', type: 'number', title: 'Order'},
        ],
      }],
    }),
    defineField({name: 'footerNote', type: 'text', title: 'Footer Note'}),
    defineField({name: 'footerNoteAr', type: 'text', title: 'Footer Note (Arabic)'}),
    defineField({
      name: 'socialMedia',
      type: 'object',
      title: 'Social Media Links',
      fields: [
        {name: 'instagram', type: 'url', title: 'Instagram URL'},
        {name: 'twitter', type: 'url', title: 'X (Twitter) URL'},
        {name: 'facebook', type: 'url', title: 'Facebook URL'},
        {name: 'linkedin', type: 'url', title: 'LinkedIn URL'},
        {name: 'youtube', type: 'url', title: 'YouTube URL'},
      ],
    }),
    defineField({
      type: 'object',
      title: 'Default SEO',
      fields: [
        {name: 'title', type: 'string', title: 'SEO Title'},
        {name: 'titleAr', type: 'string', title: 'SEO Title (Arabic)'},
        {name: 'description', type: 'text', title: 'SEO Description'},
        {name: 'descriptionAr', type: 'text', title: 'SEO Description (Arabic)'},
        {name: 'image', type: 'image', title: 'SEO Image'},
      ],
    }),
  ],
  preview: {
    select: {title: 'title', media: 'logo'},
  },
});