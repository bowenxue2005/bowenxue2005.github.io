'use client';

import { useEffect, useRef } from 'react';

/**
 * A short, muted result clip. The file is only requested once the clip is
 * close to the viewport, and it plays only while it is on screen — so a visitor
 * who stops at the first entry never downloads the rest.
 */
export default function LoopingVideo({
  src,
  poster,
  width,
  height,
  label,
}: {
  src: string;
  poster: string;
  width: number;
  height: number;
  label: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;

    // Nothing is downloaded for a visitor who asked for reduced motion.
    // `preload` has to be promoted here too: with preload="none" the browser
    // ignores a src until something asks it to play.
    const ensureSrc = () => {
      if (video.src || motion.matches) return;
      video.preload = 'auto';
      video.src = src;
    };

    const sync = () => {
      ensureSrc();
      if (!video.src) return;
      if (visible && !document.hidden && !motion.matches) {
        void video.play().catch(() => {
          // Autoplay can still be refused; the poster stays in place.
        });
      } else if (!video.paused) {
        video.pause();
      }
    };

    // Two thresholds: fetch just before it arrives, play once it is on screen.
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        ensureSrc();
        if (video.src) loader.disconnect();
      },
      { rootMargin: '200px 0px' },
    );
    const player = new IntersectionObserver(([entry]) => {
      visible = entry.intersectionRatio >= 0.25;
      sync();
    }, { threshold: 0.25 });

    loader.observe(video);
    player.observe(video);
    motion.addEventListener('change', sync);
    document.addEventListener('visibilitychange', sync);

    return () => {
      loader.disconnect();
      player.disconnect();
      motion.removeEventListener('change', sync);
      document.removeEventListener('visibilitychange', sync);
    };
  }, [src, poster]);

  return (
    <video
      ref={ref}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="media-video"
    />
  );
}
