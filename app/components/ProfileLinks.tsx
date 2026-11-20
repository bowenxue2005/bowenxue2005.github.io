import { profile } from '../profile';
import { GitHubIcon, MailIcon, ScholarIcon } from './Icons';

const profiles = [
  { label: 'Email', href: `mailto:${profile.email}`, icon: <MailIcon /> },
  { label: 'Google Scholar', href: profile.profiles.scholar, icon: <ScholarIcon /> },
  { label: 'GitHub', href: profile.profiles.github, icon: <GitHubIcon /> },
];

export default function ProfileLinks({ className = '' }: { className?: string }) {
  return (
    <nav className={`profile-links ${className}`.trim()} aria-label="Profiles">
      {profiles.map(({ label, href, icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          title={label}
          {...(href.startsWith('mailto:') ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {icon}
        </a>
      ))}
    </nav>
  );
}
