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

      {/* 教育背景 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">🎓 Education</h2>
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
          <p className="font-semibold">University of Science and Technology of China (USTC)</p>
          <p className="text-sm text-gray-600">Sep. 2023 – Present</p>
          <p className="mt-1">Undergraduate Student in Computer Science and Technology</p>
          <p className="text-sm text-gray-600">Expected Graduation: June 2027</p>
        </div>
      </section>

      {/* 实习与项目 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">💼 Internships and Projects</h2>
        <div className="space-y-4">

        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
            <p className="font-semibold text-lg">MIT HAN Lab Intern</p>
            <p className="text-sm text-gray-600">Apr. 2025 – Present</p>
            <p className="text-sm mt-2">
            Conduct research under the guidance of PhD student Muyang Li.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">

            </ul>
            <p className="text-sm text-gray-500 mt-3">AIGC, Diffusion, Face Fusion</p>
          </div>
          {/* Tencent */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
            <p className="font-semibold text-lg">Tencent Intern</p>
            <p className="text-sm text-gray-600">Nov. 2024 – Present</p>
            <p className="text-sm mt-2">
            Worked at WXG, researching and implementing the latest image/video face-swapping algorithms.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Enhanced the face fusion algorithm, achieving a 20% improvement in facial similarity metrics and surpassing IP-Adapter, InstantID, and PULID in aesthetic quality</li>
              <li>Reduced inference time from 20s to 5s while maintaining quality</li>
              <li>Fine-tuned SDXL for Chinese-style portrait generation</li>
            </ul>
            <p className="text-sm text-gray-500 mt-3">AIGC, Diffusion, Face Fusion</p>
          </div>

          {/* IDEA */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
            <p className="font-semibold text-lg">IDEA ReadPaper Intern</p>
            <p className="text-sm text-gray-600">Aug. 2024 – Nov. 2024</p>
            <p className="text-sm mt-2">
              Designed and built academic graph systems and disambiguation algorithms for LLM reasoning and paper recommendation.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Developed knowledge graph schema for academic resources</li>
              <li>Built entity disambiguation and deduplication systems</li>
             <li>Integrated into production at <Link href="https://www.readpaper.com" className="text-purple-600 underline" target="_blank">www.readpaper.com</Link></li>
            </ul>
            <p className="text-sm text-gray-500 mt-3">Graph datasets, RAG</p>
          </div>

          {/* LoRAExpand */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
            <p className="font-semibold text-lg">LoRAExpand</p>
            <p className="text-sm text-gray-600">Nov. 2023 – Jun. 2024</p>
            <p className="text-sm mt-2">
            Built a model capable of generating landscape paintings while placing specific calligraphy in designated regions.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Trained LoRA with Chinese landscape dataset</li>
              <li>Integrated SVD for text-to-video rendering</li>
              <li>Combined with AnyText for dynamic calligraphy placement</li>
              <li>Deployed UI with Gradio</li>
              <li>Code: <Link href="https://github.com/KBRASK/GuofengLoRA" className="text-purple-600 underline" target="_blank">GitHub</Link></li>
            </ul>
            <p className="text-sm text-gray-500 mt-3">Diffusion, LoRA, AnyText, Gradio</p>
          </div>

          {/* Deepin QAbot */}
          <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
            <p className="font-semibold text-lg">Deepin AI QAbot</p>
            <p className="text-sm text-gray-600">May 2024 – Aug. 2024</p>
            <p className="text-sm mt-2">
              Built a lightweight RAG system to answer domain-specific queries over structured documents.
            </p>
            <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1">
              <li>Designed RAG pipeline with custom retriever + reader + answerer</li>
              <li>Deployed with Gradio UI and minimal hardware requirement</li>
            </ul>
            <p className="text-sm text-gray-500 mt-3">LLM, RAG, Gradio</p>
          </div>
        </div>
      </section>

      {/* 技能 */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-3">🛠 Technical Skills</h2>
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md">
          <ul className="list-disc pl-5 text-gray-700 space-y-1">
            <li>Languages: Python</li>
            <li>Platforms: Linux, Windows</li>
          </ul>
        </div>
      </section>

      {/* 附加信息 */}
      <section>
        <h2 className="text-xl font-semibold mb-3">ℹ️ Additional Information</h2>
        <div className="bg-white/70 backdrop-blur-md p-5 rounded-xl shadow-md space-y-2 text-gray-700">
          <ul className="list-disc pl-5 space-y-1">
            <li>Ranked Top 3% in Kaggle House Prices competition</li>
            <li>Research with Prof. Xiangnan He on AIGC + RecSys</li>
            <li>Authored review paper: <Link href="https://www.xbwustc.com/paper" className="text-purple-600 underline" target="_blank">www.xbwustc.com/paper</Link></li>
            <li>Website: <Link href="https://www.xbwustc.com" className="text-purple-600 underline" target="_blank">www.xbwustc.com</Link></li>
          </ul>
        </div>
      </section>
    </motion.main>
  );
}
