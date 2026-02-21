import { useState, useEffect, useRef } from 'react';
import { Menu, X, Code2, Sun, Moon, ChevronDown, Monitor, Cpu, Database, Binary, Smartphone } from 'lucide-react';
import { Page } from './Router';
import { useTheme } from './ThemeProvider';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

const programCategories: { page: Page; label: string; icon: any; description: string }[] = [
  {
    page: 'program-web-development',
    label: 'Web Development',
    icon: Monitor,
    description: 'Frontend, Backend, and Full-Stack development.'
  },
  {
    page: 'program-artificial-intelligence',
    label: 'Artificial Intelligence',
    icon: Cpu,
    description: 'Machine Learning and AI implementation.'
  },
  {
    page: 'program-data-science',
    label: 'Data Science',
    icon: Database,
    description: 'Data analysis and predictive modeling.'
  },
  {
    page: 'program-python',
    label: 'Python Programming',
    icon: Binary,
    description: 'Core Python and specialized frameworks.'
  },
  {
    page: 'program-mobile-development',
    label: 'Mobile Development',
    icon: Smartphone,
    description: 'iOS and Android app development.'
  },
];

export default function Header({ currentPage, navigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNavigate = (page: Page) => {
    navigate(page);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  const isProgramActive = currentPage.startsWith('program-') || currentPage === 'programs';

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
        ? 'bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl shadow-sm border-b border-slate-100 dark:border-slate-800'
        : 'bg-white dark:bg-slate-900'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
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
            <button
              onClick={() => handleNavigate('home')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === 'home'
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              Home
            </button>

            {/* Programs Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onMouseEnter={() => setDropdownOpen(true)}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${isProgramActive
                  ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
              >
                Programs <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega-style Dropdown */}
              <div
                onMouseLeave={() => setDropdownOpen(false)}
                className={`absolute left-1/2 -translate-x-1/2 mt-2 w-[480px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-2xl p-4 transition-all duration-300 origin-top
                ${dropdownOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}
              >
                <div className="grid grid-cols-1 gap-1">
                  {programCategories.map(({ page, label, icon: Icon, description }) => (
                    <button
                      key={page}
                      onClick={() => handleNavigate(page)}
                      className={`flex items-start gap-4 p-3.5 rounded-xl transition-all ${currentPage === page
                        ? 'bg-primary-50 dark:bg-primary-500/10'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800'
                        }`}
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${currentPage === page
                        ? 'bg-primary-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                        }`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <p className={`text-sm font-bold ${currentPage === page ? 'text-primary-600 dark:text-primary-400' : 'text-slate-900 dark:text-white'}`}>
                          {label}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {description}
                        </p>
                      </div>
                    </button>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => handleNavigate('programs')}
                      className="flex items-center justify-center gap-2 w-full py-2.5 text-sm font-bold text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-500/10 rounded-xl transition-colors"
                    >
                      View All Programs <ChevronDown className="-rotate-90 h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleNavigate('certificate')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === 'certificate'
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              Verify Certificate
            </button>
            <button
              onClick={() => handleNavigate('contact')}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${currentPage === 'contact'
                ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
            >
              Contact
            </button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={toggleTheme}
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

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="px-6 pb-8 pt-2 space-y-1 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto max-h-[70vh]">
          <button
            onClick={() => handleNavigate('home')}
            className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${currentPage === 'home' ? 'text-primary-600 bg-primary-50 dark:bg-primary-500/10' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Home
          </button>

          <div className="py-2">
            <p className="px-4 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Our Programs</p>
            {programCategories.map(({ page, label, icon: Icon }) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${currentPage === page ? 'text-primary-600 bg-primary-50 dark:bg-primary-500/10' : 'text-slate-600 dark:text-slate-400'}`}
              >
                <Icon className="h-5 w-5" /> {label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('programs')}
              className="block w-full text-left px-4 py-3 rounded-xl text-base font-bold text-primary-600 dark:text-primary-400"
            >
              View All Programs
            </button>
          </div>

          <button
            onClick={() => handleNavigate('certificate')}
            className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${currentPage === 'certificate' ? 'text-primary-600 bg-primary-50 dark:bg-primary-500/10' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Verify Certificate
          </button>
          <button
            onClick={() => handleNavigate('contact')}
            className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${currentPage === 'contact' ? 'text-primary-600 bg-primary-50 dark:bg-primary-500/10' : 'text-slate-600 dark:text-slate-400'}`}
          >
            Contact
          </button>
          <button onClick={() => handleNavigate('programs')} className="w-full mt-4 btn-primary !py-3.5">
            Apply Now
          </button>
        </div>
      </div>
    </header>
  );
}
