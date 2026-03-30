export const leadSchema = {
  name: 'lead',
  title: 'Lead',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'businessName',
      title: 'Business Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'message',
      title: 'Message',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'enquiryType',
      title: 'Enquiry Type',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Consulting', value: 'consulting' },
        ],
      },
    },
    {
      name: 'teamSize',
      title: 'Team Size',
      type: 'string',
      options: {
        list: [
          { title: '1–5', value: '1-5' },
          { title: '6–20', value: '6-20' },
          { title: '21–50', value: '21-50' },
          { title: '50+', value: '50+' },
        ],
      },
    },
    {
      name: 'aiChallenge',
      title: 'AI Challenge',
      type: 'text',
    },
    {
      name: 'preferredContact',
      title: 'Preferred Contact Method',
      type: 'string',
      options: {
        list: [
          { title: 'Email', value: 'email' },
          { title: 'Call', value: 'call' },
        ],
      },
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'string',
    },
    {
      name: 'sourcePage',
      title: 'Source Page',
      type: 'string',
    },
    {
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'new',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Qualified', value: 'qualified' },
          { title: 'Closed', value: 'closed' },
        ],
      },
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'email',
    },
  },
}
