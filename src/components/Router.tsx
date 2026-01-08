import { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import HomePage from '../pages/HomePage';
import ProgramsPage from '../pages/ProgramsPage';
import CertificatePage from '../pages/CertificatePage';
import ContactPage from '../pages/ContactPage';
import PrivacyPage from '../pages/PrivacyPage';
import TermsPage from '../pages/TermsPage';

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
    switch (currentPage) {
      case 'home':
        return <HomePage navigate={navigate} />;
      case 'programs':
        return <ProgramsPage navigate={navigate} />;
      case 'certificate':
        return <CertificatePage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      default:
        return <HomePage navigate={navigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPage={currentPage} navigate={navigate} />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
