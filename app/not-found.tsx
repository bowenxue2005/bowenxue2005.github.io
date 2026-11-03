import Link from 'next/link';

export default function NotFound() {
  return (
    <main id="main-content" className="page not-found">
      <h1>Page not found</h1>
      <p>
        <Link href="/">Back to the homepage</Link>
      </p>
    </main>
  );
}
