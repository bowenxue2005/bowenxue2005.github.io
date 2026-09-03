'use client';

import Image from 'next/image';
import fourTuneFigure from '@/public/figure/FourTune.png';
import { motion } from 'framer-motion';
import { FaEnvelope, FaGithub } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import SpotlightCard from './components/SpotlightCard';

const news = [
  {
    date: 'Jun 2026',
    dateTime: '2026-06',
    content: (
      <span className="font-medium">Ring Forcing was accepted by <span className="text-blue-500">ECCV 2026!</span> More details coming soon.</span>
    ),
  },
  {
    date: 'Jun 2026',
    dateTime: '2026-06',
    content: (
      <span className="font-medium">Started as a research intern in Prof. Jiajun Wu&apos;s group at <span className="text-blue-500">Stanford University</span>.</span>
    ),
  },
  {
    date: 'May 2026',
    dateTime: '2026-05',
    content: (
      <span className="font-medium">FourTune was accepted by <span className="text-blue-500">ICML 2026!</span></span>
    ),
  },
  {
    date: 'Feb 2026',
    dateTime: '2026-02',
    content: (
      <span className="font-medium">Stand-In was accepted by <span className="text-blue-500">CVPR 2026!</span> See you in Denver!</span>
    ),
  },
  {
    date: 'Sep 2025',
    dateTime: '2025-09',
    content: (
      <span className="font-medium">Joined <span className="text-blue-500">ByteDance</span> as a research intern.</span>
    ),
  },
  {
    date: 'Apr 2025',
    dateTime: '2025-04',
    content: (
      <span className="font-medium">Started a new research journey as an intern at <a href="https://hanlab.mit.edu" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline hover:text-purple-700">MIT HAN Lab</a>!</span>
    ),
  },
  {
    date: 'Nov 2024',
    dateTime: '2024-11',
    content: (
      <span className="font-medium">Worked as a research intern at <span className="text-blue-500">Tencent</span>.</span>
    ),
  },
];

export default function HomePage() {
const publications = [
  {
    image: fourTuneFigure,
    title: 'FourTune: Towards Fully 4-Bit Efficient Post-Training for Diffusion Models',
    authors: 'Bowen Xue*, Zihan Min*, Xingyang Li*, Zhekai Zhang, Haocheng Xi, Lvmin Zhang, Maneesh Agrawala, Jun-Yan Zhu, Song Han, Yujun Lin, and Muyang Li',
    venue: 'ICML 2026',
    shortDescription: 'FourTune enables end-to-end fully 4-bit diffusion post-training, matching BF16 LoRA quality with 2.25× lower memory and 2.27× higher throughput.',
    links: {
      paper: 'https://arxiv.org/abs/2607.05711',
    },
  },
  {
    video: 'video/Stand-In.mp4',
    title: 'Stand-In: A Lightweight and Plug-and-Play Identity Control for Video Generation',
    authors: 'Bowen Xue*, Zheng-Peng Duan*, Qixin Yan, Wenjing Wang, Hao Liu, Chun-Le Guo, Chongyi Li, Chen Li, and Jing LYU',
    venue: 'CVPR 2026',
    shortDescription: 'Stand-In trains just 1% of the original model’s parameters with 2,000 video–prompt pairs, yet achieves high-quality identity-preserving video generation.',
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
      className="px-4 pt-20 pb-10 sm:pt-24 sm:py-12 min-h-screen max-w-4xl mx-auto text-gray-800"
    >
      {/* 顶部卡片 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/70 backdrop-blur-md shadow-xl rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start space-y-5 sm:space-y-0 sm:space-x-6"
      >
        <div className="shrink-0 flex flex-col items-center gap-3 sm:gap-4">
          <Image
            src="/avatar.jpg"
            alt="Avatar"
            width={120}
            height={120}
            className="rounded-xl border border-white/80 shadow-md"
          />
          <div className="flex space-x-5 text-[21px] text-gray-700 sm:space-x-4 sm:text-xl">
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
        <div className="w-full min-w-0 sm:w-auto">
          <h1 className="text-center text-[27px] font-bold leading-tight sm:text-left sm:text-3xl">Bowen Xue (薛博文)</h1>
          <p className="mt-3 text-left text-[15px] leading-relaxed text-gray-700 text-pretty sm:mt-2 sm:max-w-xl sm:text-base sm:leading-normal">
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

      {/* 时间线 */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="mt-10 sm:mt-12"
      >
<section className="mt-10 sm:mt-12">
  <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
    News
  </h2>

  <div className="relative pl-5 sm:pl-6">
    <ul>
      {news.map((item, index) => (
    <li key={index} className="relative flex items-start gap-3 sm:gap-4 pb-5 last:pb-0 sm:pb-6">
      {/* 连接线：从本条圆点中心画到下一条圆点中心，最后一条不画 */}
      {index < news.length - 1 && (
        <span aria-hidden="true" className="absolute left-1 top-[11px] h-full w-0.5 bg-purple-400" />
      )}
      <div className="w-2.5 h-2.5 bg-purple-500 rounded-full z-10 shrink-0 mt-1.5" />

      <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
        <time dateTime={item.dateTime} className="text-sm sm:text-base font-semibold text-gray-400 sm:w-20 shrink-0 tabular-nums">
          {item.date}
        </time>
        <div className="text-[15px] sm:text-base text-gray-800 leading-relaxed">
          {item.content}
        </div>
      </div>
    </li>
  ))}
</ul>
  </div>
</section>
      </motion.div>

<section className="mt-10 sm:mt-12">
  <h2 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6">Publications</h2>
  <div className="space-y-8">
    {publications.map((pub, index) => (
      <SpotlightCard key={index} publication={pub} />
    ))}
  </div>
</section>

    </motion.main>
  );
}
