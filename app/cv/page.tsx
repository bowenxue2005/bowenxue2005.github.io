'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CVPage() {
  return (
    <motion.main
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="pt-24 px-4 py-12 min-h-screen max-w-4xl mx-auto text-gray-800"
    >
      <h1 className="text-3xl font-bold mb-8">📄 Curriculum Vitae</h1>

      {/* Education */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">🎓 Education</h2>
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row justify-between sm:items-start">
            <p className="font-semibold text-lg">University of Science and Technology of China (USTC)</p>
            <p className="text-sm text-gray-600">Sep. 2023 – Present</p>
          </div>
          <p className="mt-2 text-gray-800">
            <span className="italic">B.Eng. Candidate</span> in Computer Science and Technology
          </p>
          <p className="text-sm text-gray-600 mt-1">Expected Graduation: June 2027</p>
        </div>
      </section>

      {/* Publications */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">📚 Publications</h2>
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
          <ul className="space-y-5 text-gray-800">
            <li className="flex gap-3">
              <span className="font-semibold text-gray-500">[1]</span>
              <div>
                <p className="leading-relaxed">
                  <strong>Bowen Xue</strong>*, Zheng-Peng Duan*, Qixin Yan, Wenjing Wang, Hao Liu, Chun-Le Guo, Chongyi Li, Chen Li, and Jing LYU, <span className="italic">Stand-In: A Lightweight and Plug-and-Play Identity Control for Video Generation</span>.
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm">
                  <span className="font-bold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-md">CVPR 2026</span>
                  <Link href="https://arxiv.org/abs/2508.07901" className="text-purple-600 hover:text-purple-700 underline" target="_blank">PDF</Link>
                  <Link href="https://github.com/WeChatCV/Stand-In" className="text-purple-600 hover:text-purple-700 underline" target="_blank">GitHub (700+ Stars)</Link>
                  <Link href="https://www.stand-in.tech/" className="text-purple-600 hover:text-purple-700 underline" target="_blank">Project Page</Link>
                </div>
              </div>
            </li>
            
            <li className="flex gap-3">
              <span className="font-semibold text-gray-500">[2]</span>
              <p className="leading-relaxed">
                <strong>Bowen Xue</strong>*, Zihan Min*, Xingyang Li*, Muyang Li, Yujun Lin, Zhekai Zhang, Haocheng Xi, Lvmin Zhang, Maneesh Agrawala, Jun-Yan Zhu, and Song Han, <span className="italic">FourTune: Towards Fully 4-Bit Efficient Post-Training for Diffusion Models</span>.
              </p>
            </li>

            <li className="flex gap-3">
              <span className="font-semibold text-gray-500">[3]</span>
              <p className="leading-relaxed">
                <strong>Bowen Xue</strong>, Brandon Y. Feng, Chenguo Lin, Yuchen Lin, Yujia Zeng, Lvmin Zhang, Honglei Yan, and Panwang Pan, <span className="italic">Ring Forcing: Towards Precise Long-Term Memory for Autoregressive Video Diffusion</span>.
              </p>
            </li>
          </ul>
        </div>
      </section>

      {/* Experience */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">💼 Experience</h2>
        <div className="space-y-4">

          {/* ByteDance */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
              <p className="font-semibold text-lg text-slate-800">ByteDance</p>
              <p className="text-sm text-gray-600">Sep. 2025 – Present</p>
            </div>
            <p className="text-sm text-gray-700 mb-2">Research intern</p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>
                Proposed <strong><span className="italic">Ring Forcing</span></strong> to address the challenge of constructing and utilizing memory in long video generation. Extended the effective history span by 30× under a fixed sequence length, achieving minute-level memory and effectively maintaining long-term consistency.
              </li>
            </ul>
            <p className="text-sm text-slate-500 mt-4">Long Video Generation, AR Diffusion</p>
          </div>

          {/* MIT HANLab */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
              <p className="font-semibold text-lg text-slate-800">MIT HANLab</p>
              <p className="text-sm text-gray-600">Apr. 2025 – Feb. 2026</p>
            </div>
            <p className="text-sm text-gray-700 mb-2">Research intern (Remote)</p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-2">
              <li>
                Designed <strong><span className="italic">FourTune</span></strong>, the first training framework for diffusion models with 4-bit weights, activations, and gradients. Reduced VRAM usage by 2.25× and accelerated training by 2.27× on FLUX.1-dev compared to 16-bit LoRA, while supporting Qwen-Image. Achieved full-precision performance in Customization, RL, and Distillation tasks.
              </li>
              <li>
                Core contributor to <Link href="https://github.com/nunchaku-tech/nunchaku" className="text-purple-700 font-bold hover:underline" target="_blank">nunchaku (3.7K Stars)</Link> and <Link href="https://github.com/nunchaku-tech/ComfyUI-nunchaku" className="text-purple-700 font-bold hover:underline" target="_blank">ComfyUI-nunchaku (2.8K Stars)</Link>. <br />
                This library is an inference acceleration framework for 4-bit quantized diffusion models. Integrated PuLID into the nunchaku inference framework, significantly boosting inference speed and reducing VRAM usage while maintaining identity preservation and image quality.
              </li>
            </ul>
            <p className="text-sm text-slate-500 mt-4">Diffusion Model, Quantization, Acceleration, Post-Training</p>
          </div>

          {/* Tencent */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-1">
              <p className="font-semibold text-lg text-slate-800">Tencent</p>
              <p className="text-sm text-gray-600">Nov. 2024 – Sep. 2025</p>
            </div>
            <p className="text-sm text-gray-700 mb-2">Research intern</p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-2">
              <li>
                Proposed <strong><span className="italic">Stand-In</span></strong> (<span className="text-purple-700 font-bold">CVPR 2026</span>), a lightweight and plug-and-play identity control framework for video generation, achieving SOTA face similarity and naturalness with minimal parameter and training costs.
              </li>
              <li>
                Designed a identity-preserving image generation algorithm outperforming IP-Adapter and InstantID with a 4× inference speedup. Conducted large-scale SDXL fine-tuning for high-quality generation, successfully deploying the pipeline in <strong>WeChat Channels</strong>.
              </li>
            </ul>
            <p className="text-sm text-slate-500 mt-4">AIGC, Video Generation, IP2V, IP2I, Diffusion Model</p>
          </div>

        </div>
      </section>

      {/* Others */}
      <section>
        <h2 className="text-xl font-semibold mb-3">ℹ️ Others</h2>
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md text-gray-700">
          <ul className="list-disc pl-5 space-y-2">
            {/* <li><strong>GPA:</strong> 3.72 (Top 15%)</li> */}
            <li><strong>Competition:</strong> CCKS2025 Large Model Generated Text Detection - Rank 1/1094 (Leaderboard A)</li>
          </ul>
        </div>
      </section>
    </motion.main>
  );
}
