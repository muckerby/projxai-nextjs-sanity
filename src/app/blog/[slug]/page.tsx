import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { sanityClient, postBySlugQuery, allSlugsQuery, urlFor, type Post } from "@/lib/sanity";

export const revalidate = 60;

// ── Static params for build-time generation ────────────────────────
export async function generateStaticParams() {
  const slugs: { slug: string }[] = await sanityClient.fetch(allSlugsQuery);
  return slugs.map((s) => ({ slug: s.slug }));
}

// ── Dynamic metadata ───────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post: Post | null = await sanityClient.fetch(postBySlugQuery, { slug });
  if (!post) return { title: "Not Found | ProjxAI" };

  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: post.seoTitle ?? `${post.title} | ProjxAI`,
    description: post.seoDescription ?? post.excerpt,
    openGraph: {
      title: post.seoTitle ?? post.title,
      description: post.seoDescription ?? post.excerpt,
      url: `https://www.projxai.com.au/blog/${slug}`,
      ...(imageUrl ? { images: [{ url: imageUrl, width: 1200, height: 630 }] } : {}),
    },
  };
}

// ── Portable text components ───────────────────────────────────────
const ptComponents = {
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em", fontSize: "1.75rem", fontWeight: 800, marginTop: "2.5rem", marginBottom: "1rem", lineHeight: 1.2 }}>
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", fontSize: "1.35rem", fontWeight: 700, marginTop: "2rem", marginBottom: "0.75rem" }}>
        {children}
      </h3>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p style={{ color: "#494455", lineHeight: 1.8, marginBottom: "1.25rem", fontSize: "1.0625rem" }}>
        {children}
      </p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote style={{ borderLeft: "4px solid #6B3FE7", paddingLeft: "1.5rem", margin: "2rem 0", color: "#5e6573", fontStyle: "italic", fontSize: "1.125rem", lineHeight: 1.7 }}>
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong style={{ color: "#151c27", fontWeight: 700 }}>{children}</strong>
    ),
    em: ({ children }: { children?: React.ReactNode }) => (
      <em style={{ color: "#6B3FE7" }}>{children}</em>
    ),
    link: ({ value, children }: { value?: { href: string }; children?: React.ReactNode }) => (
      <a href={value?.href} target="_blank" rel="noopener noreferrer" style={{ color: "#6B3FE7", textDecoration: "underline", textUnderlineOffset: "3px" }}>
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <ul style={{ paddingLeft: "1.5rem", marginBottom: "1.25rem", color: "#494455", lineHeight: 1.8 }}>
        {children}
      </ul>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <ol style={{ paddingLeft: "1.5rem", marginBottom: "1.25rem", color: "#494455", lineHeight: 1.8 }}>
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.5rem", paddingLeft: "0.25rem" }}>{children}</li>
    ),
    number: ({ children }: { children?: React.ReactNode }) => (
      <li style={{ marginBottom: "0.5rem", paddingLeft: "0.25rem" }}>{children}</li>
    ),
  },
  types: {
    image: ({ value }: { value: { asset?: { _id?: string; _ref?: string; url?: string }; alt?: string; caption?: string } }) => {
      // Guard: skip if asset reference is missing or unresolvable
      if (!value?.asset) return null;
      let url: string;
      try {
        url = urlFor(value).width(1200).fit("max").url();
      } catch {
        return null;
      }
      if (!url) return null;
      return (
        <figure style={{ margin: "2.5rem 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt={value.alt ?? ""} style={{ width: "100%", borderRadius: "1rem", boxShadow: "0 4px 30px rgba(21,28,39,0.08)" }} />
          {value.caption && (
            <figcaption style={{ textAlign: "center", color: "#5e6573", fontSize: "0.875rem", marginTop: "0.75rem", fontFamily: "Manrope, sans-serif" }}>
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Page ───────────────────────────────────────────────────────────
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post: Post | null = await sanityClient.fetch(postBySlugQuery, { slug });

  if (!post) notFound();

  const heroImageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(1400).height(700).fit("crop").url()
    : null;

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="pt-40 pb-0" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-3xl">
            {/* Categories */}
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.categories.map((cat) => (
                  <span
                    key={cat.title}
                    className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase"
                    style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
                  >
                    {cat.title}
                  </span>
                ))}
              </div>
            )}

            <h1
              className="font-extrabold leading-tight mb-6"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3rem)", color: "#151c27", letterSpacing: "-0.03em" }}
            >
              {post.title}
            </h1>

            {/* Meta row */}
            <div className="flex items-center gap-4 mb-0 text-sm" style={{ color: "#5e6573", fontFamily: "Manrope, sans-serif" }}>
              {post.author?.name && <span>{post.author.name}</span>}
              {post.author?.name && post.publishedAt && <span>·</span>}
              {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* ── HERO IMAGE ────────────────────────────────────── */}
      {heroImageUrl && (
        <section className="py-10" style={{ backgroundColor: "#f9f9ff" }}>
          <div className="container">
            <div className="max-w-4xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImageUrl}
                alt={post.mainImage?.alt ?? post.title}
                className="w-full rounded-3xl"
                style={{ boxShadow: "0 20px 60px rgba(21,28,39,0.1)", aspectRatio: "2/1", objectFit: "cover" }}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── BODY ──────────────────────────────────────────── */}
      <section className={heroImageUrl ? "pt-4 pb-24" : "pt-14 pb-24"} style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Article content */}
            <article className="lg:col-span-8 max-w-none">
              {post.body && (
                <PortableText value={post.body as any} components={ptComponents as any} />
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 flex flex-col gap-6">
                {/* CTA card */}
                <div
                  className="rounded-2xl p-8"
                  style={{ background: "linear-gradient(135deg, #2d1b69 0%, #6b3fe7 100%)" }}
                >
                  <h3
                    className="text-xl font-bold mb-3 text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Ready to implement AI?
                  </h3>
                  <p className="text-sm mb-6 leading-relaxed" style={{ color: "rgba(255,255,255,0.75)" }}>
                    Book a free 15-minute Clarity Call and get a clear picture of where AI can
                    deliver real value in your business.
                  </p>
                  <Link
                    href="/contact#consulting"
                    className="block text-center px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90"
                    style={{ backgroundColor: "#ffffff", color: "#151c27", fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Book a free call
                  </Link>
                </div>

                {/* Back link */}
                <Link
                  href="/blog"
                  className="flex items-center gap-2 text-sm font-semibold transition-colors hover:text-[#6B3FE7]"
                  style={{ color: "#5e6573", fontFamily: "Manrope, sans-serif" }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back to all articles
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
