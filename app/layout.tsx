import './globals.css';
import Header from './components/Header';
import { AnimatePresence } from 'framer-motion';

export const metadata = {
  title: 'Bowen Xue',
  description: 'Academic Homepage',
  viewport: 'width=device-width, initial-scale=1.0',
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="scroll-smooth text-gray-800 font-sans">
        <div className="min-h-screen bg-gradient-to-tr from-purple-50 to-blue-50">
          <Header />
          <AnimatePresence mode="wait">{children}</AnimatePresence>
        </div>
      </body>
    </html>
  );
}
