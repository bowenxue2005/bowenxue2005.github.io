'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiGithub, FiFileText, FiHome, FiDownload } from 'react-icons/fi';

const SMALL_SCREEN_QUERY = '(max-width: 768px)';

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
  return (
    <article className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-md shadow-lg">
        <div className="w-full aspect-video rounded-lg overflow-hidden shadow-md">
          <PublicationMedia publication={publication} variant="mobile" />
        </div>

        <div className="flex flex-col">
          <div>
            <h3 className="text-lg font-bold text-slate-800">{publication.title}</h3>
            <p className="text-sm text-slate-500 mt-1">{publication.authors}</p>
          </div>

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
    </article>
  );
}

function DesktopCard({ publication }) {
  return (
    <article className="relative w-full aspect-[900/334] max-w-4xl mx-auto rounded-2xl">
      <div className="absolute w-full h-full">
        <div className="w-full h-full p-4 md:px-5 grid grid-cols-2 gap-4 md:gap-6 items-center rounded-2xl bg-white/80 border border-slate-200 backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-purple-500/20">
          <div>
            <div className="w-full h-[85%] rounded-lg overflow-hidden shadow-lg">
              <PublicationMedia publication={publication} variant="desktop" />
            </div>
          </div>

          <div
            className="flex flex-col justify-center h-full"
            style={{ transform: 'translateY(-3px)' }}
          >
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
    </article>
  );
}

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
