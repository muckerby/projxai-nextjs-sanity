import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SanityImageSource = any;

// ── Shared read-only client (CDN, public data) ─────────────────────
export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "zma68sbk",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01",
  useCdn: true, // read-only, safe to cache
});

// ── Image URL builder ──────────────────────────────────────────────
const builder = imageUrlBuilder(sanityClient);
export const urlFor = (source: SanityImageSource) => builder.image(source);

// ── Types ──────────────────────────────────────────────────────────
export type Post = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  publishedAt?: string;
  mainImage?: { asset: { _ref: string }; alt?: string };
  categories?: { title: string }[];
  author?: { name: string };
  body?: unknown[];
  seoTitle?: string;
  seoDescription?: string;
};

// ── GROQ queries ───────────────────────────────────────────────────

/** All published posts for the blog index — newest first */
export const postsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage { asset->, alt },
    categories[]->{ title },
    author->{ name }
  }
`;

/** Single post by slug — includes full body with expanded image assets */
export const postBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    mainImage { asset->, alt },
    categories[]->{ title },
    author->{ name },
    body[] {
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    seoTitle,
    seoDescription
  }
`;

/** All slugs — for generateStaticParams */
export const allSlugsQuery = `
  *[_type == "post" && defined(slug.current)] { "slug": slug.current }
`;
