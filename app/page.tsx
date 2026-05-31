'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import SpotlightCard from './components/SpotlightCard';

export default function HomePage() {
const publications = [
  {
    video: 'video/Stand-In.mp4',
    title: 'Stand-In: A Lightweight and Plug-and-Play Identity Control for Video Generation',
    authors: 'Bowen Xue, Qixin Yan, Wenjing Wang, Hao Liu, Chen Li',
    venue: 'CVPR 2026',
    shortDescription: 'Stand-In trains just 1% of the original model’s parameters with 2,000 video–prompt pairs, yet achieves high-quality identity-preserving video generation.',
    description: 'This was my first complete research project. Ten days after releasing it on GitHub, Stand-In gained over 500 stars, and my work was accepted by the community. During that period, I almost refreshed the star count every day whenever I had free time, actively responded to issues, and improved the project as planned. Later, when the tide receded, everything almost returned to normal—except that I kept working hard: maintaining the project and preparing for the next, more solid one.',
    links: {
      project: 'https://www.stand-in.tech/', 
      paper: 'https://arxiv.org/abs/2508.07901',
      code: 'https://github.com/WeChatCV/Stand-In',
      models: 'https://huggingface.co/BowenXue/Stand-In'
    },
  },
];
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-24 px-4 py-12 min-h-screen max-w-4xl mx-auto text-gray-800"
    >
      {/* 顶部卡片 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6"
      >
        <div className="shrink-0 flex flex-col items-center gap-4">
          <Image
            src="/avatar.jpg"
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-xl border border-white/80 shadow-md"
          />
          <div className="flex space-x-4 text-xl text-gray-700">
            <a
              href="mailto:bowenxue2005@gmail.com"
              aria-label="Email"
              className="transition-colors duration-200 hover:text-purple-600 focus-visible:text-purple-600 focus-visible:outline-none"
            >
              <FaEnvelope />
            </a>
            <a
              href="https://scholar.google.com/citations?user=PLeb2oAAAAAJ&hl=en"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Google Scholar"
              className="transition-colors duration-200 hover:text-purple-600 focus-visible:text-purple-600 focus-visible:outline-none"
            >
              <SiGooglescholar />
            </a>
            <a
              href="https://github.com/KBRASK"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors duration-200 hover:text-purple-600 focus-visible:text-purple-600 focus-visible:outline-none"
            >
              <FaGithub />
            </a>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Bowen Xue (薛博文)</h1>
          <p className="text-gray-700 mt-2 max-w-xl text-pretty">
                    I am a third-year undergraduate at USTC, currently a research intern with Prof. Jiajun Wu at Stanford University. Previously, I interned at ByteDance,{' '}
                    <a
                      href="https://hanlab.mit.edu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-600"
                    >
                      MIT HAN Lab
                    </a>
                    {', '}and Tencent. I explore visual generation and am actively seeking Fall 2027 PhD opportunities.
                  </p>
            </div>
      </motion.div>

      {/* 研究兴趣 & 目标 */}
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-5 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2">🎯 Research Interests</h2>
          <p>Visual Generation: Image Generation, Video Generation, World Models, Efficient Visual Generation.</p>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-5 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2">🔍 Goal</h2>
          <p className="text-pretty">
            Making visual generation controllable as well as impressive. I study how to
            translate human intent into visual content faithfully, efficiently, and at scale.
          </p>
        </motion.div>
      </div>

      {/* 时间线 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-12"
      >
<section className="mt-12">
  <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
    📰 News
  </h2>

  <div className="relative pl-6">
    {/* 主时间线 */}
    <div className="absolute top-0 left-1.5 w-0.5 h-full bg-purple-400" />

    <ul className="space-y-6"> {/* 间距从 12 缩小到 6 */}
      {[
        {
          date: 'Jun 2026',
          content: (
            <>
              🎓 <span className="font-medium">Started as a research intern in Prof. Jiajun Wu&apos;s group at <span className="text-blue-500">Stanford University</span>.</span>
            </>
          ),
        },
        {
          date: 'May 2026',
          content: (
            <>
              🎉 <span className="font-medium">FourTune was accepted by <span className="text-blue-500">ICML 2026!</span> More details coming soon.</span>
            </>
          ),
        },
        {
          date: 'Feb 2026',
          content: (
            <>
              🎉 <span className="font-medium">Stand-In was accepted by <span className="text-blue-500">CVPR 2026!</span> See you in Denver!</span>
            </>
          ),
        },
        {
          date: 'Sep 2025',
          content: (
            <>
              💼 <span className="font-medium">Joined <span className="text-blue-500">ByteDance</span> as an Algorithm Intern.</span>
            </>
          ),
        },
        {
          date: 'Apr 2025',
          content: (
            <>
              🎓 <span className="font-medium">Started a new research journey as an intern at <a href="https://hanlab.mit.edu" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-purple-700">MIT HAN Lab</a>!</span>
            </>
          ),
        },
        {
          date: 'Nov 2024',
          content: (
            <>
              💼 <span className="font-medium">Worked as an Algorithm Intern at <span className="text-blue-500">Tencent</span>.</span>
            </>
          ),
        },
      ].map((item, index) => (
    <li key={index} className="relative flex items-start gap-4">
      <div className="w-2.5 h-2.5 bg-purple-500 rounded-full z-10 shrink-0 mt-1.5" />

      <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
        <time className="text-base font-semibold text-gray-400 sm:w-20 shrink-0 tabular-nums">
          {item.date}
        </time>
        <div className="text-base text-gray-800 leading-relaxed">
          {item.content}
        </div>
      </div>
    </li>
  ))}
</ul>
  </div>
</section>
      </motion.div>

<section className="mt-12">
  <h2 className="text-2xl font-bold mb-6">📝 Publications</h2>
  <div className="space-y-8">
    {publications.map((pub, index) => (
      <SpotlightCard key={index} publication={pub} />
    ))}
  </div>
</section>

    </motion.main>
  );
}
