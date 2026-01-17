import {defineType, defineField} from 'sanity';

export const person = defineType({
  name: 'person',
  type: 'document',
  title: 'Person',
  fields: [
    defineField({name: 'name', type: 'string', title: 'Name', validation: (rule) => rule.required()}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'name', maxLength: 96}}),
    defineField({name: 'role', type: 'string', title: 'Role'}),
    defineField({name: 'bio', type: 'array', title: 'Bio', of: [{type: 'block'}]}),
    defineField({name: 'photo', type: 'image', title: 'Photo', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
});