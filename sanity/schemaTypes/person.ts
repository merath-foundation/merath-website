import {defineType, defineField} from 'sanity';

export const person = defineType({
  name: 'person',
  type: 'document',
  title: 'Person',
  fields: [
    defineField({name: 'name', type: 'string', title: 'Name', validation: (rule) => rule.required()}),
    defineField({name: 'nameAr', type: 'string', title: 'Name (Arabic)'}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'name', maxLength: 96}}),
    defineField({name: 'role', type: 'string', title: 'Role'}),
    defineField({name: 'roleAr', type: 'string', title: 'Role (Arabic)'}),
    defineField({name: 'formerMember', type: 'boolean', title: 'Former Member', initialValue: false}),
    defineField({name: 'bio', type: 'array', title: 'Bio', of: [{type: 'block'}]}),
    defineField({name: 'bioAr', type: 'array', title: 'Bio (Arabic)', of: [{type: 'block'}]}),
    defineField({name: 'photo', type: 'image', title: 'Photo', options: {hotspot: true}}),
  ],
  preview: {
    select: {title: 'name', subtitle: 'role', media: 'photo'},
  },
});