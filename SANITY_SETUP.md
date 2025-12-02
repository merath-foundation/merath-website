# Sanity Studio Setup for Merath Foundation

This document provides the schema definitions for the Merath Cultural Foundation CMS.

## Installation

1. Install Sanity CLI globally:
```bash
npm install -g @sanity/cli
```

2. Initialize Sanity Studio in a new directory:
```bash
npx sanity init
```

3. When prompted:
   - Choose "Create new project"
   - Use the project name: "Merath Foundation"
   - Choose dataset name: "production"
   - Choose output path: "./studio"
   - Choose schema template: "Clean project with no predefined schemas"

4. Navigate to the studio directory and install dependencies:
```bash
cd studio
npm install
```

## Schema Definitions

Create these schema files in `studio/schemas/`:

### 1. Project Schema (`project.ts`)

```typescript
export default {
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Project ID (URL Slug)',
      type: 'slug',
      options: {
        source: 'title.en',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'type',
      title: 'Type',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'overview',
      title: 'Overview',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
      ],
    },
    {
      name: 'approach',
      title: 'Approach',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
      ],
    },
    {
      name: 'outcomes',
      title: 'Outcomes',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
      ],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'year',
      media: 'image',
    },
  },
}
```

### 2. Team Member Schema (`teamMember.ts`)

```typescript
export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'role',
      title: 'Role',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
    },
    {
      name: 'bio',
      title: 'Biography',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
      ],
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'name.en',
      subtitle: 'role.en',
      media: 'image',
    },
  },
}
```

### 3. Case Study Schema (`caseStudy.ts`)

```typescript
export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
      ],
    },
    {
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
    },
  ],
  preview: {
    select: {
      title: 'title.en',
      subtitle: 'year',
      media: 'image',
    },
  },
}
```

### 4. Site Settings Schema (`siteSettings.ts`)

```typescript
export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'string' },
        { name: 'ar', title: 'Arabic', type: 'string' },
      ],
    },
    {
      name: 'siteDescription',
      title: 'Site Description',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
      ],
    },
    {
      name: 'homeStatement',
      title: 'Home Page Statement',
      type: 'object',
      fields: [
        { name: 'en', title: 'English', type: 'text' },
        { name: 'ar', title: 'Arabic', type: 'text' },
      ],
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'socialMedia',
      title: 'Social Media',
      type: 'object',
      fields: [
        { name: 'twitter', title: 'Twitter', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'instagram', title: 'Instagram', type: 'url' },
      ],
    },
  ],
}
```

### 5. Index Schema File (`index.ts`)

```typescript
import project from './project'
import teamMember from './teamMember'
import caseStudy from './caseStudy'
import siteSettings from './siteSettings'

export const schemaTypes = [project, teamMember, caseStudy, siteSettings]
```

## Update Configuration

In `studio/sanity.config.ts`:

```typescript
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Merath Foundation',

  projectId: 'your_project_id',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
```

## Running Sanity Studio

```bash
cd studio
npm run dev
```

The studio will be available at `http://localhost:3333`

## Deploying Sanity Studio

```bash
npm run build
npx sanity deploy
```

## Connecting to Frontend

1. Copy your Project ID from the Sanity management console
2. Update `.env` file in the main project:
   ```
   VITE_SANITY_PROJECT_ID=your_actual_project_id
   ```

3. The frontend is already configured to use Sanity. See `src/lib/sanity.ts`

## GROQ Queries Examples

### Fetch all projects:
```groq
*[_type == "project"] | order(publishedAt desc)
```

### Fetch single project by slug:
```groq
*[_type == "project" && id.current == $id][0]
```

### Fetch team members:
```groq
*[_type == "teamMember"] | order(order asc)
```

### Fetch case studies:
```groq
*[_type == "caseStudy"] | order(order asc)
```
