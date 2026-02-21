import { Mail, Linkedin, Twitter, Github, Code2, ArrowRight } from 'lucide-react';
import { Page } from './Router';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-deepest-dark relative">
      {/* Gradient top line */}
      <div className="gradient-line" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2.5">
              <Code2 className="h-8 w-8 text-accent-green" />
              <span className="text-2xl font-bold text-white tracking-tight">
                EZZ<span className="text-accent-green">CODE</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Empowering future developers through practical learning, real-world projects, and industry mentorship.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/company/ezzcode', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/EzzCode', label: 'Twitter' },
                { icon: Github, href: 'https://github.com/ezzcode', label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit EzzCode on ${label}`}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 hover:text-accent-green hover:border-accent-green/30 hover:bg-accent-green/5 transition-all duration-300"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { page: 'home' as Page, label: 'Home' },
                { page: 'programs' as Page, label: 'Programs' },
                { page: 'certificate' as Page, label: 'Verify Certificate' },
                { page: 'contact' as Page, label: 'Contact' },
              ].map(({ page, label }) => (
                <li key={page}>
                  <button
                    onClick={() => navigate(page)}
                    className="text-slate-500 hover:text-accent-green transition-colors text-sm flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li>
                <button onClick={() => navigate('privacy')} className="text-slate-500 hover:text-accent-green transition-colors text-sm flex items-center gap-1.5 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigate('terms')} className="text-slate-500 hover:text-accent-green transition-colors text-sm flex items-center gap-1.5 group">
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" aria-hidden="true" />
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-slate-500 text-sm mb-4">Subscribe for the latest news & updates.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-600 focus:outline-none focus:border-accent-green/50 transition-colors"
              />
              <button className="px-4 py-2.5 bg-accent-green text-base-dark rounded-xl font-medium text-sm hover:shadow-green-glow-sm transition-all">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-5 flex items-start space-x-2.5">
              <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-accent-green" />
              <span className="text-slate-500 text-sm">info@ezzcode.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-600 text-sm">
            © {new Date().getFullYear()} EzzCode. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button onClick={() => navigate('privacy')} className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Privacy</button>
            <button onClick={() => navigate('terms')} className="text-slate-600 hover:text-slate-400 text-sm transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
