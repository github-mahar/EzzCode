import { useState, useEffect, useRef } from 'react';
import { Search, Clock, BookOpen, ChevronRight, Filter, Monitor, Cpu, Database, Binary, Smartphone } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';
import { Page } from '../components/Router';

interface ProgramsPageProps {
  navigate: (page: Page) => void;
}

const CATEGORY_STYLES: Record<string, string> = {
  'Web Development': 'from-blue-600 to-indigo-700',
  'Artificial Intelligence': 'from-purple-600 to-violet-700',
  'Data Science': 'from-emerald-600 to-teal-700',
  'Python': 'from-yellow-600 to-amber-700',
  'Mobile Development': 'from-rose-600 to-pink-700',
};

const CATEGORY_ICONS: Record<string, any> = {
  'Web Development': Monitor,
  'Artificial Intelligence': Cpu,
  'Data Science': Database,
  'Python': Binary,
  'Mobile Development': Smartphone,
};

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.disconnect(); } },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, visible };
}

export default function ProgramsPage({ navigate }: ProgramsPageProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  const s1 = useScrollReveal();
  const s2 = useScrollReveal();

  useEffect(() => { fetchPrograms(); }, []);
  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase.from('programs').select('*').eq('status', 'active');
      if (error) throw error;
      setPrograms(data || []);
      setCategories([...new Set((data || []).map(p => p.category))]);
    } catch (error) { console.error('Error:', error); }
    finally { setLoading(false); }
  };

  const filteredPrograms = selectedCategory === 'all' ? programs : programs.filter(p => p.category === selectedCategory);

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-primary-200/20 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4 font-bold tracking-wider px-4 py-1.5"><BookOpen className="h-4 w-4" /><span>OUR PROGRAMS</span></div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Explore Our <span className="gradient-text">Programs</span></h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Industry-recognized tech training programs designed to kickstart your career in the digital world.
          </p>
        </div>
      </section>

      <section className="section-white py-16 lg:py-24">
        <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          {/* Enhanced Filter */}
          <div className="flex items-center gap-4 mb-16 overflow-x-auto pb-4 scrollbar-hide">
            <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shrink-0">
              <Filter className="h-4 w-4 text-slate-400 dark:text-slate-500" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Filter</span>
            </div>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border ${selectedCategory === 'all'
                ? 'bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-500/25'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-600/50'
                }`}
            >
              All Programs
            </button>
            {categories.map(cat => {
              const Icon = CATEGORY_ICONS[cat];
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex-shrink-0 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 border flex items-center gap-2 ${selectedCategory === cat
                    ? 'bg-primary-600 text-white border-primary-600 shadow-xl shadow-primary-500/25'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-600/50'
                    }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {cat}
                </button>
              );
            })}
          </div>

          {loading ? (
            <div className="text-center py-24"><div className="w-16 h-16 border-[3px] border-slate-100 dark:border-slate-800 border-t-primary-600 rounded-full animate-spin mx-auto" /></div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-24 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
              <Search className="h-16 w-16 text-slate-200 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No programs found</h3>
              <p className="text-slate-500 dark:text-slate-400">Try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPrograms.map((program, idx) => {
                const accentClass = CATEGORY_STYLES[program.category] || 'from-primary-600 to-primary-700';
                return (
                  <div key={program.id} className="card flex flex-col group relative overflow-hidden" style={{ transitionDelay: `${idx * 60}ms` }}>
                    {/* Top Accent Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${accentClass} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                    <div className="flex items-center justify-between mb-5">
                      <span className="badge text-[10px] font-bold tracking-widest uppercase py-1 px-3">{program.category}</span>
                      <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs font-medium"><Clock className="h-3.5 w-3.5" />{program.duration}</div>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors tracking-tight leading-tight">
                      {program.title}
                    </h3>

                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 flex-grow leading-relaxed line-clamp-3">
                      {program.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {program.skills.slice(0, 4).map((skill, i) => (
                        <span key={i} className="bg-slate-50 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 px-3 py-1.5 rounded-xl text-[10px] font-bold border border-slate-100 dark:border-slate-700 uppercase tracking-wider transition-colors group-hover:bg-white dark:group-hover:bg-slate-800">
                          {skill}
                        </span>
                      ))}
                      {program.skills.length > 4 && <span className="text-slate-300 dark:text-slate-600 text-[10px] font-bold py-1.5 ">+{program.skills.length - 4} MORE</span>}
                    </div>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100 dark:border-slate-700">
                      <span className="text-slate-400 dark:text-slate-500 text-[11px] font-medium tracking-tight truncate max-w-[120px]">{program.eligibility}</span>
                      <button onClick={() => navigate('contact')} className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-bold group-hover:gap-2 transition-all">
                        Apply Now <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-gray py-16 lg:py-24">
        <div ref={s2.ref} className={`max-w-4xl mx-auto px-6 lg:px-8 text-center animate-section ${s2.visible ? 'visible' : ''}`}>
          <div className="card !p-12 !border-primary-100 dark:!border-primary-500/20 bg-gradient-to-br from-white to-primary-50/50 dark:from-slate-800 dark:to-primary-900/20 shadow-xl">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-8 w-8 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Not sure which program is right for you?</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 max-w-xl mx-auto text-lg leading-relaxed">
              Reach out to us and our team will help you find the perfect program based on your skills and career goals.
            </p>
            <button onClick={() => navigate('contact')} className="btn-primary !px-10 !py-4 text-base">
              Get Guidance <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
