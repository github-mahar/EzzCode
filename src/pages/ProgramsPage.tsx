import { useState, useEffect } from 'react';
import { BookOpen, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';
import { Page } from '../components/Router';
import AdBanner from '../components/AdBanner';

interface ProgramsPageProps {
  navigate: (page: Page) => void;
}

export default function ProgramsPage({ navigate }: ProgramsPageProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(programs.map(p => p.category)))];

  const filteredPrograms = selectedCategory === 'All'
    ? programs
    : programs.filter(p => p.category === selectedCategory);

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Programs</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive training programs designed to transform beginners into job-ready developers
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap gap-3 justify-center mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : filteredPrograms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No programs found in this category.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredPrograms.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gradient-to-br from-blue-600 to-blue-700 p-8 flex items-center justify-center">
                      <div className="text-center text-white">
                        <BookOpen className="h-20 w-20 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold mb-2">{program.title}</h3>
                        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{program.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="md:w-2/3 p-8">
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 uppercase mb-2">About This Program</h4>
                          <p className="text-gray-700 leading-relaxed">{program.description}</p>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 uppercase mb-3">Skills You'll Learn</h4>
                          <div className="flex flex-wrap gap-2">
                            {program.skills.map((skill, idx) => (
                              <span
                                key={idx}
                                className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold text-blue-600 uppercase mb-2">Eligibility</h4>
                          <div className="flex items-start gap-2">
                            <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <p className="text-gray-700">{program.eligibility}</p>
                          </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                          <button
                            onClick={() => navigate('contact')}
                            aria-label={`Apply to ${program.title}`}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                          >
                            Apply Now
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                          </button>
                          <button
                            onClick={() => navigate('contact')}
                            aria-label={`Learn more about ${program.title}`}
                            className="px-6 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-colors"
                          >
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
            </div>

            {/* Sidebar with Ads */}
            <aside className="lg:col-span-1 space-y-6" aria-label="Advertisement sidebar">
              <AdBanner size="sidebar" adSlot="9423164994" adFormat="auto" fullWidthResponsive placeholderText="Advertisement" placeholderDetails="300x600" />
              <AdBanner size="medium" adSlot="9423164994" adFormat="auto" fullWidthResponsive placeholderText="Advertisement" placeholderDetails="300x250" className="mt-6" />
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Not Sure Which Program to Choose?
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Our team is here to help you find the perfect program based on your goals and background.
                </p>
                <button
                  onClick={() => navigate('contact')}
                  aria-label="Get in touch with EzzCode"
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
                >
                  Get In Touch
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            {/* Right Sidebar with Ads */}
            <aside className="lg:col-span-1 space-y-6" aria-label="Advertisement sidebar">
              <AdBanner size="sidebar" adSlot="9423164994" adFormat="auto" fullWidthResponsive placeholderText="Advertisement" placeholderDetails="300x600" />
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
