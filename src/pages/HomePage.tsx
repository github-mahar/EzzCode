import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Code, Users, Briefcase, Award, CheckCircle, BookOpen, Sparkles, Layers, TrendingUp, Star, Quote, Clock, ChevronRight } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';
import { Page } from '../components/Router';

interface HomePageProps {
  navigate: (page: Page) => void;
}

const CATEGORY_STYLES: Record<string, string> = {
  'Web Development': 'from-blue-600 to-indigo-700',
  'Artificial Intelligence': 'from-purple-600 to-violet-700',
  'Data Science': 'from-emerald-600 to-teal-700',
  'Python': 'from-yellow-600 to-amber-700',
  'Mobile Development': 'from-rose-600 to-pink-700',
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

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

const ROTATING_WORDS = ['Developers', 'Designers', 'Engineers', 'Innovators'];
function TextRotator() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => { setIndex((i) => (i + 1) % ROTATING_WORDS.length); setVisible(true); }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <span className={`inline-block gradient-text transition-all duration-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
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
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const steps = [
    { num: 1, label: 'Step 1', title: 'Discover Tech', desc: 'Explore internships across various technologies that align with your career goals. Start your journey by selecting a field that excites you.', icon: Sparkles },
    { num: 2, label: 'Step 2', title: 'Evaluate Skill', desc: 'Our process includes an interview and a short evaluation task to assess your skills and readiness, helping us match you with the right opportunity.', icon: Layers },
    { num: 3, label: 'Step 3', title: 'Track Record', desc: 'Once selected, monitor your internship progress, track your achievements, and stay on top of your goals through our platform.', icon: TrendingUp },
  ];

  const features = [
    { icon: Code, title: 'Real-World Projects', desc: 'Work on actual production-grade applications and build an impressive portfolio that stands out.' },
    { icon: Users, title: 'Expert Mentorship', desc: 'Learn directly from experienced developers who guide you through real challenges.' },
    { icon: Briefcase, title: 'Internship Programs', desc: 'Gain valuable structured work experience with clear milestones and deliverables.' },
    { icon: Award, title: 'Verified Certificates', desc: 'Earn industry-recognized certificates with unique IDs verifiable on our platform.' },
  ];

  const testimonials = [
    { name: 'Sarah A.', role: 'MERN Developer', text: 'EzzCode transformed my career. The hands-on projects and mentorship gave me the confidence to land my first developer role within 3 months!' },
    { name: 'Ahmed K.', role: 'Frontend Dev', text: 'The structured internship program was exactly what I needed. The mentors are incredibly supportive and the projects are industry-relevant.' },
    { name: 'Fatima R.', role: 'UI/UX Designer', text: 'I went from zero coding knowledge to building full applications. EzzCode\'s step-by-step approach makes complex topics easy to understand.' },
  ];

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-200/30 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-200/30 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="badge mx-auto font-bold tracking-wider px-4 py-1.5 uppercase"><Sparkles className="h-4 w-4" /><span>Empowering Future IT Talent</span></div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
              Shaping Future<br /><TextRotator />
            </h1>
            <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed rich-text-content">
              Join EzzCode's comprehensive tech training and internship programs. Gain real-world experience, build production-ready projects, and launch your career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <button onClick={() => navigate('program-web-development')} className="btn-primary text-base !py-4 !px-10">Get Started <ArrowRight className="h-5 w-5" /></button>
              <button onClick={() => navigate('program-web-development')} className="btn-outline text-base !py-4 !px-10">Explore Categories</button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {[
              { val: 500, suffix: '+', label: 'Students Trained' },
              { val: 95, suffix: '%', label: 'Success Rate' },
              { val: 50, suffix: '+', label: 'Partner Companies' },
              { val: 6, suffix: '+', label: 'Tech Programs' },
            ].map(({ val, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
                  <AnimatedCounter target={val} suffix={suffix} />
                </div>
                <div className="text-slate-400 dark:text-slate-500 text-sm mt-1 font-medium">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS STEPS ===== */}
      <section className="section-white py-20 lg:py-32">
        <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4 font-bold tracking-wider px-4 py-1.5 uppercase"><Layers className="h-4 w-4" /><span>How It Works</span></div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">A Seamless Learning Process</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg mt-5 max-w-2xl mx-auto leading-relaxed rich-text-content">From discovery to mastery — our structured approach ensures you build real skills step by step.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ num, label, title, desc, icon: Icon }, idx) => (
              <div key={num} className="card relative overflow-hidden group text-center !p-10 border-slate-100 dark:border-slate-800" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="absolute top-4 right-6 text-8xl font-extrabold text-primary-50 dark:text-primary-500/10 select-none pointer-events-none leading-none opacity-50">{num}</div>
                <div className="relative z-10 space-y-5">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100/50 dark:bg-primary-500/10 rounded-2xl group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-xl group-hover:shadow-primary-600/20">
                    <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-primary-500 dark:text-primary-400 font-bold">{label}</p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section className="section-gray py-20 lg:py-32">
        <div ref={s2.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s2.visible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="badge font-bold tracking-wider px-4 py-1.5 uppercase"><BookOpen className="h-4 w-4" /><span>What We Do</span></div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">Empowering Connections in the Digital World</h2>
              <p className="text-slate-500 dark:text-slate-400 text-lg leading-relaxed rich-text-content">
                We equip future professionals with the essential tools to thrive in both traditional and digital IT landscapes. With years of experience and countless successful placements, EzzCode has perfected a unique learning process that goes beyond theory.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Practical skills and real-world applications focused curriculum.</p>
                </div>
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-500/20 flex items-center justify-center mt-1">
                    <CheckCircle className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">Strong emphasis on collaborative learning and mentorship.</p>
                </div>
              </div>
              <button onClick={() => navigate('contact')} className="btn-primary !px-8 !py-3.5 mt-2">More About Us <ArrowRight className="h-4 w-4" /></button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-600 to-indigo-800 dark:from-slate-800 dark:to-indigo-950 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden group">
                <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                <div className="relative bg-white/5 backdrop-blur-3xl rounded-[2.3rem] p-8 md:p-12">
                  <div className="grid grid-cols-2 gap-6">
                    {features.map(({ icon: Icon, title }, idx) => (
                      <div key={idx} className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 shadow-xl shadow-black/5 dark:shadow-none hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                        <div className="w-12 h-12 bg-primary-50 dark:bg-primary-500/10 rounded-xl flex items-center justify-center mb-4">
                          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight uppercase tracking-wide">{title}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-primary-400/20 blur-3xl animate-pulse rounded-full" />
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-purple-400/20 blur-3xl animate-pulse rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="section-white py-20 lg:py-32">
        <div ref={s3.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s3.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4 font-bold tracking-wider px-4 py-1.5 uppercase"><Code className="h-4 w-4" /><span>Featured Programs</span></div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight">Our Core Offerings</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">Choose from our industry-leading training programs designed to turn beginners into job-ready professionals.</p>
          </div>
          {loading ? (
            <div className="text-center py-20"><div className="w-16 h-16 border-[3px] border-slate-100 dark:border-slate-800 border-t-primary-600 rounded-full animate-spin mx-auto" /></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {programs.map((program, idx) => {
                const accentClass = CATEGORY_STYLES[program.category] || 'from-primary-600 to-primary-700';
                return (
                  <div key={program.id}
                    className="card flex flex-col group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 !p-8"
                    style={{ transitionDelay: `${idx * 60}ms` }}
                    onClick={() => {
                      const categorySlug = program.category.toLowerCase().replace(/\s+/g, '-');
                      navigate(`program-${categorySlug}` as Page);
                    }}
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                    <div className="flex items-center justify-between mb-5">
                      <span className="badge text-[10px] font-bold tracking-widest uppercase py-1 px-3 bg-slate-100 dark:bg-slate-800 border-transparent">{program.category}</span>
                      <span className="text-slate-400 dark:text-slate-500 text-xs font-medium flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{program.duration}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors tracking-tight leading-tight">{program.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 mb-6 leading-relaxed">{program.description}</p>
                    <div className="flex flex-wrap gap-2 pt-5 border-t border-slate-100 dark:border-slate-800 mt-auto">
                      {program.skills.slice(0, 3).map((skill, i) => (
                        <span key={i} className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 px-3 py-1 rounded-lg text-[10px] font-bold border border-slate-100 dark:border-slate-700 uppercase tracking-wider">{skill}</span>
                      ))}
                      {program.skills.length > 3 && <span className="text-slate-300 dark:text-slate-600 text-[10px] font-bold py-1 mb-0.5 ml-1 flex items-center">+{program.skills.length - 3} MORE</span>}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="text-center mt-16">
            <button onClick={() => navigate('program-web-development')} className="group flex items-center justify-center gap-2 mx-auto text-primary-600 dark:text-primary-400 font-bold hover:gap-3 transition-all duration-300">
              View Our Categories <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="section-gray py-20 lg:py-32">
        <div ref={s4.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s4.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4 font-bold tracking-wider px-4 py-1.5 uppercase"><Star className="h-4 w-4" /><span>Why EzzCode</span></div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 tracking-tight text-center">Fueling Your Career Journey</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Everything you need to succeed in the tech industry.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="card !p-10 text-center group border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white dark:bg-slate-800 rounded-3xl mb-6 shadow-md shadow-primary-500/5 group-hover:bg-primary-600 transition-all duration-300 group-hover:shadow-primary-600/20 group-hover:-translate-y-1">
                  <Icon className="h-8 w-8 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-white py-20 lg:py-32">
        <div ref={s5.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s5.visible ? 'visible' : ''}`}>
          <div className="text-center mb-20 whitespace-normal">
            <div className="badge mx-auto mb-4 font-bold tracking-wider px-4 py-1.5 uppercase"><Quote className="h-4 w-4" /><span>Alumni</span></div>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight tracking-tight">Voices of Our Community</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="card relative !p-10 !border-slate-100 dark:!border-slate-800 hover:shadow-2xl transition-all duration-500 group" style={{ transitionDelay: `${idx * 100}ms` }}>
                <Quote className="h-12 w-12 text-slate-100 dark:text-slate-800 absolute top-8 right-8 z-0 group-hover:text-primary-50 dark:group-hover:text-primary-950/20 transition-colors" />
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-[15px] leading-relaxed mb-10 italic font-medium whitespace-normal break-words">"{t.text}"</p>
                  <div className="flex items-center gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-400 to-indigo-600 flex items-center justify-center text-white font-bold text-base shadow-lg shadow-primary-500/20">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-white text-[15px] tracking-tight">{t.name}</p>
                      <p className="text-primary-600 dark:text-primary-400 text-[11px] font-bold uppercase tracking-widest mt-0.5">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 py-24 lg:py-32">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-8 tracking-tight">Build Proof of Your Skills</h2>
          <p className="text-white/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of students who have transformed their careers with EzzCode. Get hands-on experience, expert mentorship, and industry-standard training.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button onClick={() => navigate('program-web-development')}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-primary-700 rounded-2xl font-bold text-lg shadow-2xl shadow-black/10 transition-all hover:-translate-y-1 hover:shadow-white/20 active:translate-y-0"
            >
              Start Learning Now <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('contact')}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-2xl font-bold text-lg transition-all hover:bg-white/20 hover:border-white/30"
            >
              Talk to Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
