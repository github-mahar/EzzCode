import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

/* ===== Google Analytics (CSP-safe) ===== */
if (typeof window !== 'undefined') {
  // @ts-ignore
  window.dataLayer = window.dataLayer || [];

  function gtag(...args: any[]) {
    // @ts-ignore
    window.dataLayer.push(args);
  }

  gtag('js', new Date());
  gtag('config', 'G-XT4KKGQQJ2', {
    page_path: window.location.pathname,
  });
}
/* ===================================== */

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
