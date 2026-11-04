import type { Metadata } from 'next';
import ProfileLinks from '../components/ProfileLinks';
import { Credit, keepTail } from '../components/WorkEntry';
import { StarCount } from '../components/Stars';
import { papers, people, projects, type Work } from '../content';
import { repoFromUrl } from '../github';

export const metadata: Metadata = {
  title: 'CV',
  alternates: { canonical: '/cv' },
};

const NB = '‑';
const NUNCHAKU = 'https://github.com/nunchux-ai/nunchaku';
const COMFYUI_NUNCHAKU = 'https://github.com/nunchux-ai/ComfyUI-nunchaku';

/** A piece of work named inside a sentence: bold, linked, with its venue after it. */
function Named({ name, href, venue }: { name: string; href: string; venue?: string }) {
  const external = href.startsWith('http');
  return (
    <>
      <strong>
        <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{name}</a>
      </strong>
      {venue && <> (<span className="cv-venue">{venue}</span>)</>}
    </>
  );
}

const experience: {
  org: string;
  when: string;
  role: React.ReactNode;
  work: React.ReactNode[];
  topics: string;
}[] = [
  {
    org: 'Stanford University',
    when: 'Jun 2026 – present',
    role: <>Research intern with <a className="person" href={people['Jiajun Wu']} target="_blank" rel="noopener noreferrer">Prof. Jiajun Wu</a></>,
    work: [
      <>Proposed <Named name="UniAction" href="#pub-uniaction" />, a unified action{NB}conditioning framework for world models. Each action is represented as sparse elements with a semantic identity and spatiotemporal coordinates in the video model’s own positional space, so one model trained jointly on force, camera, hand pose and robot pose outperforms action{NB}specific&nbsp;experts.</>,
    ],
    topics: 'World Models, Controllable Video Generation',
  },
  {
    org: 'ByteDance',
    when: 'Sep 2025 – May 2026',
    role: 'Research intern',
    work: [
      <>Proposed <Named name="Ring Forcing" href="#pub-ring-forcing" venue="ECCV 2026" />, a long{NB}term memory framework for autoregressive video diffusion that enables minute{NB}scale generation with robust object permanence and precise retrieval of&nbsp;distant&nbsp;history.</>,
    ],
    topics: 'Long Video Generation, Autoregressive Diffusion',
  },
  {
    org: 'MIT HAN Lab',
    when: 'Apr 2025 – Feb 2026',
    role: 'Research intern, remote',
    work: [
      <>Designed <Named name="FourTune" href="#pub-fourtune" venue="ICML 2026" />, an end{NB}to{NB}end 4{NB}bit (W4A4G4) post{NB}training framework for diffusion models. It matches full{NB}precision fine{NB}tuning in customization, reinforcement learning and distillation, and on FLUX.1{NB}dev reduces memory by 2.25× and raises training throughput by 2.27× over&nbsp;BF16&nbsp;LoRA.</>,
      <>Contributed to <Named name="nunchaku" href={NUNCHAKU} /><StarCount repo="nunchux-ai/nunchaku" /> and <Named name="ComfyUI-nunchaku" href={COMFYUI_NUNCHAKU} /><StarCount repo="nunchux-ai/ComfyUI-nunchaku" />, an inference engine for 4{NB}bit diffusion models and its ComfyUI plugin. Integrated PuLID identity customization into both, bringing identity{NB}preserving generation to&nbsp;4{NB}bit&nbsp;FLUX.1{NB}dev.</>,
    ],
    topics: 'Diffusion Models, Quantization, Efficient Post-Training',
  },
  {
    org: 'Tencent',
    when: 'Nov 2024 – Sep 2025',
    role: 'Research intern',
    work: [
      <>Proposed <Named name="Stand-In" href="#pub-stand-in" venue="CVPR 2026" />, a lightweight and plug{NB}and{NB}play identity control framework for video generation. With about 1% additional parameters and 2,000 training pairs, it outperforms full{NB}parameter methods in video quality and&nbsp;identity&nbsp;preservation.</>,
      <>Designed an identity{NB}preserving image generation algorithm that outperforms IP{NB}Adapter and InstantID with 4× faster inference. Fine{NB}tuned SDXL at scale for high{NB}quality generation and deployed the pipeline in&nbsp;<strong>WeChat&nbsp;Channels</strong>.</>,
    ],
    topics: 'Identity-Preserving Generation, Video Generation, Diffusion Models',
  },
];

const projectDates: Record<string, string> = { freevideo: 'Oct 2026 – present' };

/** "Bowen Xue, author and maintainer" → "Author and maintainer": it is his own CV. */
function role(credit: string): string {
  const text = credit.replace(/^Bowen Xue,\s*/, '');
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/** Links as text, the way a CV reads; a repository carries its star count. */
function TextLinks({ links, venue }: { links: Work['links']; venue?: string }) {
  const items = [
    { label: 'Project', href: links.project },
    { label: 'Paper', href: links.paper },
    { label: 'Code', href: links.code },
    { label: 'Models', href: links.models },
    ...(links.more ?? []),
  ].filter((item): item is { label: string; href: string } => Boolean(item.href));
  return (
    <p className="cv-links">
      {venue && <span className="venue">{venue}</span>}
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
      {children}
    </section>
  );
}

/** An entry's heading, with its dates flush right as on a printed CV. */
function Entry({ title, when, id, children }: { title: string; when?: string; id?: string; children: React.ReactNode }) {
  return (
    <article className="cv-entry" id={id}>
      <div className="cv-entry-head">
        <h3 className="cv-title">{title}</h3>
        {when && <span className="cv-when">{when}</span>}
      </div>
      {children}
    </article>
  );
}

export default function CVPage() {
  const shownProjects = projects.filter((project) => projectDates[project.id]);
  return (
    <main id="main-content" className="page">
      <header className="cv-head">
        <h1>Bowen Xue<span lang="zh">薛博文</span></h1>
        <p className="cv-field">
          <span>Undergraduate in Computer Science,&nbsp;USTC</span>
          <span className="cv-field-sep"> · </span>
          <span>Research intern, Stanford&nbsp;University</span>
        </p>
        <div className="cv-contact">
          <a href="mailto:bowenxue2005@gmail.com">bowenxue2005@gmail.com</a>
          <a href="https://bowenxue.me">bowenxue.me</a>
          <ProfileLinks />
        </div>
      </header>

      <Section id="education" title="Education">
        <div className="cv-list">
          <Entry title="University of Science and Technology of China (USTC)" when="Sep 2023 – present">
            <p className="cv-sub">B.Eng. candidate in Computer Science&nbsp;and&nbsp;Technology</p>
            <p className="cv-sub">Expected graduation: June 2027</p>
          </Entry>
        </div>
      </Section>

      <Section id="publications" title="Publications">
        <ol className="cv-pubs">
          {papers.map((paper, index) => (
            <li className="cv-pub" id={`pub-${paper.id}`} key={paper.id}>
              <span className="cv-num">[{index + 1}]</span>
              <div>
                <h3 className="cv-title">{paper.title}: {keepTail(paper.subtitle, 2)}</h3>
                <p className="cv-authors"><Credit text={paper.credit} /></p>
                <TextLinks links={paper.links} venue={paper.venue} />
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="experience" title="Research Experience">
        <div className="cv-list">
          {experience.map((item) => (
            <Entry key={item.org} title={item.org} when={item.when}>
              <p className="cv-sub">{item.role}</p>
              <ul className="cv-bullets">
                {item.work.map((work, index) => <li key={index}>{work}</li>)}
              </ul>
              <p className="cv-topics">
                {item.topics.split(', ').map((topic, index, all) => (
                  <span key={topic}>
                    <span className="nowrap">{topic}{index < all.length - 1 && ','}</span>
                    {index < all.length - 1 && ' '}
                  </span>
                ))}
              </p>
            </Entry>
          ))}
        </div>
      </Section>

      <Section id="projects" title="Projects">
        <div className="cv-list">
          {shownProjects.map((project) => (
            <Entry key={project.id} id={`project-${project.id}`} title={project.title} when={projectDates[project.id]}>
              <p className="cv-sub">{role(project.credit)}</p>
              <p className="cv-text">{keepTail(project.description)}</p>
              <TextLinks links={project.links} />
            </Entry>
          ))}
        </div>
      </Section>
    </main>
  );
}
