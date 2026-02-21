import { Mail, Linkedin, Twitter, Github, Code2, ArrowRight } from 'lucide-react';
import { Page } from './Router';

interface FooterProps {
  navigate: (page: Page) => void;
}

export default function Footer({ navigate }: FooterProps) {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-5">
            <div className="flex items-center space-x-2.5">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-400 to-primary-600 rounded-xl flex items-center justify-center">
                <Code2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight">
                Ezz<span className="text-primary-400">Code</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering future developers through practical learning, real-world projects, and industry mentorship.
            </p>
            <div className="flex space-x-3">
              {[
                { icon: Linkedin, href: 'https://www.linkedin.com/company/ezzcode', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://twitter.com/EzzCode', label: 'Twitter' },
                { icon: Github, href: 'https://github.com/ezzcode', label: 'GitHub' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Visit EzzCode on ${label}`}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 transition-all duration-300">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300">Quick Links</h3>
            <ul className="space-y-3">
              {([['home', 'Home'], ['certificate', 'Verify Certificate'], ['contact', 'Contact']] as [Page, string][]).map(([page, label]) => (
                <li key={page}>
                  <button onClick={() => navigate(page)}
                    className="text-slate-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-1.5 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300">Legal</h3>
            <ul className="space-y-3">
              <li><button onClick={() => navigate('privacy')} className="text-slate-400 hover:text-primary-400 transition-colors text-sm">Privacy Policy</button></li>
              <li><button onClick={() => navigate('terms')} className="text-slate-400 hover:text-primary-400 transition-colors text-sm">Terms & Conditions</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-5 text-sm uppercase tracking-wider text-slate-300">Stay Updated</h3>
            <p className="text-slate-400 text-sm mb-4">Subscribe for the latest news & updates.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input type="email" placeholder="Your email" aria-label="Email for newsletter"
                className="flex-1 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-primary-400 transition-colors" />
              <button type="submit" aria-label="Subscribe" className="px-4 py-2.5 bg-primary-600 hover:bg-primary-500 rounded-xl transition-colors">
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </form>
            <div className="mt-5 flex items-start space-x-2.5">
              <Mail className="h-4 w-4 mt-0.5 text-primary-400" />
              <span className="text-slate-400 text-sm">info@ezzcode.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© {new Date().getFullYear()} EzzCode. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => navigate('privacy')} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Privacy</button>
            <button onClick={() => navigate('terms')} className="text-slate-500 hover:text-slate-300 text-sm transition-colors">Terms</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
