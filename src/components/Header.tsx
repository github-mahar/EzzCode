import { useState, useEffect } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Page } from './Router';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export default function Header({ currentPage, navigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { page: Page; label: string }[] = [
    { page: 'home', label: 'Home' },
    { page: 'programs', label: 'Programs' },
    { page: 'certificate', label: 'Verify Certificate' },
    { page: 'contact', label: 'Contact' },
  ];

  const handleNavigate = (page: Page) => {
    navigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
          ? 'glass-nav shadow-lg shadow-black/20'
          : 'bg-transparent'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('home');
            }}
            aria-label="EzzCode Home"
          >
            <div className="relative">
              <Code2 className="h-8 w-8 text-accent-green transition-transform duration-300 group-hover:scale-110" aria-hidden="true" />
              <div className="absolute inset-0 bg-accent-green/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              EZZ<span className="text-accent-green">CODE</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                aria-label={`Navigate to ${label}`}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${currentPage === page
                    ? 'text-accent-green'
                    : 'text-slate-400 hover:text-white'
                  }`}
              >
                {label}
                {currentPage === page && (
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent-green rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <button
            onClick={() => handleNavigate('programs')}
            aria-label="Apply to programs"
            className="hidden md:flex btn-primary !px-6 !py-2.5 text-sm"
          >
            Apply Now
          </button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="glass-nav px-6 pb-6 pt-2 space-y-1 border-t border-white/5">
          {navItems.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
              aria-label={`Navigate to ${label}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${currentPage === page
                  ? 'text-accent-green bg-accent-green/5'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => handleNavigate('programs')}
            aria-label="Apply to programs"
            className="w-full mt-3 btn-primary text-sm"
          >
            Apply Now
          </button>
        </div>
      </div>
    </header>
  );
}
