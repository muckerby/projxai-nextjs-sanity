import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Sanity webhook → Next.js on-demand revalidation
 *
 * Sanity sends a POST to this endpoint whenever a document is published or
 * unpublished.  We verify the shared secret, then revalidate the affected
 * paths so Vercel's CDN serves fresh HTML within seconds instead of waiting
 * for the 60-second ISR window.
 *
 * Webhook setup (sanity.io/manage → project zma68sbk → API → Webhooks):
 *   URL:     https://www.projxai.com.au/api/revalidate
 *   Trigger: on publish / unpublish
 *   Filter:  _type == "post"
 *   Header:  x-sanity-webhook-secret: <SANITY_REVALIDATE_SECRET>
 *   Projection: {_type, slug}
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-sanity-webhook-secret");

  // Reject if secret missing or wrong
  if (!process.env.SANITY_REVALIDATE_SECRET) {
    console.error("SANITY_REVALIDATE_SECRET env var is not set");
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  let body: { _type?: string; slug?: { current?: string } } = {};
  try {
    body = await req.json();
  } catch {
    // Payload is optional — we can still do a broad revalidation
  }

  const docType = body?._type;
  const slug = body?.slug?.current;

  if (docType === "post") {
    // Always revalidate the blog index
    revalidatePath("/blog");

    // If we know the exact slug, revalidate only that post page
    if (slug) {
      revalidatePath(`/blog/${slug}`);
      console.log(`Revalidated /blog and /blog/${slug}`);
    } else {
      // Broad revalidation: clear all cached blog post pages
      revalidatePath("/blog/[slug]", "page");
      console.log("Revalidated /blog and /blog/[slug] (all slugs)");
    }
  } else if (!docType) {
    // No type in payload — revalidate everything blog-related to be safe
    revalidatePath("/blog");
    revalidatePath("/blog/[slug]", "page");
    console.log("Revalidated all blog paths (no _type in payload)");
  }

  return NextResponse.json({
    revalidated: true,
    type: docType ?? "unknown",
    slug: slug ?? null,
    timestamp: new Date().toISOString(),
  });
}
