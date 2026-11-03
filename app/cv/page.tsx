import type { Metadata } from 'next';
import ProfileLinks from '../components/ProfileLinks';
import { Credit, keepTail } from '../components/WorkEntry';
import { StarCount } from '../components/Stars';
import { papers, projects, type Work } from '../content';
import { repoFromUrl } from '../github';

export const metadata: Metadata = {
  title: 'CV',
  alternates: { canonical: '/cv' },
};

const NB = '‑';

type Contribution = { name: string; href?: string; venue?: string; note: string };

const experience: { org: string; when: string; role: string; work: Contribution[] }[] = [
  {
    org: 'Stanford University',
    when: 'Jun 2026 – present',
    role: 'Research intern with Prof. Jiajun Wu',
    work: [{ name: 'UniAction', href: '#pub-uniaction', note: `Unified action conditioning for world models. One jointly trained model outperforms per${NB}action experts across force, camera, hand pose and robot pose.` }],
  },
  {
    org: 'ByteDance',
    when: 'Sep 2025 – May 2026',
    role: 'Research intern',
    work: [{ name: 'Ring Forcing', href: '#pub-ring-forcing', venue: 'ECCV 2026', note: `Long${NB}term memory for autoregressive video diffusion, preserving object identity across minute${NB}long gaps.` }],
  },
  {
    org: 'MIT HAN Lab',
    when: 'Apr 2025 – Feb 2026',
    role: 'Research intern, remote',
    work: [
      { name: 'FourTune', href: '#pub-fourtune', venue: 'ICML 2026', note: `Fully 4${NB}bit post${NB}training for diffusion models, with 2.25× less memory and 2.27× the throughput of BF16 LoRA.` },
      { name: 'nunchaku', href: '#project-nunchaku', note: `PuLID identity customization for the 4${NB}bit inference engine and its ComfyUI plugin.` },
    ],
  },
  {
    org: 'Tencent',
    when: 'Nov 2024 – Sep 2025',
    role: 'Research intern',
    work: [
      { name: 'Stand-In', href: '#pub-stand-in', venue: 'CVPR 2026', note: `Identity${NB}preserving video generation with about 1% added parameters.` },
      { name: `Identity${NB}preserving image generation`, note: `Deployed in WeChat Channels, 4× faster than IP${NB}Adapter and InstantID.` },
    ],
  },
];

const projectDates: Record<string, string> = { freevideo: 'Oct 2026 – present', nunchaku: 'Apr – Jun 2025' };

/** Links as text, the way a CV reads; a repository carries its star count. */
function TextLinks({ links }: { links: Work['links'] }) {
  const items = [
    { label: 'Project', href: links.project },
    { label: 'Paper', href: links.paper },
    { label: 'Code', href: links.code },
    { label: 'Models', href: links.models },
    ...(links.more ?? []),
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));
  return (
    <p className="cv-links">
      {items.map(({ label, href }) => {
        const repo = repoFromUrl(href);
        return (
          <span key={label}>
            <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
            {repo && <StarCount repo={repo} />}
          </span>
        );
      })}
    </p>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="section" aria-labelledby={id}>
      <h2 id={id} className="section-title">{title}</h2>
      <div className="cv-rows">{children}</div>
    </section>
  );
}

export default function CVPage() {
  return (
    <main id="main-content" className="page">
      <header className="cv-head">
        <h1>Bowen Xue<span lang="zh">薛博文</span></h1>
        <p className="cv-field">Undergraduate in Computer Science, USTC · Research intern, Stanford University</p>
        <div className="cv-contact">
          <a href="mailto:bowenxue2005@gmail.com">bowenxue2005@gmail.com</a>
          <a href="https://bowenxue.me">bowenxue.me</a>
          <ProfileLinks />
        </div>
      </header>

      <Section id="education" title="Education">
        <div className="cv-row">
          <time className="cv-when">2023 – 2027</time>
          <div>
            <h3 className="cv-title">University of Science and Technology of&nbsp;China</h3>
            <p className="cv-sub">B.Eng. in Computer Science and Technology, expected June 2027</p>
          </div>
        </div>
      </Section>

      <Section id="publications" title="Publications">
        {papers.map((paper) => (
          <article className="cv-row" id={`pub-${paper.id}`} key={paper.id}>
            <span className="cv-when">{paper.venue ? <span className="venue">{paper.venue}</span> : paper.date}</span>
            <div>
              <h3 className="cv-title">{paper.title}: {keepTail(paper.subtitle)}</h3>
              <p className="cv-sub"><Credit text={paper.credit} /></p>
              <TextLinks links={paper.links} />
            </div>
          </article>
        ))}
      </Section>

      <Section id="experience" title="Research Experience">
        {experience.map((item) => (
          <article className="cv-row" key={item.org}>
            <time className="cv-when">{item.when}</time>
            <div>
              <h3 className="cv-title">{item.org}</h3>
              <p className="cv-sub">{item.role}</p>
              <ul className="cv-bullets">
                {item.work.map((work) => (
                  <li key={work.name}>
                    <p className="cv-work">
                      {work.href ? <a href={work.href}>{work.name}</a> : work.name}
                      {work.venue && <span className="venue">{work.venue}</span>}
                    </p>
                    <p>{keepTail(work.note)}</p>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </Section>

      <Section id="projects" title="Projects">
        {projects.map((project) => (
          <article className="cv-row" id={`project-${project.id}`} key={project.id}>
            <time className="cv-when">{projectDates[project.id]}</time>
            <div>
              <h3 className="cv-title">{project.title}</h3>
              <p className="cv-sub"><Credit text={project.credit} /></p>
              <p className="cv-text">{keepTail(project.description)}</p>
              <TextLinks links={project.links} />
            </div>
          </article>
        ))}
      </Section>
    </main>
  );
}
