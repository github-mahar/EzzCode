import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import HomePage from '../pages/HomePage';

// Lazy load page components for code splitting
const ProgramsPage = lazy(() => import('../pages/ProgramsPage'));
const CertificatePage = lazy(() => import('../pages/CertificatePage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));

export type Page = 'home' | 'programs' | 'certificate' | 'contact' | 'privacy' | 'terms';

export default function Router() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Page;
      if (hash && ['home', 'programs', 'certificate', 'contact', 'privacy', 'terms'].includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (page: Page) => {
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    const LoadingFallback = () => (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-[3px] border-white/10 border-t-accent-green rounded-full animate-spin"></div>
      </div>
    );

    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'programs':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ProgramsPage navigate={navigate} />
          </Suspense>
        );
      case 'certificate':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <CertificatePage />
          </Suspense>
        );
      case 'contact':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <ContactPage />
          </Suspense>
        );
      case 'privacy':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <PrivacyPage />
          </Suspense>
        );
      case 'terms':
        return (
          <Suspense fallback={<LoadingFallback />}>
            <TermsPage />
          </Suspense>
        );
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-dark">
      <Header currentPage={currentPage} navigate={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
