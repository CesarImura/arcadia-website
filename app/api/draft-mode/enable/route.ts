import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const redirectTo = searchParams.get("redirect") || "/";

  if (!process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Missing SANITY_REVALIDATE_SECRET", { status: 500 });
  }

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new Response("Invalid secret", { status: 401 });
  }

  (await draftMode()).enable();
  redirect(redirectTo);
}
