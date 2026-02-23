import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './components/ThemeProvider';
import App from './App';
import './index.css';

/* ===== GA Tracker Component ===== */
function AnalyticsTracker() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // @ts-ignore
    window.dataLayer = window.dataLayer || [];
    // @ts-ignore
    window.gtag = function (...args: any[]) {
      // @ts-ignore
      window.dataLayer.push(args);
    };

    const sendPageView = () => {
      const pagePath = window.location.hash ? `/${window.location.hash.slice(1)}` : '/';
      // @ts-ignore
      window.gtag('js', new Date());
      // @ts-ignore
      window.gtag('config', 'G-XT4KKGQQJ2', { page_path: pagePath });
    };

    sendPageView();
    window.addEventListener('hashchange', sendPageView);
    return () => window.removeEventListener('hashchange', sendPageView);
  }, []);

  return null;
}
/* ================================ */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <AnalyticsTracker />
      <App />
    </ThemeProvider>
  </StrictMode>
);

