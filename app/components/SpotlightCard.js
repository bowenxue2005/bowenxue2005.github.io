'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiFileText, FiHome, FiDownload } from 'react-icons/fi';

const SMALL_SCREEN_QUERY = '(max-width: 768px)';

/**
 * Returns null until mounted, then true/false. Both card layouts live in the
 * DOM at once (CSS decides which one is visible), so this is used purely to
 * pick which of the two should own the heavy <video> element.
 */
function useIsSmallScreen() {
  const [isSmall, setIsSmall] = useState(null);

  useEffect(() => {
    const media = window.matchMedia(SMALL_SCREEN_QUERY);
    const update = () => setIsSmall(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isSmall;
}

function PublicationMedia({ publication, variant }) {
  const isSmall = useIsSmallScreen();

  if (publication.video) {
    // Mounting the video in both layouts would fetch and decode the same file
    // twice, so only the currently visible layout renders it.
    const owns = isSmall === null ? false : isSmall === (variant === 'mobile');
    if (!owns) return <div className="w-full h-full bg-slate-100" />;

    return (
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
    );
  }

  if (publication.image) {
    // Static import, so next/image reads the intrinsic size from the file and
    // reserves the right box up front — no layout shift, no hardcoded numbers.
    return (
      <div className="w-full h-full bg-white p-3">
        <Image
          src={publication.image}
          alt={publication.title}
          sizes="(max-width: 768px) 100vw, 45vw"
          className="w-full h-full object-contain"
        />
      </div>
    );
  }

  return null;
}

function PublicationLinks({ links = {}, mobile = false }) {
  const items = [
    { key: 'project', href: links.project, label: 'Project Page', mobileLabel: 'Project', Icon: FiHome, primary: true },
    { key: 'paper', href: links.paper, label: 'Paper', mobileLabel: 'Paper', Icon: FiFileText, primary: true },
    { key: 'code', href: links.code, label: 'Code', mobileLabel: 'Code', Icon: FiGithub, primary: false },
    { key: 'models', href: links.models, label: 'Models', mobileLabel: 'Models', Icon: FiDownload, primary: false },
  ].filter((item) => item.href);

  if (items.length === 0) return null;

  return (
    <div className={`grid ${items.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3 ${mobile ? 'mt-2' : ''}`}>
      {items.map(({ key, href, label, mobileLabel, Icon, primary }) => (
        <motion.a
          key={key}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`flex w-full items-center justify-center gap-2 px-3 py-2 ${mobile ? 'text-sm' : 'text-xs md:text-sm'} font-medium rounded-lg transition-colors ${
            primary ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          }`}
          whileHover={mobile ? undefined : { scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon /> {mobile ? mobileLabel : label}
        </motion.a>
      ))}
    </div>
  );
}


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
              <PublicationMedia publication={publication} variant="mobile" />
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-bold text-slate-800">{publication.title}</h3>
              <p className="text-sm text-slate-500 mt-1">{publication.authors}</p>
              <p
                className="text-sm text-slate-600 my-3"
                style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.5rem', maxHeight: '4.5rem' }}
              >
                <span className="font-semibold text-purple-700 bg-purple-50/50 border border-purple-200 px-2 py-[1px] rounded-md mr-2 inline-block text-[12px]">
                  {publication.venue}
                </span>
                {publication.shortDescription}
              </p>
              <PublicationLinks links={publication.links} mobile />
            </div>
          </div>
        </div>

        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute top-0 left-0 w-full h-full"
        >
          <div className="w-full h-full p-6 flex flex-col justify-center items-center rounded-2xl bg-purple-50 border border-purple-300">
            <h4 className="text-xl font-bold text-purple-700 text-center">{publication.backTitle || '✨ Behind the Work'}</h4>
            {publication.description && (
              <p className="text-slate-600 mt-4 text-center text-sm">
                {publication.description}
              </p>
            )}
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
        className="relative w-full aspect-[900/334] max-w-4xl mx-auto rounded-2xl"
      >
        <motion.div
          className="relative w-full h-full"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: isFlipped ? -180 : 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          <div style={{ backfaceVisibility: 'hidden' }} className="absolute w-full h-full">
            <div className="w-full h-full p-4 md:px-5 grid grid-cols-2 gap-4 md:gap-6 items-center rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
              <div style={{ transform: 'translateZ(60px)', transformStyle: 'preserve-3d' }}>
                <div className="w-full h-[85%] rounded-lg overflow-hidden shadow-lg" style={{ transform: 'translateZ(25px)' }}>
                  <PublicationMedia publication={publication} variant="desktop" />
                </div>
              </div>
              <div style={{ transform: 'translateZ(35px) translateY(-3px)' }} className="flex flex-col justify-center h-full">
                <div>
                  <h3 className="text-xs sm:text-base md:text-[19px] font-bold text-slate-800">{publication.title}</h3>
                  <p className="text-xs md:text-sm text-slate-500 mt-1">{publication.authors}</p>
                </div>

                <p
                  className="text-xs md:text-sm text-slate-600 my-2 md:my-3"
                  style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.42rem', maxHeight: '4.26rem' }}
                >
                  <span className="font-semibold text-purple-700 bg-purple-50/50 border border-purple-200 px-2 py-[1px] rounded-md mr-2 inline-block text-[12px]">
                    {publication.venue}
                  </span>
                  {publication.shortDescription}
                </p>
                <PublicationLinks links={publication.links} />
              </div>
            </div>
          </div>

          <div
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
            className="absolute w-full h-full"
          >
            <div className="w-full h-full p-6 flex flex-col justify-center items-center rounded-2xl bg-purple-50 border border-purple-300">
              <h4 className="text-2xl font-bold text-purple-700">{publication.backTitle || '✨ Behind the Work'}</h4>
              {publication.description && (
                <p className="text-slate-600 mt-4 text-center">
                  {publication.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}



/**
 * Both layouts are rendered and switched with CSS rather than a JS media
 * query, so the server-rendered markup already matches the viewport and
 * phones no longer flash the desktop layout before hydration.
 */
export default function InteractiveCard({ publication }) {
  return (
    <>
      <div className="md:hidden">
        <MobileCard publication={publication} />
      </div>
      <div className="hidden md:block">
        <DesktopCard publication={publication} />
      </div>
    </>
  );
}
