// ProjxAI Sanity Schema Definitions
// File: docs/sanity/schemas.js
// 
// INSTRUCTIONS FOR CLAUDE CODE:
// 1. Copy each schema object into its own file in /sanity/schemaTypes/
//    e.g. /sanity/schemaTypes/post.ts, /sanity/schemaTypes/author.ts etc.
// 2. Import and register all schemas in /sanity/schemaTypes/index.ts
// 3. Run `npx sanity dev` to verify schemas load correctly in Studio
// 4. Run `npx sanity deploy` to deploy Studio to projxai.sanity.studio

// ─────────────────────────────────────────────────────────────────
// AUTHOR SCHEMA
// ─────────────────────────────────────────────────────────────────
export const authorSchema = {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
    },
    {
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
    },
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
}

// ─────────────────────────────────────────────────────────────────
// CATEGORY SCHEMA
// ─────────────────────────────────────────────────────────────────
export const categorySchema = {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    },
    {
      name: 'color',
      title: 'Tag Colour (hex)',
      type: 'string',
      description: 'Used for category tag display. e.g. #6B3FE7',
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// POST (BLOG) SCHEMA
// ─────────────────────────────────────────────────────────────────
export const postSchema = {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Required for accessibility and SEO',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on blog index cards. Max 160 characters.',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
    },
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Overrides post title in <title> tag. Max 60 characters.',
      validation: (Rule) => Rule.max(60),
    },
    {
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      description: 'Shown in Google search results. 120-160 characters ideal.',
      validation: (Rule) => Rule.max(160),
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author ? `by ${author}` : '' }
    },
  },
  orderings: [
    {
      title: 'Published Date, New',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// SITE SETTINGS SCHEMA (SINGLETON)
// ─────────────────────────────────────────────────────────────────
export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  // Singleton — only one document of this type should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    {
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
      initialValue: 'ProjxAI — AI for Australian Business',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      initialValue: 'Navigating AI for Business',
    },
    {
      name: 'ogImage',
      title: 'Default OG / Social Share Image',
      type: 'image',
      description: '1200x630px. Used when sharing pages that have no specific image.',
      options: { hotspot: true },
    },
    {
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
    },
    {
      name: 'twitterHandle',
      title: 'X / Twitter Handle',
      type: 'string',
      description: 'Without the @ symbol',
    },
    {
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'michaelc@collicorp.com.au',
    },
  ],
}

// ─────────────────────────────────────────────────────────────────
// INDEX — register all schemas
// ─────────────────────────────────────────────────────────────────
// In /sanity/schemaTypes/index.ts, import and export like this:
//
// import { authorSchema } from './author'
// import { categorySchema } from './category'
// import { postSchema } from './post'
// import { siteSettingsSchema } from './siteSettings'
//
// export const schemaTypes = [
//   authorSchema,
//   categorySchema,
//   postSchema,
//   siteSettingsSchema,
// ]

// ─────────────────────────────────────────────────────────────────
// GROQ QUERIES — use these in Next.js pages
// ─────────────────────────────────────────────────────────────────

// Blog index — all published posts
// *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
//   _id, title, slug, publishedAt, excerpt,
//   mainImage { asset->, alt },
//   "categories": categories[]->{ title, color },
//   "author": author->{ name, image }
// }

// Home page — latest 3 posts
// *[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...3] {
//   _id, title, slug, publishedAt, excerpt,
//   mainImage { asset->, alt },
//   "categories": categories[]->{ title, color }
// }

// Single post by slug
// *[_type == "post" && slug.current == $slug][0] {
//   _id, title, slug, publishedAt, excerpt, body,
//   mainImage { asset->, alt },
//   seoTitle, seoDescription,
//   "categories": categories[]->{ title, color },
//   "author": author->{ name, bio, image }
// }
