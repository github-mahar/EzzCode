import { useState, useEffect, useRef } from 'react';
import { Clock, Users, BookOpen, ChevronRight, CheckCircle, ArrowRight, Sparkles, GraduationCap, Briefcase, Target } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';
import { Page } from '../components/Router';

// Image imports
import webDevImg from '../program_images/web_development.jpg';
import aiImg from '../program_images/artificial_intelligence.png';
import dataSciImg from '../program_images/data_science.jpg';
import pythonImg from '../program_images/python.jpg';
import mobileDevImg from '../program_images/mobile_development.jpg';

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

interface CategoryData {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    highlights: { icon: React.ReactNode; label: string }[];
    color: string;
    gradient: string;
}

const categoryMap: Record<string, CategoryData> = {
    'Web Development': {
        title: 'Web Development',
        subtitle: 'Build the Modern Web',
        description: 'Master modern web development with hands-on experience in HTML, CSS, JavaScript, React, Node.js, and full-stack technologies. Our programs equip you with industry-ready skills to build professional, responsive, and scalable web applications.',
        image: webDevImg,
        highlights: [
            { icon: <Briefcase className="h-5 w-5" />, label: 'Job Ready Skills' },
            { icon: <Target className="h-5 w-5" />, label: 'Industry Portfolio' },
            { icon: <Users className="h-5 w-5" />, label: 'Collaborative Learning' },
        ],
        color: 'from-blue-600 to-indigo-700',
        gradient: 'from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30',
    },
    'Artificial Intelligence': {
        title: 'Artificial Intelligence',
        subtitle: 'Shape the Future with AI',
        description: 'Explore the world of artificial intelligence and machine learning. Learn Python-based AI frameworks, neural networks, deep learning, and natural language processing to build intelligent solutions that solve real-world problems.',
        image: aiImg,
        highlights: [
            { icon: <Sparkles className="h-5 w-5" />, label: 'Cutting-Edge Tech' },
            { icon: <Target className="h-5 w-5" />, label: 'Real-World Projects' },
            { icon: <GraduationCap className="h-5 w-5" />, label: 'Expert Mentorship' },
        ],
        color: 'from-purple-600 to-violet-700',
        gradient: 'from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30',
    },
    'Data Science': {
        title: 'Data Science',
        subtitle: 'Unlock Insights from Data',
        description: 'Learn to analyze data and extract meaningful insights using Python, Pandas, NumPy, and visualization tools. Our data science program covers statistics, data wrangling, machine learning, and data-driven decision making.',
        image: dataSciImg,
        highlights: [
            { icon: <Target className="h-5 w-5" />, label: 'Hands-on Analytics' },
            { icon: <Briefcase className="h-5 w-5" />, label: 'Industry Datasets' },
            { icon: <GraduationCap className="h-5 w-5" />, label: 'Portfolio Projects' },
        ],
        color: 'from-emerald-600 to-teal-700',
        gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30',
    },
    'Python': {
        title: 'Python Programming',
        subtitle: 'Code with the Most Versatile Language',
        description: 'Dive deep into Python programming — from fundamentals to advanced concepts. Build practical applications, automate tasks, work with data structures, and explore frameworks like Django and Flask.',
        image: pythonImg,
        highlights: [
            { icon: <BookOpen className="h-5 w-5" />, label: 'Beginner Friendly' },
            { icon: <Target className="h-5 w-5" />, label: 'Project-Based Learning' },
            { icon: <Briefcase className="h-5 w-5" />, label: 'Career Focused' },
        ],
        color: 'from-yellow-600 to-amber-700',
        gradient: 'from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/30',
    },
    'Mobile Development': {
        title: 'Mobile Development',
        subtitle: 'Build Apps That People Love',
        description: 'Build native mobile applications for iOS and Android using React Native, Flutter, Kotlin, and Java. Learn to design, develop, and deploy professional mobile apps with real-world functionality.',
        image: mobileDevImg,
        highlights: [
            { icon: <Sparkles className="h-5 w-5" />, label: 'Cross-Platform Skills' },
            { icon: <Target className="h-5 w-5" />, label: 'App Store Ready' },
            { icon: <Users className="h-5 w-5" />, label: 'Team Projects' },
        ],
        color: 'from-rose-600 to-pink-700',
        gradient: 'from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30',
    },
};

interface CategoryPageProps {
    category: string;
    navigate: (page: Page) => void;
}

export default function CategoryPage({ category, navigate }: CategoryPageProps) {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [loading, setLoading] = useState(true);
    const s1 = useScrollReveal();
    const s2 = useScrollReveal();
    const s3 = useScrollReveal();

    const data = categoryMap[category];

    useEffect(() => {
        const fetchPrograms = async () => {
            setLoading(true);
            try {
                const { data: progs, error } = await supabase
                    .from('programs').select('*')
                    .eq('category', category).eq('status', 'active');
                if (error) throw error;
                setPrograms(progs || []);
            } catch (err) { console.error(err); }
            finally { setLoading(false); }
        };
        fetchPrograms();
    }, [category]);

    if (!data) return <div className="py-20 text-center text-slate-500">Category not found</div>;

    return (
        <div>
            {/* ── Hero Section ── */}
            <section className={`relative bg-gradient-to-br ${data.gradient} py-16 md:py-24 overflow-hidden`}>
                <div className="absolute top-10 -right-32 w-96 h-96 bg-primary-200/20 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 -left-32 w-80 h-80 bg-purple-200/20 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Left: Text Content */}
                        <div>
                            <div className="badge mb-4">
                                <BookOpen className="h-3.5 w-3.5" /><span>{data.title} Programs</span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 leading-tight">
                                {data.subtitle}
                            </h1>
                            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 leading-relaxed max-w-xl rich-text-content">
                                {data.description}
                            </p>

                            {/* Highlights */}
                            <div className="flex flex-wrap gap-4 mb-8">
                                {data.highlights.map((h, i) => (
                                    <div key={i} className="flex items-center gap-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 shadow-sm">
                                        <span className="text-primary-600 dark:text-primary-400">{h.icon}</span>
                                        <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{h.label}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button onClick={() => navigate('contact')} className="btn-primary text-base !py-3.5 !px-8">
                                    Apply Now <ArrowRight className="h-5 w-5" />
                                </button>
                                <a href="#program-list" className="btn-secondary text-base !py-3.5 !px-8">
                                    View Programs <ChevronRight className="h-5 w-5" />
                                </a>
                            </div>
                        </div>

                        {/* Right: Hero Image */}
                        <div className="relative">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/10 dark:shadow-black/30 category-image-container">
                                <img
                                    src={data.image}
                                    alt={data.title}
                                    className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-700 hover:scale-110"
                                />
                                <div className={`absolute inset-0 bg-gradient-to-t ${data.color} opacity-10`} />
                            </div>
                            {/* Floating stats card */}
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-xl border border-slate-100 dark:border-slate-700 hidden md:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-500/10 rounded-xl flex items-center justify-center">
                                        <Users className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                                    </div>
                                    <div>
                                        <p className="text-slate-900 dark:text-white font-bold text-lg">{programs.length}</p>
                                        <p className="text-slate-400 dark:text-slate-500 text-xs">Active Programs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── What You'll Learn Section ── */}
            <section className="section-white py-16 lg:py-20">
                <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                            What You'll Learn
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Our {data.title.toLowerCase()} programs provide hands-on experience in the following technologies
                        </p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {programs.flatMap(p => p.skills).filter((v, i, a) => a.indexOf(v) === i).map((skill, i) => (
                            <div key={i} className="flex items-center gap-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-primary-300 dark:hover:border-primary-500/30 hover:shadow-md transition-all duration-300">
                                <CheckCircle className="h-5 w-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                                <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Programs Grid ── */}
            <section id="program-list" className="section-gray py-16 lg:py-20">
                <div ref={s2.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s2.visible ? 'visible' : ''}`}>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-3">
                            Available Programs
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Choose from our curated {data.title.toLowerCase()} programs and start building your career
                        </p>
                    </div>

                    {loading ? (
                        <div className="text-center py-20">
                            <div className="w-12 h-12 border-[3px] border-slate-200 dark:border-slate-700 border-t-primary-600 rounded-full animate-spin mx-auto" />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {programs.map((program, idx) => (
                                <div key={program.id}
                                    className="card flex flex-col group relative overflow-hidden"
                                    style={{ transitionDelay: `${idx * 80}ms` }}
                                >
                                    {/* Top gradient accent */}
                                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${data.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                                    <div className="flex items-center justify-between mb-4">
                                        <span className="badge text-xs">{program.category}</span>
                                        <div className="flex items-center gap-1.5 text-slate-400 dark:text-slate-500 text-xs">
                                            <Clock className="h-3.5 w-3.5" />{program.duration}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                                        {program.title}
                                    </h3>

                                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-5 flex-grow leading-relaxed">
                                        {program.description}
                                    </p>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-1.5 mb-5">
                                        {program.skills.map((skill, i) => (
                                            <span key={i} className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 px-2.5 py-1 rounded-lg text-xs border border-slate-100 dark:border-slate-700">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                                        <span className="text-slate-400 dark:text-slate-500 text-xs">{program.eligibility}</span>
                                        <button
                                            onClick={() => navigate('contact')}
                                            className="flex items-center gap-1 text-primary-600 dark:text-primary-400 text-sm font-semibold group-hover:gap-2 transition-all"
                                        >
                                            Apply <ChevronRight className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section className="section-white py-16 lg:py-20">
                <div ref={s3.ref} className={`max-w-4xl mx-auto px-6 lg:px-8 text-center animate-section ${s3.visible ? 'visible' : ''}`}>
                    <div className="card !p-10 !border-primary-100 dark:!border-primary-500/20 bg-gradient-to-br from-white to-primary-50/50 dark:from-slate-800 dark:to-primary-900/20">
                        <GraduationCap className="h-10 w-10 text-primary-500 dark:text-primary-400 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Ready to Get Started?</h2>
                        <p className="text-slate-500 dark:text-slate-400 mb-6 max-w-xl mx-auto rich-text-content">
                            Join our {data.title.toLowerCase()} programs and transform your career with industry-recognized training and real-world projects.
                        </p>
                        <button onClick={() => navigate('contact')} className="btn-primary text-base !py-3.5 !px-8">
                            Apply Now <ArrowRight className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
