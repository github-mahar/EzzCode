interface AdBannerProps {
  className?: string;
  size?: 'small' | 'medium' | 'large' | 'sidebar';
  position?: 'top' | 'bottom' | 'inline' | 'sidebar';
}

export default function AdBanner({ 
  className = '', 
  size = 'medium',
  position = 'inline' 
}: AdBannerProps) {
  const sizeClasses = {
    small: 'h-32',
    medium: 'h-48 md:h-64',
    large: 'h-64 md:h-96',
    sidebar: 'h-96 w-full',
  };

  return (
    <aside 
      className={`${className} ${sizeClasses[size]} bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center`}
      aria-label="Advertisement"
    >
      <div className="text-center text-gray-400 text-sm">
        <p className="font-medium mb-1">Advertisement</p>
        <p className="text-xs">
          {size === 'sidebar' ? '300x600' : size === 'large' ? '728x90' : size === 'medium' ? '300x250' : '300x100'}
        </p>
        {/* Ad content will be injected here */}
        <div className="mt-2 text-xs text-gray-300">
          Ad Space
        </div>
      </div>
    </aside>
  );
}
