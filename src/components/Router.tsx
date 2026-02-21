import { useState, useEffect, lazy, Suspense } from 'react';
import Header from './Header';
import Footer from './Footer';
import HomePage from '../pages/HomePage';
import CustomCursor from './CustomCursor';

// Lazy load page components for code splitting
const CertificatePage = lazy(() => import('../pages/CertificatePage'));
const ContactPage = lazy(() => import('../pages/ContactPage'));
const PrivacyPage = lazy(() => import('../pages/PrivacyPage'));
const TermsPage = lazy(() => import('../pages/TermsPage'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));

export type Page =
  | 'home'
  | 'certificate'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'program-web-development'
  | 'program-artificial-intelligence'
  | 'program-data-science'
  | 'program-python'
  | 'program-mobile-development';

const CATEGORY_PAGES: Record<string, string> = {
  'program-web-development': 'Web Development',
  'program-artificial-intelligence': 'Artificial Intelligence',
  'program-data-science': 'Data Science',
  'program-python': 'Python',
  'program-mobile-development': 'Mobile Development',
};

const VALID_PAGES: Page[] = [
  'home', 'certificate', 'contact', 'privacy', 'terms',
  'program-web-development', 'program-artificial-intelligence', 'program-data-science', 'program-python', 'program-mobile-development'
];

export default function Router() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1) as Page;
      if (hash && VALID_PAGES.includes(hash)) {
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
        <div className="w-12 h-12 border-[3px] border-slate-200 dark:border-slate-700 border-t-primary-600 rounded-full animate-spin"></div>
      </div>
    );

    if (CATEGORY_PAGES[currentPage]) {
      return (
        <Suspense fallback={<LoadingFallback />}>
          <CategoryPage category={CATEGORY_PAGES[currentPage]} navigate={navigate} />
        </Suspense>
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
      <CustomCursor />
      <Header currentPage={currentPage} navigate={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
