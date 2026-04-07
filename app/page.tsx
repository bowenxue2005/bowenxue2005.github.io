'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import SpotlightCard from './components/SpotlightCard';

export default function HomePage() {
  const avatarCardRef = useRef<HTMLDivElement>(null);
  const [isAvatarPopoverOpen, setIsAvatarPopoverOpen] = useState(false);

  const dismissAvatarPopover = useCallback(() => {
    setIsAvatarPopoverOpen(false);

    const activeElement = document.activeElement;
    if (
      activeElement instanceof HTMLElement &&
      avatarCardRef.current?.contains(activeElement)
    ) {
      activeElement.blur();
    }
  }, []);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        dismissAvatarPopover();
      }
    };

    window.addEventListener('blur', dismissAvatarPopover);
    window.addEventListener('pagehide', dismissAvatarPopover);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('blur', dismissAvatarPopover);
      window.removeEventListener('pagehide', dismissAvatarPopover);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [dismissAvatarPopover]);

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
        <div
          ref={avatarCardRef}
          tabIndex={0}
          aria-describedby="also-check-out-yujia"
          onMouseEnter={() => setIsAvatarPopoverOpen(true)}
          onMouseLeave={() => setIsAvatarPopoverOpen(false)}
          onFocus={() => setIsAvatarPopoverOpen(true)}
          onBlur={(event) => {
            const nextFocusedElement = event.relatedTarget;
            if (
              !(nextFocusedElement instanceof Node) ||
              !event.currentTarget.contains(nextFocusedElement)
            ) {
              setIsAvatarPopoverOpen(false);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              dismissAvatarPopover();
            }
          }}
          className="relative shrink-0 rounded-[1.35rem] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-4 focus-visible:ring-offset-white/60"
        >
          <Image
            src="/avatar.jpg"
            alt="Avatar"
            width={120}
            height={120}
            className={`rounded-xl border border-white/80 shadow-md transition-all duration-300 ease-out ${
              isAvatarPopoverOpen ? '-translate-y-0.5 shadow-xl' : ''
            }`}
          />

          <div
            aria-hidden="true"
            className="absolute left-1/2 top-full z-10 h-5 w-40 -translate-x-1/2"
          />

          <div
            id="also-check-out-yujia"
            className={`absolute left-1/2 top-full z-20 mt-2 w-max min-w-52 -translate-x-1/2 rounded-2xl border border-purple-100 bg-white/90 px-4 py-3 text-left shadow-[0_18px_45px_rgba(88,28,135,0.14)] backdrop-blur-md transition-all duration-300 ease-out ${
              isAvatarPopoverOpen
                ? 'pointer-events-auto translate-y-0 scale-100 opacity-100'
                : 'pointer-events-none translate-y-2 scale-95 opacity-0'
            }`}
          >
            <div className="absolute left-1/2 top-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rotate-45 border-l border-t border-purple-100 bg-white/90" />
            <p className="text-sm font-medium text-gray-700">
              Also check out:{' '}
              <a
                href="https://www.yujiazeng.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={dismissAvatarPopover}
                className="font-medium text-blue-500 underline underline-offset-2 transition-colors duration-200 hover:text-blue-600 focus-visible:text-blue-600 focus-visible:outline-none"
              >
                Yujia
              </a>.
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Bowen Xue (薛博文)</h1>
          <p className="text-gray-700 mt-2 max-w-xl">
                    I am a third-year undergrad at USTC, currently an algorithm intern at ByteDance. Previously, I interned at{' '}
                    <a
                      href="https://hanlab.mit.edu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline hover:text-blue-600"
                    >
                      MIT HanLab
                    </a>
                    {' '}and Tencent. I explore generative models and am actively seeking Fall 2027 PhD opportunities.
                  </p>
              <div className="flex space-x-4 text-xl text-gray-700 mt-3">
                <a href="mailto:bowenxue2005@gmail.com" aria-label="Email"><FaEnvelope /></a>
                <a href="https://github.com/KBRASK" target="_blank" aria-label="GitHub"><FaGithub /></a>
              </div>
            </div>
      </motion.div>

      {/* 研究兴趣 & 目标 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-5 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2">🎯 Research Interests</h2>
          <p>Generative models, Image generation, Video generation, diffusion models, large model acceleration.</p>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white p-5 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2">🔍 Goal</h2>
          <p>My ultimate ambition is to revolutionize generative AI models, making them
significantly faster, better, and more versatile. My dream is to develop generative AI models
that can flawlessly accomplish a vast array of generative tasks at unprecedented quality.
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
          🚀 <span className="font-medium">Released my new academic homepage!</span> Feel free to reach out!
        </>
      ),
    },
    {
      date: 'Apr 2025',
      content: (
        <>
          🎓 <span className="font-medium">Started a new research journey as an intern at <a href="https://hanlab.mit.edu" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-purple-700">MIT Han Lab</a>!</span>
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
