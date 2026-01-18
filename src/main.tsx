import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App';
import './index.css';

/* ===== GA Tracker Component ===== */
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      window.dataLayer = window.dataLayer || [];

      // Attach gtag to window
      // @ts-ignore
      window.gtag = function (...args: any[]) {
        // @ts-ignore
        window.dataLayer.push(args);
      };

      // Send page view
      // @ts-ignore
      window.gtag('js', new Date());
      // @ts-ignore
      window.gtag('config', 'G-XT4KKGQQJ2', { page_path: location.pathname });
    }
  }, [location.pathname]);

  return null;
}
/* ================================ */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnalyticsTracker />
      <App />
    </BrowserRouter>
  </StrictMode>
);
