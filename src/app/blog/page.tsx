import Link from "next/link";
import { Metadata } from "next";
import { sanityClient, postsQuery, urlFor, type Post } from "@/lib/sanity";
import { BlogEmailCapture } from "@/components/Blog/EmailCapture";

export const metadata: Metadata = {
  title: "AI Insights Blog | ProjxAI",
  description:
    "Practical AI insights, guides, and strategy for Australian SMEs. Plain English — no jargon, no hype.",
  openGraph: {
    title: "AI Insights Blog | ProjxAI",
    description: "Practical AI insights and strategy for Australian SMEs.",
    url: "https://www.projxai.com.au/blog",
  },
};

// Revalidate every 60 seconds so new Sanity posts appear quickly
export const revalidate = 60;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// ── Post card ──────────────────────────────────────────────────────
function PostCard({ post }: { post: Post }) {
  const imageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).width(800).height(450).fit("crop").url()
    : null;

  return (
    <Link
      href={`/blog/${post.slug.current}`}
      className="group block rounded-3xl overflow-hidden transition-all hover:shadow-[0_20px_60px_rgba(21,28,39,0.1)]"
      style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.05)" }}
    >
      {/* Image */}
      <div className="aspect-[16/9] overflow-hidden" style={{ backgroundColor: "#e7eeff" }}>
        {imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imageUrl}
            alt={post.mainImage?.alt ?? post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #e7eeff 0%, #dce2f3 100%)" }}
          >
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" opacity="0.4">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-8">
        {/* Categories */}
        {post.categories && post.categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
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

        <h2
          className="text-xl font-bold mb-3 leading-snug transition-colors group-hover:text-[#6B3FE7]"
          style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.01em" }}
        >
          {post.title}
        </h2>

        {post.excerpt && (
          <p className="text-base leading-relaxed mb-6 line-clamp-3" style={{ color: "#494455" }}>
            {post.excerpt}
          </p>
        )}

        <div className="flex items-center justify-between">
          <span className="text-sm" style={{ color: "#5e6573", fontFamily: "Manrope, sans-serif" }}>
            {post.publishedAt ? formatDate(post.publishedAt) : ""}
          </span>
          <span
            className="text-sm font-bold flex items-center gap-1 transition-colors group-hover:text-[#6B3FE7]"
            style={{ color: "#151c27", fontFamily: "Space Grotesk, sans-serif" }}
          >
            Read article
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Coming soon state ──────────────────────────────────────────────
function ComingSoon() {
  return (
    <div className="max-w-3xl mx-auto">
      <div
        className="relative overflow-hidden rounded-[2rem] p-12 md:p-16 mb-16"
        style={{ backgroundColor: "#ffffff", boxShadow: "0 4px 60px rgba(21,28,39,0.06)" }}
      >
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(107,63,231,0.06) 0%, transparent 70%)" }}
        />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8" style={{ backgroundColor: "#e7eeff" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" stroke="#6B3FE7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6" style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}>
            Coming Soon
          </span>
          <h2 className="text-3xl font-extrabold mb-4" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}>
            First articles dropping soon.
          </h2>
          <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "#494455" }}>
            We&apos;re building a library of practical AI guides for Australian SMEs.
            Drop your email to get early access.
          </p>
          <div className="max-w-md">
            <BlogEmailCapture
              placeholder="your@email.com.au"
              buttonText="Get early access →"
            />
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {["AI Readiness", "Workflow Automation", "SME Strategy", "Tool Reviews"].map((tag) => (
              <span key={tag} className="px-4 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: "#f0f3ff", color: "#494455", fontFamily: "Manrope, sans-serif" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { icon: "⚡", title: "Practical guides", desc: "Step-by-step AI implementation guides written for non-technical business owners." },
          { icon: "📈", title: "Real ROI focus", desc: "Every article ties back to measurable business outcomes — not theory." },
          { icon: "🇦🇺", title: "Australian context", desc: "Written with Australian regulations, market conditions, and business culture in mind." },
        ].map((item) => (
          <div key={item.title} className="p-6 rounded-2xl" style={{ backgroundColor: "#ffffff", boxShadow: "0 2px 20px rgba(21,28,39,0.04)" }}>
            <div className="text-3xl mb-4">{item.icon}</div>
            <h3 className="font-bold mb-2" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27" }}>{item.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "#494455" }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────
export default async function BlogPage() {
  const posts: Post[] = await sanityClient.fetch(postsQuery);
  const hasPosts = posts.length > 0;

  return (
    <>
      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="pt-40 pb-16" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-4xl">
            <span
              className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6"
              style={{ backgroundColor: "#e7eeff", color: "#6B3FE7", fontFamily: "Manrope, sans-serif" }}
            >
              Intelligence Brief
            </span>
            <h1
              className="font-extrabold leading-[0.95] tracking-tighter mb-6"
              style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(2rem, 5vw, 3.25rem)", color: "#151c27", letterSpacing: "-0.03em" }}
            >
              {hasPosts ? "Latest " : "AI "}
              <span style={{ color: "#6B3FE7", fontStyle: "italic" }}>
                {hasPosts ? "Insights" : "Insights — Coming Soon"}
              </span>
            </h1>
            <p className="text-xl max-w-2xl leading-relaxed" style={{ color: "#494455" }}>
              Curated intelligence from the intersection of AI, digital strategy, and business
              transformation — written specifically for Australian SMEs.
            </p>
          </div>
        </div>
      </section>

      {/* ── POSTS / COMING SOON ─────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f0f3ff" }}>
        <div className="container">
          {hasPosts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <ComingSoon />
          )}

          {/* Newsletter signup — always shown */}
          <div className="max-w-3xl mx-auto mt-16">
            <div
              className="rounded-[2rem] p-10 md:p-14"
              style={{ background: "linear-gradient(135deg, #151c27 0%, #2d1b69 50%, #6b3fe7 100%)" }}
            >
              <div className="max-w-xl">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-5"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#ccbdff", fontFamily: "Manrope, sans-serif" }}
                >
                  Newsletter
                </span>
                <h2
                  className="font-black mb-4 leading-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", color: "#ffffff", letterSpacing: "-0.02em" }}
                >
                  Weekly Intelligence.{" "}
                  <span style={{ color: "#ccbdff" }}>Delivered Fresh.</span>
                </h2>
                <p className="text-base mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
                  Get notified when new articles drop — plus early access to tools, frameworks,
                  and AI insights before they go public. No spam. Unsubscribe anytime.
                </p>
                <BlogEmailCapture
                  placeholder="your@email.com.au"
                  buttonText="Notify me"
                  dark={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="py-20" style={{ backgroundColor: "#f9f9ff" }}>
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-5" style={{ fontFamily: "Space Grotesk, sans-serif", color: "#151c27", letterSpacing: "-0.02em" }}>
              Can&apos;t wait? Let&apos;s talk now.
            </h2>
            <p className="text-lg mb-8" style={{ color: "#494455" }}>
              If you have specific questions about AI for your business, book a free
              15-minute Clarity Call — no sales pitch, just straight answers.
            </p>
            <Link
              href="/contact#consulting"
              className="btn-primary-gradient inline-block px-10 py-4 rounded-xl text-white font-bold text-lg transition-all hover:shadow-[0_20px_50px_rgba(82,26,207,0.3)]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Book a Clarity Call
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
