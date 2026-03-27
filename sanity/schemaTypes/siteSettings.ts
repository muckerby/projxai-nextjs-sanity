export const siteSettingsSchema = {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
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
