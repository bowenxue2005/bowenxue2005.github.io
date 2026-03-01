'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiFileText, FiHome, FiDownload } from 'react-icons/fi';
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      if (media.matches !== matches) {
        setMatches(media.matches);
      }
      const listener = () => setMatches(media.matches);
      window.addEventListener('resize', listener);
      return () => window.removeEventListener('resize', listener);
    }
  }, [matches, query]);

  return matches;
};


function MobileCard({ publication }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      onClick={handleFlip}
      className="w-full max-w-md mx-auto"
      style={{ perspective: '1000px', cursor: 'pointer' }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      >
        <div style={{ backfaceVisibility: 'hidden' }} className="w-full h-full">
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-md shadow-lg">
            <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
              {publication.video && (
                <video
                  src={publication.video}
                  autoPlay
                  loop
                  muted
                  playsInline 
                  className="w-full h-full object-cover"
                >
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-800">{publication.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{publication.authors}</p>
              <p className="text-sm text-slate-600 my-3 leading-relaxed">
                <span className="font-semibold text-purple-700 bg-purple-50/50 border border-purple-200 px-2 py-[1px] rounded-md mr-2 inline-block text-[12px]">
                  {publication.venue}
                </span>
                {publication.shortDescription}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <motion.a href={publication.links.project} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-purple-100 text-purple-700 hover:bg-purple-200">
                  <FiHome /> Project
                </motion.a>
                <motion.a href={publication.links.paper} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-purple-100 text-purple-700 hover:bg-purple-200">
                  <FiFileText /> Paper
                </motion.a>
                <motion.a href={publication.links.code} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200">
                  <FiGithub /> Code
                </motion.a>
                <motion.a href={publication.links.models} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} whileTap={{ scale: 0.95 }} className="flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200">
                  <FiDownload /> Models
                </motion.a>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div className="w-full h-full p-6 flex flex-col justify-center items-center rounded-2xl bg-purple-50 border border-purple-300">
            <h4 className="text-xl font-bold text-purple-700 text-center">✨ Behind the Work</h4>
            <p className="text-slate-600 mt-4 text-center text-sm">
              {publication.description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}


function DesktopCard({ publication }) {
  const ref = useRef(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  const rotateX = useTransform(mouseYSpring, [0, 1], ['10deg', '-10deg']);
  const rotateY = useTransform(mouseXSpring, [0, 1], ['-10deg', '10deg']);

  const handleMouseMove = (e) => {
    if (!ref.current || isFlipped) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  return (
    <div
      onClick={handleFlip}
      className="w-full"
      style={{ perspective: '1000px', cursor: 'pointer' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          rotateX: isFlipped ? 0 : rotateX,
          rotateY: isFlipped ? 0 : rotateY,
        }}
        className="relative w-full aspect-[900/334] max-w-4xl mx-auto rounded-2xl transition-shadow duration-300"
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? -180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div style={{ backfaceVisibility: 'hidden' }} className="absolute w-full h-full">
            <div className="w-full h-full p-4 md:px-5 grid grid-cols-2 gap-4 md:gap-6 items-center rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-md hover:shadow-2xl hover:shadow-purple-500/20">
              <div style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}>
                <div className="w-full h-[85%] rounded-lg overflow-hidden shadow-lg" style={{ transform: 'translateZ(25px)' }}>
                  {publication.video && (
                    <video
                      src={publication.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              </div>
              <div style={{ transform: 'translateZ(35px) translateY(-3px)' }} className="flex flex-col justify-center h-full">
                <div>
                  <h3 className="text-xs sm:text-base md:text-xl font-bold text-slate-800">{publication.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">{publication.authors}</p>
                </div>
                
                <p
                  className="text-xs md:text-sm text-slate-600 my-2 md:my-3 leading-relaxed"
                  style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
<span className="font-semibold text-purple-700 bg-purple-50/50 border border-purple-200 px-2 py-[1px] rounded-md mr-2 inline-block text-[12px]">                   
                   {publication.venue}
                  </span>
                    {publication.shortDescription}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <motion.a href={publication.links.project} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex w-full items-center justify-center gap-2 px-3 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors bg-purple-100 text-purple-700 hover:bg-purple-200" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FiHome /> Project Page
                  </motion.a>
                  <motion.a href={publication.links.paper} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex w-full items-center justify-center gap-2 px-3 py-2 text-xs md:text-sm font-medium rounded-lg transition-colors bg-purple-100 text-purple-700 hover:bg-purple-200" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FiFileText /> Paper
                  </motion.a>
                  <motion.a href={publication.links.code} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex w-full items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FiGithub /> Code
                  </motion.a>
                  <motion.a href={publication.links.models} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex w-full items-center justify-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-slate-100 text-slate-600 hover:bg-slate-200" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <FiDownload /> Models
                  </motion.a>
                </div>
              </div>
            </div>
          </div>

          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute w-full h-full"
          >
            <div className="w-full h-full p-6 flex flex-col justify-center items-center rounded-2xl bg-purple-50 border border-purple-300">
              <h4 className="text-2xl font-bold text-purple-700">✨ Behind the Work</h4>
              <p className="text-slate-600 mt-4 text-center">
                {publication.description}
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}



export default function InteractiveCard({ publication }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
  return isMobile ? (
    <MobileCard publication={publication} />
  ) : (
    <DesktopCard publication={publication} />
  );
}