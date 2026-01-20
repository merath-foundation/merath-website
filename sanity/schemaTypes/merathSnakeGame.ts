import {defineField, defineType} from 'sanity'

// Localized string helper used inline in fields
const localizedStringFields = [
  defineField({name: 'en', type: 'string', title: 'English'}),
  defineField({name: 'ar', type: 'string', title: 'Arabic'}),
]

export const merathSnakeGame = defineType({
  name: 'merathSnakeGame',
  type: 'document',
  title: 'Merath Snake Game',
  fields: [
    defineField({name: 'titleEn', type: 'string', title: 'Heading (English)'}),
    defineField({name: 'titleAr', type: 'string', title: 'Heading (Arabic)'}),
    defineField({name: 'descriptionEn', type: 'array', title: 'Description (English)', of: [{type: 'block'}]}),
    defineField({name: 'descriptionAr', type: 'array', title: 'Description (Arabic)', of: [{type: 'block'}]}),
    defineField({name: 'captionEn', type: 'string', title: 'Caption (English)'}),
    defineField({name: 'captionAr', type: 'string', title: 'Caption (Arabic)'}),
    defineField({name: 'gameOverTitleEn', type: 'string', title: 'Game Over Title (English)'}),
    defineField({name: 'gameOverTitleAr', type: 'string', title: 'Game Over Title (Arabic)'}),
    defineField({name: 'gameOverSubtitleEn', type: 'string', title: 'Game Over Subtitle (English)'}),
    defineField({name: 'gameOverSubtitleAr', type: 'string', title: 'Game Over Subtitle (Arabic)'}),
    defineField({name: 'playAgainLabelEn', type: 'string', title: 'Play Again Label (English)', initialValue: 'Play again'}),
    defineField({name: 'playAgainLabelAr', type: 'string', title: 'Play Again Label (Arabic)'}),
    defineField({name: 'scoreLabelEn', type: 'string', title: 'Score Label (English)', initialValue: 'Score'}),
    defineField({name: 'scoreLabelAr', type: 'string', title: 'Score Label (Arabic)'}),
    defineField({name: 'controlsHintEn', type: 'string', title: 'Controls Hint (English)', initialValue: 'Use arrow keys or WASD to move'}),
    defineField({name: 'controlsHintAr', type: 'string', title: 'Controls Hint (Arabic)'}),
    defineField({name: 'specialItemDescriptionEn', type: 'string', title: 'Special Item Description (English)'}),
    defineField({name: 'specialItemDescriptionAr', type: 'string', title: 'Special Item Description (Arabic)'}),
    defineField({
      name: 'memoryFragments',
      type: 'array',
      title: 'Memory Fragments',
      description: 'Short textual fragments surfaced in overlays or hints',
      of: [
        defineField({
          name: 'fragment',
          type: 'object',
          title: 'Fragment',
          fields: [
            defineField({name: 'key', type: 'string', title: 'Key'}),
            defineField({name: 'textEn', type: 'string', title: 'Text (English)'}),
            defineField({name: 'textAr', type: 'string', title: 'Text (Arabic)'}),
          ],
        }),
      ],
    }),
    defineField({name: 'gridSize', type: 'number', title: 'Grid Size', initialValue: 20, validation: (rule) => rule.min(8).max(40)}),
    defineField({name: 'initialSpeedMs', type: 'number', title: 'Initial Speed (ms per step)', initialValue: 220}),
    defineField({name: 'maxSpeedMs', type: 'number', title: 'Max Speed (ms per step)', initialValue: 120}),
    defineField({name: 'enableSpecialItems', type: 'boolean', title: 'Enable Special Items', initialValue: true}),
    defineField({name: 'showTouchControls', type: 'boolean', title: 'Show Touch Controls', initialValue: true}),
    defineField({
      name: 'theme',
      type: 'object',
      title: 'Theme',
      fields: [
        defineField({name: 'backgroundColor', type: 'string', title: 'Background Color', initialValue: '#f9f3e0'}),
        defineField({name: 'snakeColor', type: 'string', title: 'Snake Color', initialValue: '#2b4c7e'}),
        defineField({name: 'fragmentColor', type: 'string', title: 'Fragment Color', initialValue: '#c47a2c'}),
        defineField({name: 'specialItemColor', type: 'string', title: 'Special Item Color', initialValue: '#2b7e4c'}),
        defineField({name: 'trailColor', type: 'string', title: 'Trail Color', initialValue: 'rgba(43, 76, 126, 0.15)'}),
        defineField({name: 'borderColor', type: 'string', title: 'Border Color', initialValue: '#d7d7d7'}),
        defineField({name: 'textColor', type: 'string', title: 'Text Color', initialValue: '#1f2937'}),
      ],
    }),
  ],
  preview: {
    select: {title: 'titleEn'},
  },
})
