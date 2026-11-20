import { authorNames, fullTitle, people, plainText, works, type Work } from '../content';
import { profile } from '../profile';
import { siteUrl } from '../site';

// schema.org JSON-LD: who this is, what was published and where the same
// person appears elsewhere (sameAs). Search engines and AI assistants read
// this to tell this Bowen Xue apart from others and to attribute each paper.

const personId = `${siteUrl}/#person`;

const person = {
  '@type': 'Person',
  '@id': personId,
  name: profile.name,
  alternateName: [profile.nameZh, `${profile.familyName} ${profile.givenName}`],
  givenName: profile.givenName,
  familyName: profile.familyName,
  url: siteUrl,
  image: profile.image,
  email: `mailto:${profile.email}`,
  description: profile.description,
  jobTitle: 'Research Intern',
  affiliation: [
    { '@type': 'CollegeOrUniversity', name: 'Stanford University', url: 'https://www.stanford.edu/' },
    {
      '@type': 'CollegeOrUniversity',
      name: profile.education.school,
      alternateName: profile.education.short,
      url: profile.education.url,
    },
  ],
  knowsAbout: profile.topics,
  sameAs: Object.values(profile.profiles),
};

function author(name: string) {
  if (name === profile.name) return { '@id': personId };
  return { '@type': 'Person', name, ...(people[name] && { url: people[name] }) };
}

function workNode(work: Work) {
  const { project, paper, code } = work.links;
  const poster = work.media.kind === 'video' ? work.media.poster : work.media.src;
  const common = {
    '@id': `${siteUrl}/#${work.id}`,
    name: fullTitle(work),
    description: plainText(work.description),
    image: `${siteUrl}${poster}`,
  };

  if (work.kind === 'paper') {
    return {
      '@type': 'ScholarlyArticle',
      ...common,
      headline: fullTitle(work),
      url: project ?? paper,
      // The arXiv page is the same article; the project page is where it lives.
      ...(project && paper && { sameAs: paper }),
      author: authorNames(work.credit).map(author),
      ...(work.venue && { publication: { '@type': 'PublicationEvent', name: work.venue } }),
    };
  }
  // A project credits a role ("author and maintainer", "contributor").
  const isAuthor = /^Bowen Xue, author/.test(work.credit);
  return {
    '@type': 'SoftwareSourceCode',
    ...common,
    url: project ?? code,
    ...(code && { codeRepository: code }),
    [isAuthor ? 'author' : 'contributor']: { '@id': personId },
  };
}

export default function StructuredData({ path, title }: { path: string; title: string }) {
  const url = path === '/' ? siteUrl : `${siteUrl}${path}`;
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'ProfilePage', '@id': `${siteUrl}${path}#page`, url, name: title, inLanguage: 'en', mainEntity: { '@id': personId } },
      person,
      ...works.map(workNode),
    ],
  };
  return (
    <script
      type="application/ld+json"
      // Escaping "<" keeps any string in the data from closing the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
