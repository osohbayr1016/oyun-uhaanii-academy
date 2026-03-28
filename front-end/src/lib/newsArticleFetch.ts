import { cache } from "react";
import { getApiBaseUrl } from "@/lib/env";
import { isNextBuildPhase } from "@/lib/isNextBuildPhase";
import type { NewsArticle } from "@/lib/newsArticleTypes";

const ATTEMPTS = 3;
const BASE_DELAY_MS = 350;

async function fetchArticleOnce(id: string): Promise<Response | null> {
  const url = `${getApiBaseUrl()}/api/news/${encodeURIComponent(id)}`;
  try {
    return await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
  } catch {
    return null;
  }
}

function sleep(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms));
}

/**
 * Single deduped fetch per request (metadata + page share one call).
 * Retries fix intermittent first-navigation failures to the Worker.
 */
export const getNewsArticle = cache(
  async (id: string): Promise<NewsArticle | null> => {
    if (isNextBuildPhase()) {
      return null;
    }
    for (let attempt = 0; attempt < ATTEMPTS; attempt++) {
      const res = await fetchArticleOnce(id);
      if (res?.ok) {
        try {
          return (await res.json()) as NewsArticle;
        } catch {
          return null;
        }
      }
      if (res?.status === 404) {
        return null;
      }
      if (attempt < ATTEMPTS - 1) {
        await sleep(BASE_DELAY_MS * (attempt + 1));
      }
    }
    return null;
  }
);
