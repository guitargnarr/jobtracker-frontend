/**
 * Main Layout Component
 */

import Header from './Header';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <footer className="border-t-3 border-slate-900 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-slate-600">
            © 2025 Synergy Dashboard™ 3000 - Built by{' '}
            <a
              href="https://jaspermatters.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-corporate-600 hover:underline font-semibold"
            >
              Matthew Scott
            </a>
            {' '}• Louisville AI Consultant
          </p>
        </div>
      </footer>
    </div>
  );
}
