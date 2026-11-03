import Image from 'next/image';
import type { Media } from '../content';
import LoopingVideo from './LoopingVideo';

/**
 * The thumbnail beside each piece of work. It links to the project for the
 * mouse and stays out of the tab order, since the title is the same link.
 */
export default function Thumb({ media, label, href }: { media: Media; label: string; href?: string }) {
  const className = `media${media.kind === 'figure' ? ` media-${media.fit ?? 'figure'}` : ''}`;
  const content =
    media.kind === 'video' ? (
      <LoopingVideo src={media.src} poster={media.poster} width={media.width} height={media.height} label={label} />
    ) : (
      <Image src={media.src} alt={media.alt} width={media.width} height={media.height} />
    );

  return href ? (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden="true">
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
