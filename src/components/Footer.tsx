import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Code2 } from 'lucide-react';
import { Page } from './Router';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">
                EZZ<span className="text-blue-500">CODE</span>
              </span>
            </div>
            <p className="text-sm">
              Empowering future developers through practical learning, real-world projects, and industry mentorship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('home')} className="hover:text-blue-500 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navigate('programs')} className="hover:text-blue-500 transition-colors">
                  Programs
                </button>
              </li>
              <li>
                <button onClick={() => navigate('certificate')} className="hover:text-blue-500 transition-colors">
                  Verify Certificate
                </button>
              </li>
              <li>
                <button onClick={() => navigate('contact')} className="hover:text-blue-500 transition-colors">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navigate('privacy')} className="hover:text-blue-500 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('terms')} className="hover:text-blue-500 transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>info@ezzcode.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>123 Tech Street, Innovation City, TC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} EZZCODE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
