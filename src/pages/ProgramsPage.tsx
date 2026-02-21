import { useState, useEffect, useRef } from 'react';
import { Search, Clock, BookOpen, ChevronRight, Filter } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';
import { Page } from '../components/Router';

interface ProgramsPageProps {
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
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-20 -right-32 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4"><BookOpen className="h-3.5 w-3.5" /><span>Our Programs</span></div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">Explore Our Programs</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Industry-recognized tech training programs designed to kickstart your career in the digital world.</p>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="section-white py-16 lg:py-20">
        <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          {/* Filter pills */}
          <div className="flex items-center gap-3 mb-12 overflow-x-auto pb-2">
            <Filter className="h-4 w-4 text-slate-400 flex-shrink-0" />
            <button
              onClick={() => setSelectedCategory('all')}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === 'all'
                  ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
            >All Programs</button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat
                    ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
              >{cat}</button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-12 h-12 border-[3px] border-slate-200 border-t-primary-600 rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-20">
              <Search className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No programs found</h3>
              <p className="text-slate-500">Try selecting a different category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program, idx) => (
                <div key={program.id} className="card flex flex-col group" style={{ transitionDelay: `${idx * 60}ms` }}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="badge text-xs">{program.category}</span>
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <Clock className="h-3.5 w-3.5" />{program.duration}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">{program.title}</h3>
                  <p className="text-slate-500 text-sm mb-5 flex-grow leading-relaxed line-clamp-3">{program.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {program.skills.map((skill, i) => (
                      <span key={i} className="bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg text-xs border border-slate-100">{skill}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-slate-400 text-xs">{program.eligibility}</span>
                    <button onClick={() => navigate('contact')} className="flex items-center gap-1 text-primary-600 text-sm font-semibold group-hover:gap-2 transition-all">
                      Apply <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Not sure CTA */}
      <section className="section-gray py-16 lg:py-20">
        <div ref={s2.ref} className={`max-w-4xl mx-auto px-6 lg:px-8 text-center animate-section ${s2.visible ? 'visible' : ''}`}>
          <div className="card !p-10 !border-primary-100 bg-gradient-to-br from-white to-primary-50/50">
            <BookOpen className="h-10 w-10 text-primary-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-3">Not sure which program is right for you?</h2>
            <p className="text-slate-500 mb-6 max-w-xl mx-auto">Reach out to us and our team will help you find the perfect program based on your skills and career goals.</p>
            <button onClick={() => navigate('contact')} className="btn-primary">Get Guidance <ChevronRight className="h-5 w-5" /></button>
          </div>
        </div>
      </section>
    </div>
  );
}
