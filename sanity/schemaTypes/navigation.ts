import {defineType, defineField} from 'sanity';

export const navigation = defineType({
  name: 'navigation',
  type: 'document',
  title: 'Navigation',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required()}),
    defineField({
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Nav Item',
          fields: [
            {name: 'label', type: 'string', title: 'Label', validation: (rule) => rule.required()},
            {name: 'labelAr', type: 'string', title: 'Label (Arabic)'},
            {name: 'href', type: 'url', title: 'Href'},
            {name: 'pageRef', type: 'reference', to: [{type: 'page'}], title: 'Page Reference'},
            {name: 'order', type: 'number', title: 'Order'},
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
});