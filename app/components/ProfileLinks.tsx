import { GitHubIcon, MailIcon, ScholarIcon } from './Icons';

const profiles = [
  { label: 'Email', href: 'mailto:bowenxue2005@gmail.com', icon: <MailIcon /> },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=PLeb2oAAAAAJ&hl=en', icon: <ScholarIcon /> },
  { label: 'GitHub', href: 'https://github.com/KBRASK', icon: <GitHubIcon /> },
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
