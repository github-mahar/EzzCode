import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, useLocation } from 'react-router-dom';
import App from './App.tsx';
import './index.css';

/* ===== Google Analytics (CSP-safe) ===== */
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];

  // @ts-ignore
  window.gtag = function (...args: any[]) {
    // @ts-ignore
    window.dataLayer.push(args);
  };

  // @ts-ignore
  window.gtag('js', new Date());
  // @ts-ignore
  window.gtag('config', 'G-XT4KKGQQJ2', { send_page_view: true });
}
/* ===================================== */

/* ===== SPA Route Tracking ===== */
function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-XT4KKGQQJ2', { page_path: location.pathname });
    }
  }, [location]);
  return null;
}
/* ===================================== */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AnalyticsTracker />
      <App />
    </BrowserRouter>
  </StrictMode>
);
