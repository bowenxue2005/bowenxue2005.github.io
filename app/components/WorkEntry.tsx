import { people, type Work } from '../content';
import { repoFromUrl } from '../github';
import { StarBadge, StarCount } from './Stars';
import Thumb from './Thumb';

/** Keeps the last few words together, so no line ends with one or two words alone. */
export function keepTail(text: string, count = 3): string {
  const words = text.split(' ');
  if (words.length < 2 * count) return text;
  return [...words.slice(0, -count), words.slice(-count).join('\u00a0')].join(' ');
}

/**
 * An author list or a project role, with his own name picked out and each
 * co-author linked to their homepage. Each name is kept on one line, so a list
 * never breaks between a given and a family name.
 */
export function Credit({ text }: { text: string }) {
  const names = text.split(/(,\s+(?:and\s+)?|\s+and\s+)/);
  return (
    <>
      {names.map((part, index) => {
        if (index % 2 === 1) return part;
        if (part.startsWith('Bowen Xue')) {
          return <span className="nowrap" key={index}><strong>Bowen Xue</strong>{part.slice('Bowen Xue'.length)}</span>;
        }
        // An equal-contribution mark stays outside the link.
        const name = part.replace(/\*$/, '');
        const href = people[name];
        return (
          <span className="nowrap" key={index}>
            {href ? <a className="person" href={href} target="_blank" rel="noopener noreferrer">{name}</a> : name}
            {part.slice(name.length)}
          </span>
        );
      })}
    </>
  );
}

/** A link to a second repository carries its star count; the main one is shown beside the name. */
export function WorkLinks({ links, badgeRepo }: { links: Work['links']; badgeRepo?: string }) {
  const items = [
    { label: 'Project', href: links.project },
    { label: 'Paper', href: links.paper },
    { label: 'Code', href: links.code },
    { label: 'Models', href: links.models },
    ...(links.more ?? []),
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));

  return (
    <p className="work-links">
      {items.map(({ label, href }) => {
        const repo = repoFromUrl(href);
        return (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer">
            {label}
            {repo && repo !== badgeRepo && <StarCount repo={repo} />}
          </a>
        );
      })}
    </p>
  );
}

export default function WorkEntry({ work }: { work: Work }) {
  // A paper's name opens its project page; a piece of software opens its repository.
  const href = work.kind === 'project'
    ? work.links.code ?? work.links.project
    : work.links.project ?? work.links.paper ?? work.links.code;
  // The main repository's stars sit beside the name; other repositories keep theirs in the link.
  const badgeRepo = repoFromUrl(work.links.code);

  return (
    <article className="work" aria-labelledby={work.id}>
      <Thumb media={work.media} label={`${work.title} demo`} href={href} />
      <div className="work-head">
        <div className="work-title">
          <h3 id={work.id}>
            <a href={href} target="_blank" rel="noopener noreferrer">{work.title}</a>
          </h3>
          {work.venue && <span className="venue">{work.venue}</span>}
          {badgeRepo && <StarBadge repo={badgeRepo} href={work.links.code} />}
        </div>
        <p className="work-subtitle">{keepTail(work.subtitle)}</p>
      </div>
      <div className="work-body">
        <p className="work-credit"><Credit text={work.credit} /></p>
        <p className="work-description">{keepTail(work.description)}</p>
        <WorkLinks links={work.links} badgeRepo={badgeRepo} />
      </div>
    </article>
  );
}
