import {defineType, defineField} from 'sanity';

export const page = defineType({
  name: 'page',
  type: 'document',
  title: 'Page',
  fields: [
    defineField({name: 'title', type: 'string', title: 'Title', validation: (rule) => rule.required()}),
    defineField({name: 'titleAr', type: 'string', title: 'Title (Arabic)'}),
    defineField({name: 'slug', type: 'slug', title: 'Slug', options: {source: 'title', maxLength: 96}}),
    defineField({name: 'body', type: 'array', title: 'Body', of: [{type: 'block'}]}),
    defineField({name: 'bodyAr', type: 'array', title: 'Body (Arabic)', of: [{type: 'block'}]}),
    defineField({
      name: 'snakeArtifacts',
      type: 'array',
      title: 'Snake Artifacts (About page game)',
      of: [
        defineField({
          name: 'artifact',
          type: 'object',
          title: 'Artifact',
          fields: [
            {name: 'label', type: 'string', title: 'Label'},
            {name: 'labelAr', type: 'string', title: 'Label (Arabic)'},
            {name: 'pageRef', type: 'reference', to: [{type: 'page'}], title: 'Link to page (optional)'},
            {name: 'color', type: 'string', title: 'Color (hex)', description: 'Optional color for the artifact tile'},
          ],
        }),
      ],
    }),
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
            {name: 'headingAr', type: 'string', title: 'Heading (Arabic)'},
            {name: 'content', type: 'array', title: 'Content', of: [{type: 'block'}]},
            {name: 'contentAr', type: 'array', title: 'Content (Arabic)', of: [{type: 'block'}]},
            {name: 'images', type: 'array', title: 'Images', of: [{type: 'image'}]},
          ],
        }),
      ],
    }),
    defineField({name: 'sourceUrl', type: 'url', title: 'Source URL'}),
    defineField({name: 'teamSectionTitle', type: 'string', title: 'Team Section Title', description: 'Title for the team section (default: "Team")'}),
    defineField({name: 'teamSectionTitleAr', type: 'string', title: 'Team Section Title (Arabic)', description: 'Title for the team section in Arabic (default: "الفريق")'}),
    defineField({name: 'footerNoteOverride', type: 'text', title: 'Footer Note Override', description: 'Note displayed at the bottom of the page (e.g., team footnote)'}),
    defineField({name: 'footerNoteOverrideAr', type: 'text', title: 'Footer Note Override (Arabic)', description: 'Note displayed at the bottom of the page in Arabic'}),
  ],
  preview: {
    select: {title: 'title', subtitle: 'slug.current'},
    prepare: ({title, subtitle}) => ({title, subtitle: subtitle ? `/${subtitle}` : undefined}),
  },
});