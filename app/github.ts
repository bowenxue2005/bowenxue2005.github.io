// GitHub star counts shown beside the repository links.
//
// The site is a static export, so the counts are fetched in the browser and the
// numbers below are what renders until that resolves (and if it fails, or if a
// visitor is offline). Refresh them with `npm run stars`.
//
// Only repositories with a count worth showing belong here; a link to a repo
// that is not listed simply renders without a badge.
export const starFallback: Record<string, number> = {
  'nunchux-ai/nunchaku': 3964,
  'nunchux-ai/ComfyUI-nunchaku': 2932,
  'FlashML-org/FreeVideo': 2703,
  'WeChatCV/Stand-In': 795,
};

export const trackedRepos = Object.keys(starFallback);

export function repoFromUrl(url?: string): string | undefined {
  if (!url) return undefined;
  const match = /^https:\/\/github\.com\/([^/]+\/[^/?#]+)/.exec(url);
  return match?.[1];
}

/** 2699 → "2,699". Hand-rolled so the server and the browser always agree. */
export function formatStars(count: number): string {
  return String(count).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
