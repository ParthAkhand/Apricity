import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Public content is cached with the "content" tag; this just marks it stale so the next visit refetches.
// It exposes no data and only forces a refetch, so it needs no auth.
export async function POST() {
  revalidateTag("content");
  return NextResponse.json({ ok: true });
}
