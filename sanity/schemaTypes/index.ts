import { authorSchema } from './author'
import { categorySchema } from './category'
import { postSchema } from './post'
import { siteSettingsSchema } from './siteSettings'

export const schemaTypes = [
  authorSchema,
  categorySchema,
  postSchema,
  siteSettingsSchema,
]
