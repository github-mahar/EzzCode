import { useState, useEffect } from 'react';
import { Menu, X, Code2, Sun, Moon } from 'lucide-react';
import { Page } from './Router';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export default function Header({ currentPage, navigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
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
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
          ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm border-b border-slate-100 dark:border-slate-800'
          : 'bg-white dark:bg-slate-900'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-18 py-4">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center space-x-2.5 cursor-pointer group"
            onClick={(e) => { e.preventDefault(); handleNavigate('home'); }}
            aria-label="EzzCode Home"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
              <Code2 className="h-5 w-5 text-white" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Ezz<span className="gradient-text">Code</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === page
                    ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            <button
              onClick={() => handleNavigate('programs')}
              className="btn-primary !py-2.5 !px-6 text-sm"
            >
              Apply Now
            </button>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-6 pt-2 space-y-1 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
          {navItems.map(({ page, label }) => (
            <button
              key={page}
              onClick={() => handleNavigate(page)}
              className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${currentPage === page
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              {label}
            </button>
          ))}
          <button onClick={() => handleNavigate('programs')} className="w-full mt-3 btn-primary text-sm">
            Apply Now
          </button>
        </div>
      </div>
    </header>
  );
}
