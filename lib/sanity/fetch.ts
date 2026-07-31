import { draftMode } from "next/headers";
import { getClient } from "@/lib/sanity/client";

export async function sanityFetch<T>({
  query,
  params = {},
  tags,
}: {
  query: string;
  params?: Record<string, unknown>;
  tags?: string[];
}): Promise<T> {
  const isDraftMode = (await draftMode()).isEnabled;
  const client = getClient(isDraftMode);

  return client.fetch<T>(query, params, {
    cache: isDraftMode ? "no-store" : "force-cache",
    next: {
      tags,
    },
  });
}
