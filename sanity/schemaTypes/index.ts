import { authorSchema } from './author'
import { categorySchema } from './category'
import { leadSchema } from './lead'
import { postSchema } from './post'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [
  authorSchema,
  categorySchema,
  leadSchema,
  postSchema,
  siteSettingsSchema,
]
