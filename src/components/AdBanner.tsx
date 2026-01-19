import { useEffect, useRef } from 'react';

interface AdBannerProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'sidebar';
  adSlot?: string; // Optional AdSense ad slot ID
  placeholderText?: string;
  placeholderDetails?: string;
  adFormat?: 'auto' | 'vertical' | 'horizontal' | 'rectangle';
  fullWidthResponsive?: boolean;
}

export default function AdBanner({ 
  className = '', 
  size = 'medium',
  adSlot,
  placeholderText,
  placeholderDetails,
  adFormat,
  fullWidthResponsive,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const adPushed = useRef(false);

  useEffect(() => {
    const el = adRef.current;
    if (!adSlot || !el || adPushed.current) return;
    const status = el.getAttribute('data-adsbygoogle-status');
    if (status === 'done') return;
    try {
      window.adsbygoogle = window.adsbygoogle || [];
      window.adsbygoogle.push({} as unknown);
      adPushed.current = true;
    } catch (err) {
      console.error('Error loading AdSense ad:', err);
    }
  }, [adSlot]);

  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48 md:h-64',
    large: 'h-64 md:h-96',
    sidebar: 'h-96 w-full',
  };

  // If adSlot is provided, render AdSense ad unit
  if (adSlot) {
    return (
      <aside 
        className={`${className} ${sizeClasses[size]}`}
        aria-label="Advertisement"
      >
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2842777009443084"
          data-ad-slot={adSlot}
          data-ad-format={adFormat ?? (size === 'sidebar' ? 'vertical' : size === 'large' ? 'horizontal' : 'rectangle')}
          {...(fullWidthResponsive ? { 'data-full-width-responsive': 'true' } : {})}
          ref={adRef}
        ></ins>
      </aside>
    );
  }

  // Fallback placeholder if no ad slot provided
  return (
    <aside 
      className={`${className} ${sizeClasses[size]} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center`}
      aria-label="Advertisement"
    >
      <div className="text-center text-gray-400 text-sm">
        <p className="font-medium mb-1">{placeholderText ?? 'Advertisement'}</p>
        <p className="text-xs">
          {placeholderDetails ?? (size === 'sidebar' ? '300x600' : size === 'large' ? '728x90' : size === 'medium' ? '300x250' : '300x100')}
        </p>
        <div className="mt-2 text-xs text-gray-300">
          Ad Space
        </div>
      </div>
    </aside>
  );
}
