import Image from 'next/image';
import ProfileLinks from './components/ProfileLinks';
import WorkEntry from './components/WorkEntry';
import { works } from './content';

const external = { target: '_blank', rel: 'noopener noreferrer' } as const;

// Venues and organisations are set in weight, as on the earlier site.
const news = [
  { date: 'Oct 2026', dateTime: '2026-10', content: <>Released <a href="https://github.com/FlashML-org/FreeVideo" {...external}>FreeVideo</a>, an open‑source inference engine for MiniMax H3 on consumer GPUs.</> },
  { date: 'Jun 2026', dateTime: '2026-06', content: <>Ring Forcing was accepted to <span className="hl">ECCV 2026</span>.</> },
  { date: 'Jun 2026', dateTime: '2026-06', content: <>Joined <a className="person" href="https://jiajunwu.com/" {...external}>Prof. Jiajun Wu</a>’s group at <span className="hl">Stanford University</span> as a research intern.</> },
  { date: 'May 2026', dateTime: '2026-05', content: <>FourTune was accepted to <span className="hl">ICML 2026</span>.</> },
  { date: 'Feb 2026', dateTime: '2026-02', content: <>Stand-In was accepted to <span className="hl">CVPR 2026</span>.</> },
  { date: 'Sep 2025', dateTime: '2025-09', content: <>Joined <span className="hl">ByteDance</span> as a research intern.</> },
  { date: 'Apr 2025', dateTime: '2025-04', content: <>Joined <span className="hl">MIT HAN Lab</span> as a research intern.</> },
  { date: 'Nov 2024', dateTime: '2024-11', content: <>Joined <span className="hl">Tencent</span> as a research intern.</> },
];

export default function HomePage() {
  return (
    <main id="main-content" className="page">
      <section className="intro" aria-labelledby="name">
        <div className="intro-text">
          <h1 id="name">Bowen Xue<span lang="zh">薛博文</span></h1>
          <p className="bio">
            I am a fourth-year undergraduate in Computer Science at USTC and a research intern with{' '}
            <a href="https://jiajunwu.com/" {...external}>Prof. Jiajun Wu</a> at Stanford University. I
            work on visual generation, with a focus on controllability and
            efficiency. I previously interned at ByteDance, MIT HAN Lab and Tencent, and I am
            applying to PhD programs for Fall&nbsp;2027.
          </p>
          <ProfileLinks />
        </div>
        <Image className="portrait" src="/media/portrait.webp" alt="Bowen Xue" width={520} height={520} priority />
      </section>

      <section className="section" aria-labelledby="news">
        <h2 id="news" className="section-title">News</h2>
        <ul className="news">
          {news.map((item, index) => (
            <li key={`${item.dateTime}-${index}`}>
              <time dateTime={item.dateTime}>{item.date}</time>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section" aria-labelledby="works">
        <h2 id="works" className="section-title">Publications &amp; Projects</h2>
        {works.map((work) => <WorkEntry key={work.id} work={work} />)}
      </section>
    </main>
  );
}
