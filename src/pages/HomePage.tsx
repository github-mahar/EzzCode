import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Code, Users, Briefcase, Award, CheckCircle, BookOpen, Sparkles, Layers, TrendingUp, Star, Quote } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';
import { Page } from '../components/Router';

interface HomePageProps {
  navigate: (page: Page) => void;
}

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
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50">
        {/* Decorative blobs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 -right-32 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="badge mx-auto">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Empowering Future IT Talent</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Shaping Future<br />
              <TextRotator />
            </h1>

            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Join EzzCode's comprehensive tech training and internship programs. Gain real-world experience, build production-ready projects, and launch your career.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2">
              <button onClick={() => navigate('programs')} className="btn-primary text-base">
                Get Started <ArrowRight className="h-5 w-5" />
              </button>
              <button onClick={() => navigate('programs')} className="btn-outline text-base">
                Explore Programs
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-3xl mx-auto">
            {[
              { val: 500, suffix: '+', label: 'Students Trained' },
              { val: 95, suffix: '%', label: 'Success Rate' },
              { val: 50, suffix: '+', label: 'Partner Companies' },
              { val: 6, suffix: '+', label: 'Tech Programs' },
            ].map(({ val, suffix, label }) => (
              <div key={label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-slate-900">
                  <AnimatedCounter target={val} suffix={suffix} />
                </div>
                <div className="text-slate-400 text-sm mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PROCESS STEPS ===== */}
      <section className="section-white py-20 lg:py-28">
        <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4"><Layers className="h-3.5 w-3.5" /><span>How It Works</span></div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900">A Seamless Learning Process</h2>
            <p className="text-slate-500 text-lg mt-4 max-w-2xl mx-auto">From discovery to mastery — our structured approach ensures you build real skills step by step.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ num, label, title, desc, icon: Icon }, idx) => (
              <div key={num} className="card relative overflow-hidden group text-center" style={{ transitionDelay: `${idx * 100}ms` }}>
                <div className="absolute top-4 right-6 text-8xl font-extrabold text-primary-50 select-none pointer-events-none leading-none">{num}</div>
                <div className="relative z-10 space-y-4">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-2xl group-hover:bg-primary-100 transition-colors">
                    <Icon className="h-7 w-7 text-primary-600" />
                  </div>
                  <p className="text-xs uppercase tracking-widest text-primary-500 font-semibold">{label}</p>
                  <h3 className="text-xl font-bold text-slate-900">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== WHAT WE DO ===== */}
      <section className="section-gray py-20 lg:py-28">
        <div ref={s2.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s2.visible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="badge"><BookOpen className="h-3.5 w-3.5" /><span>What We Do</span></div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">Empowering Connections in the Digital World</h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                We equip future professionals with the essential tools to thrive in both traditional and digital IT landscapes. With years of experience and countless successful placements, EzzCode has perfected a unique learning process that goes beyond theory.
              </p>
              <p className="text-slate-500 leading-relaxed">
                We delve deep into practical skills and real-world applications, helping students understand, connect, and excel in the ever-evolving tech market.
              </p>
              <button onClick={() => navigate('programs')} className="btn-primary mt-2">
                More About Us <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-100 to-purple-100 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99,102,241,0.3) 1px, transparent 0)', backgroundSize: '24px 24px' }} />
                <div className="relative grid grid-cols-2 gap-4">
                  {features.map(({ icon: Icon, title }, idx) => (
                    <div key={idx} className="bg-white rounded-2xl p-5 shadow-lg shadow-primary-100/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                      <Icon className="h-8 w-8 text-primary-600 mb-3" />
                      <h4 className="text-sm font-bold text-slate-900">{title}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== PROGRAMS ===== */}
      <section className="section-white py-20 lg:py-28">
        <div ref={s3.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s3.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4"><Code className="h-3.5 w-3.5" /><span>Our Programs</span></div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Featured Programs</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Choose from our industry-leading training programs designed to turn beginners into job-ready professionals.</p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 border-[3px] border-slate-200 border-t-primary-600 rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program, idx) => (
                <div key={program.id} className="card cursor-pointer group" style={{ transitionDelay: `${idx * 60}ms` }} onClick={() => navigate('programs')}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge text-xs">{program.category}</span>
                    <span className="text-slate-400 text-xs flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{program.duration}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">{program.title}</h3>
                  <p className="text-slate-500 text-sm line-clamp-2 mb-4">{program.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {program.skills.slice(0, 3).map((skill, i) => (
                      <span key={i} className="bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg text-xs border border-slate-100">{skill}</span>
                    ))}
                    {program.skills.length > 3 && <span className="text-slate-400 text-xs self-center">+{program.skills.length - 3}</span>}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-12">
            <button onClick={() => navigate('programs')} className="btn-secondary">View All Programs <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section>

      {/* ===== WHY CHOOSE ===== */}
      <section className="section-gray py-20 lg:py-28">
        <div ref={s4.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s4.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4"><Star className="h-3.5 w-3.5" /><span>Why EzzCode</span></div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Why Choose EzzCode?</h2>
            <p className="text-slate-500 text-lg">Everything you need to succeed in the tech industry</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="card text-center group" style={{ transitionDelay: `${idx * 80}ms` }}>
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary-50 rounded-2xl mb-5 group-hover:bg-primary-100 transition-colors">
                  <Icon className="h-7 w-7 text-primary-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section-white py-20 lg:py-28">
        <div ref={s5.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s5.visible ? 'visible' : ''}`}>
          <div className="text-center mb-16">
            <div className="badge mx-auto mb-4"><Quote className="h-3.5 w-3.5" /><span>Alumni</span></div>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">What Our Students Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, idx) => (
              <div key={idx} className="card relative" style={{ transitionDelay: `${idx * 100}ms` }}>
                <Quote className="h-10 w-10 text-primary-100 absolute top-6 right-6" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                    <p className="text-primary-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-indigo-800 py-20 lg:py-24">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        <div className="absolute top-10 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Ready to Start Your Tech Career?</h2>
          <p className="text-primary-200 text-lg mb-10 max-w-2xl mx-auto">
            Join hundreds of students who have transformed their careers with EzzCode. Get hands-on experience, mentorship, and verifiable certificates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('programs')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-primary-700 rounded-2xl font-bold text-lg transition-all hover:shadow-xl hover:-translate-y-0.5">
              Get Started Now <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={() => navigate('contact')} className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white rounded-2xl font-semibold text-lg transition-all hover:bg-white/10">
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
