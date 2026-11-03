'use client';

import { useEffect, useState } from 'react';
import { formatStars, starFallback, trackedRepos } from '../github';
import { GitHubIcon } from './Icons';

type Counts = Record<string, number>;

const STORAGE_KEY = 'github-stars';
const MAX_AGE = 6 * 60 * 60 * 1000;

let pending: Promise<Counts> | null = null;

function fromSession(): Counts | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const { at, counts } = JSON.parse(raw) as { at: number; counts: Counts };
    return Date.now() - at < MAX_AGE ? counts : null;
  } catch {
    return null;
  }
}

async function fetchCounts(): Promise<Counts> {
  const cached = fromSession();
  if (cached) return cached;

  const results = await Promise.all(
    trackedRepos.map(async (repo) => {
      try {
        const response = await fetch(`https://api.github.com/repos/${repo}`, {
          headers: { Accept: 'application/vnd.github+json' },
        });
        if (!response.ok) return null;
        const data = (await response.json()) as { stargazers_count?: number };
        return typeof data.stargazers_count === 'number' ? ([repo, data.stargazers_count] as const) : null;
      } catch {
        return null;
      }
    }),
  );

  const counts = { ...starFallback };
  for (const result of results) if (result) counts[result[0]] = result[1];

  // Only remember a response that actually carried numbers, so a rate-limited
  // or offline load does not pin the fallbacks in place for the whole session.
  if (results.some(Boolean)) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ at: Date.now(), counts }));
    } catch {
      // Private browsing: the fallback numbers are good enough.
    }
  }
  return counts;
}

/**
 * Live star counts, falling back to the numbers baked in at build time. Both
 * renders start from the fallback, so hydration matches; the fetch is deferred
 * until the browser is idle so it never competes with the page itself.
 */
function useStars(): Counts {
  const [counts, setCounts] = useState<Counts>(starFallback);

  useEffect(() => {
    let active = true;
    const start = () => {
      pending = pending || fetchCounts();
      void pending.then((value) => { if (active) setCounts(value); });
    };
    const idle = typeof window.requestIdleCallback === 'function';
    const handle = idle ? window.requestIdleCallback(start, { timeout: 2500 }) : window.setTimeout(start, 400);
    return () => {
      active = false;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, []);

  return counts;
}

function Count({ repo, className, href }: { repo: string; className: string; href?: string }) {
  const count = useStars()[repo];
  if (!count) return null;
  const content = (
    <>
      <GitHubIcon />
      <span className="count">{formatStars(count)}</span>
      <span className="unit">stars</span>
    </>
  );
  const title = `${formatStars(count)} stars on GitHub`;
  return href ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" title={title}>{content}</a>
  ) : (
    <span className={className} title={title}>{content}</span>
  );
}

/** A repository's GitHub stars beside its name, next to a paper's venue; links to the repository. */
export function StarBadge({ repo, href }: { repo: string; href?: string }) {
  return <Count repo={repo} className="badge" href={href} />;
}

/** The same count inside a link to a second repository. */
export function StarCount({ repo }: { repo: string }) {
  return <Count repo={repo} className="stars" />;
}
