import { useState } from 'react';
import { Menu, X, Code2 } from 'lucide-react';
import { Page } from './Router';

interface HeaderProps {
  currentPage: Page;
  navigate: (page: Page) => void;
}

export default function Header({ currentPage, navigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <Code2 className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              EZZ<span className="text-blue-600">CODE</span>
            </span>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === page
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleNavigate('programs')}
            className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Apply Now
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navItems.map(({ page, label }) => (
              <button
                key={page}
                onClick={() => handleNavigate(page)}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === page
                    ? 'text-blue-600 bg-blue-50'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleNavigate('programs')}
              className="w-full mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
