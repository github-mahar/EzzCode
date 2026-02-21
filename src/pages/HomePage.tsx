import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Code, Users, Briefcase, Award, CheckCircle, BookOpen, Sparkles, Layers, TrendingUp } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';
import { Page } from '../components/Router';

interface HomePageProps {
  navigate: (page: Page) => void;
}

/* ---- Scroll reveal hook ---- */
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

/* ---- Animated Counter ---- */
function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        const duration = 2000;
        const start = performance.now();
        const step = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

/* ---- Text Rotator ---- */
const ROTATING_WORDS = ['Developers', 'Designers', 'Engineers', 'Innovators'];

function TextRotator() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % ROTATING_WORDS.length);
        setVisible(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className={`inline-block text-accent-green text-glow-green transition-all duration-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
    >
      {ROTATING_WORDS[index]}
    </span>
  );
}

export default function HomePage({ navigate }: HomePageProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  const s1 = useScrollReveal();
  const s2 = useScrollReveal();
  const s3 = useScrollReveal();
  const s4 = useScrollReveal();
  const s5 = useScrollReveal();

  useEffect(() => { fetchPrograms(); }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase.from('programs').select('*').eq('status', 'active').limit(6);
      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: Code, title: 'Real-World Projects', description: 'Work on actual projects that matter. Build your portfolio with production-grade applications.' },
    { icon: Users, title: 'Industry Mentorship', description: 'Learn from experienced developers who have worked at top tech companies.' },
    { icon: Briefcase, title: 'Internship Experience', description: 'Gain valuable work experience through structured internships with real deliverables.' },
    { icon: Award, title: 'Verifiable Certificates', description: 'Earn industry-recognized certificates with unique IDs verifiable on our platform.' },
  ];

  const steps = [
    { num: 1, label: 'step 1', title: 'Discover Tech', description: 'Explore internships across various technologies. Select a field that excites you and aligns with your goals.', icon: Sparkles },
    { num: 2, label: 'step 2', title: 'Evaluate Skill', description: 'Our process includes an interview and evaluation to assess your skills and match you with the right opportunity.', icon: Layers },
    { num: 3, label: 'step 3', title: 'Track Record', description: 'Monitor your internship progress, track achievements, and stay on top of your milestones.', icon: TrendingUp },
  ];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative min-h-[90vh] flex items-center bg-hero-gradient overflow-hidden">
        {/* Dot grid overlay */}
        <div className="absolute inset-0 dot-grid" />
        {/* Subtle radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-green/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 w-full">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
              Empowering Future<br />
              <TextRotator />
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              Join EzzCode's comprehensive tech training and internship programs. Gain real-world experience, build production-ready projects, and launch your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <button onClick={() => navigate('programs')} aria-label="Apply to EzzCode programs" className="btn-primary text-lg">
                Apply Now <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <button onClick={() => navigate('programs')} aria-label="Explore available programs" className="btn-secondary text-lg">
                Explore Programs
              </button>
            </div>

            {/* Stats strip */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-16 max-w-3xl mx-auto">
              {[
                { val: 500, suffix: '+', label: 'Students Trained' },
                { val: 95, suffix: '%', label: 'Success Rate' },
                { val: 50, suffix: '+', label: 'Partner Companies' },
                { val: 6, suffix: '+', label: 'Tech Programs' },
              ].map(({ val, suffix, label }) => (
                <div key={label} className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-white">
                    <AnimatedCounter target={val} suffix={suffix} />
                  </div>
                  <div className="text-slate-500 text-sm mt-1 uppercase tracking-wider">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROCESS STEPS ===== */}
      <section className="py-20 lg:py-28 bg-surface-dark">
        <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <p className="text-accent-green text-sm font-semibold uppercase tracking-widest mb-3">How It Works</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Shaping Future IT Talent<br />Through a Seamless Process</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ num, label, title, description, icon: Icon }, idx) => (
              <div key={num} className="glass-card p-8 relative overflow-hidden group" style={{ transitionDelay: `${idx * 100}ms` }}>
                <span className="step-number">{num}</span>
                <div className="relative z-10 space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-accent-green/10 flex items-center justify-center mb-2 group-hover:bg-accent-green/20 transition-colors">
                    <Icon className="h-7 w-7 text-accent-green" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-accent-green font-semibold">{label}</p>
                  <h3 className="text-xl font-bold text-white">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROGRAMS ===== */}
      <section className="py-20 lg:py-28 bg-base-dark">
        <div ref={s2.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s2.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <p className="text-accent-green text-sm font-semibold uppercase tracking-widest mb-3">What We Offer</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Programs</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Choose from our industry-leading training programs designed to turn beginners into job-ready developers.</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-[3px] border-white/10 border-t-accent-green rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, idx) => (
                <div
                  key={program.id}
                  className="glass-card p-6 group cursor-pointer"
                  style={{ transitionDelay: `${idx * 80}ms` }}
                  onClick={() => navigate('programs')}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-accent-green/10 text-accent-green px-3 py-1 rounded-full text-xs font-medium">
                      {program.category}
                    </span>
                    <BookOpen className="h-5 w-5 text-slate-600 group-hover:text-accent-green transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-accent-green transition-colors">{program.title}</h3>
                  <p className="text-slate-400 text-sm line-clamp-2 mb-4">{program.description}</p>
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>Duration: {program.duration}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {program.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="bg-white/5 text-slate-400 px-2.5 py-1 rounded-lg text-xs border border-white/5">{skill}</span>
                    ))}
                    {program.skills.length > 3 && (
                      <span className="text-slate-600 text-xs self-center">+{program.skills.length - 3}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button onClick={() => navigate('programs')} aria-label="View all programs" className="btn-secondary">
              View All Programs <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="py-20 lg:py-28 bg-section-gradient">
        <div ref={s3.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s3.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <p className="text-accent-green text-sm font-semibold uppercase tracking-widest mb-3">Why Us</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Why Choose EzzCode?</h2>
            <p className="text-slate-400 text-lg">Everything you need to succeed in the tech industry</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div key={idx} className="glass-card p-6 text-center group" style={{ transitionDelay: `${idx * 100}ms` }}>
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-accent-green/10 rounded-2xl mb-5 group-hover:bg-accent-green/20 transition-colors">
                    <Icon className="h-7 w-7 text-accent-green" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CERTIFICATES ===== */}
      <section className="py-20 lg:py-28 bg-surface-dark">
        <div ref={s4.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s4.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <p className="text-accent-green text-sm font-semibold uppercase tracking-widest mb-3">Credentials</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Industry-Recognized Certificates</h2>
            <p className="text-slate-400 text-lg">Earn verifiable certificates to showcase your skills</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="glass-card p-10 border-accent-green/20 relative overflow-hidden">
              {/* Glow effect */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-green/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative text-center space-y-5">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-green/10 rounded-3xl">
                  <Award className="h-12 w-12 text-accent-green" />
                </div>
                <h3 className="text-2xl font-bold text-white">Certificate of Completion</h3>
                <div className="text-slate-400">This is to certify that</div>
                <div className="text-xl font-bold text-accent-green">[Student Name]</div>
                <div className="text-slate-400">has successfully completed</div>
                <div className="text-xl font-bold text-white">[Program Name]</div>
                <div className="pt-5 border-t border-white/10 space-y-1.5">
                  <div className="text-slate-500 font-mono text-sm">EZZCODE-YYYY-XX-###</div>
                  <div className="text-slate-500 text-sm">Issue Date: MM/DD/YYYY</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <button onClick={() => navigate('certificate')} aria-label="Verify a certificate" className="btn-primary">
                <CheckCircle className="h-5 w-5" aria-hidden="true" /> Verify a Certificate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-cta-gradient opacity-90" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div ref={s5.ref} className={`relative max-w-4xl mx-auto px-6 lg:px-8 text-center animate-section ${s5.visible ? 'visible' : ''}`}>
          <h2 className="text-3xl md:text-5xl font-bold text-base-dark mb-6">Ready to Start Your Tech Career?</h2>
          <p className="text-base-dark/70 text-lg mb-8 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their careers with EzzCode. Get hands-on experience, industry mentorship, and verifiable certificates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('programs')} aria-label="Browse programs" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-base-dark text-white rounded-full font-semibold text-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
              Browse Programs <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('contact')} aria-label="Contact EzzCode" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-base-dark/30 text-base-dark rounded-full font-semibold text-lg transition-all hover:bg-base-dark/10">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
