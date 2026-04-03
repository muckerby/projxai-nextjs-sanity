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
          { title: 'Just me', value: 'Just me' },
          { title: '2–5', value: '2-5' },
          { title: '6–15', value: '6-15' },
          { title: '16–30', value: '16-30' },
          { title: '31–50', value: '31-50' },
          { title: '50+', value: '50+' },
        ],
      },
    },
    {
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: [
          { title: 'Accommodation & Tourism', value: 'Accommodation & Tourism' },
          { title: 'Automotive', value: 'Automotive' },
          { title: 'Construction & Trades', value: 'Construction & Trades' },
          { title: 'eCommerce & Retail', value: 'eCommerce & Retail' },
          { title: 'Education & Training', value: 'Education & Training' },
          { title: 'Finance & Insurance', value: 'Finance & Insurance' },
          { title: 'Food & Hospitality', value: 'Food & Hospitality' },
          { title: 'Health & Wellbeing', value: 'Health & Wellbeing' },
          { title: 'Legal & Professional Services', value: 'Legal & Professional Services' },
          { title: 'Marketing & Advertising', value: 'Marketing & Advertising' },
          { title: 'Manufacturing & Logistics', value: 'Manufacturing & Logistics' },
          { title: 'Property & Real Estate', value: 'Property & Real Estate' },
          { title: 'Technology & Software', value: 'Technology & Software' },
          { title: 'Other', value: 'Other' },
        ],
      },
    },
    {
      name: 'aiMaturity',
      title: 'AI Maturity',
      type: 'string',
      options: {
        list: [
          { title: 'Completely new to it', value: 'Completely new to it — not sure where to start' },
          { title: 'Played around with ChatGPT', value: 'Played around with ChatGPT or similar tools' },
          { title: 'Using some AI tools', value: 'Using some AI tools but not getting much from them' },
          { title: 'AI running in parts of the business', value: 'AI running in parts of the business, want to do more' },
          { title: 'Specific AI project in mind', value: 'Specific AI project in mind, need expert help' },
        ],
      },
    },
    {
      name: 'areasOfInterest',
      title: 'Areas of Interest',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'biggestChallenge',
      title: 'Biggest Challenge',
      type: 'string',
    },
    {
      name: 'timeframe',
      title: 'Timeframe',
      type: 'string',
      options: {
        list: [
          { title: 'Right now — ready to move', value: 'Right now — I am ready to move' },
          { title: 'Within the next month', value: 'Within the next month' },
          { title: 'In the next 3 months', value: 'In the next 3 months' },
          { title: 'Just exploring for now', value: 'Just exploring for now' },
        ],
      },
    },
    {
      name: 'leadPath',
      title: 'Lead Path',
      type: 'string',
      options: {
        list: [
          { title: 'Booked a call', value: 'booking' },
          { title: 'Completed intake', value: 'intake' },
        ],
      },
    },
    {
      name: 'calBookingId',
      title: 'Cal.com Booking ID',
      type: 'string',
    },
    {
      name: 'aiChallenge',
      title: 'AI Challenge (initial form)',
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
