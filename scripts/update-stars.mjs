// Refreshes the star counts baked into app/github.ts (what renders before the
// live numbers arrive). Run it with `npm run stars`.
import { readFile, writeFile } from 'node:fs/promises';

const file = new URL('../app/github.ts', import.meta.url);
const source = await readFile(file, 'utf8');
const repos = [...source.matchAll(/'([\w.-]+\/[\w.-]+)':\s*\d+/g)].map((m) => m[1]);

let updated = source;
for (const repo of repos) {
  const response = await fetch(`https://api.github.com/repos/${repo}`, {
    headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'bowenxue.me' },
  });
  if (!response.ok) {
    console.error(`${repo}: ${response.status} ${response.statusText}`);
    process.exitCode = 1;
    continue;
  }
  const { stargazers_count: stars } = await response.json();
  const name = repo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  updated = updated.replace(new RegExp(`('${name}':\\s*)\\d+`), `$1${stars}`);
  console.log(`${repo}: ${stars}`);
}

if (updated !== source) await writeFile(file, updated);
