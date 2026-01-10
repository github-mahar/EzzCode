import { useState, useEffect } from 'react';
import { ArrowRight, Code, Users, Briefcase, Award, CheckCircle, BookOpen } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';
import { Page } from '../components/Router';
import AdBanner from '../components/AdBanner';

interface HomePageProps {
  navigate: (page: Page) => void;
}

export default function HomePage({ navigate }: HomePageProps) {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const { data, error } = await supabase
        .from('programs')
        .select('*')
        .eq('status', 'active')
        .limit(3);

      if (error) throw error;
      setPrograms(data || []);
    } catch (error) {
      console.error('Error fetching programs:', error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Code,
      title: 'Real-World Projects',
      description: 'Work on actual projects that matter. Build your portfolio with applications used by real users.',
    },
    {
      icon: Users,
      title: 'Industry Mentorship',
      description: 'Learn from experienced developers who have worked at top tech companies. Get personalized guidance.',
    },
    {
      icon: Briefcase,
      title: 'Internship Experience',
      description: 'Gain valuable work experience through structured internships. Bridge the gap between learning and employment.',
    },
    {
      icon: Award,
      title: 'Verifiable Certificates',
      description: 'Earn industry-recognized certificates with unique IDs. Showcase your achievements to potential employers.',
    },
  ];

  return (
    <div>
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Empowering Future Developers<br />
              <span className="text-blue-300">Through Practical Learning</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Join EzzCode's comprehensive tech training and internship programs. Gain real-world experience, build production-ready projects, and launch your career in technology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => navigate('programs')}
                aria-label="Apply to EzzCode programs"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold text-lg transition-all hover:scale-105 flex items-center gap-2 shadow-lg"
              >
                Apply Now
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => navigate('programs')}
                aria-label="Explore available programs"
                className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 rounded-lg font-semibold text-lg transition-all hover:scale-105 shadow-lg"
              >
                Explore Programs
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
              <div>
                <div className="text-4xl font-bold text-blue-300">500+</div>
                <div className="text-blue-100">Students Trained</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-300">95%</div>
                <div className="text-blue-100">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-300">50+</div>
                <div className="text-blue-100">Partner Companies</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-300">6+</div>
                <div className="text-blue-100">Tech Programs</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Programs</h2>
                <p className="text-xl text-gray-600">Choose from our industry-leading training programs</p>
              </div>

              {loading ? (
                <div className="text-center py-12">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {programs.map((program) => (
                <div
                  key={program.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-2"
                >
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{program.title}</h3>
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <p className="text-gray-600 line-clamp-3">{program.description}</p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration: {program.duration}</span>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                        {program.category}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {program.skills.slice(0, 3).map((skill, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                      {program.skills.length > 3 && (
                        <span className="text-gray-500 text-sm">+{program.skills.length - 3} more</span>
                      )}
                    </div>
                    <button
                      onClick={() => navigate('programs')}
                      aria-label={`Learn more about ${program.title}`}
                      className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                    >
                      Learn More
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
              )}

              <div className="text-center mt-12">
                <button
                  onClick={() => navigate('programs')}
                  aria-label="View all available programs"
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg font-semibold transition-all"
                >
                  View All Programs
                </button>
              </div>
            </div>

            {/* Right Sidebar with Ads */}
            <aside className="lg:col-span-1 space-y-6" aria-label="Advertisement sidebar">
              <AdBanner size="sidebar" position="sidebar" />
              <AdBanner size="medium" position="sidebar" className="mt-6" />
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose EzzCode?</h2>
                <p className="text-xl text-gray-600">We provide everything you need to succeed in tech</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="text-center space-y-4 p-6 rounded-xl hover:bg-gray-50 transition-all group"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full group-hover:bg-blue-600 transition-colors">
                    <Icon className="h-8 w-8 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
              </div>
            </div>

            {/* Right Sidebar with Ads */}
            <aside className="lg:col-span-1 space-y-6" aria-label="Advertisement sidebar">
              <AdBanner size="sidebar" position="sidebar" />
            </aside>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry-Recognized Certificates</h2>
            <p className="text-xl text-gray-600">Earn verifiable certificates to showcase your skills</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-2xl p-8 border-8 border-blue-900">
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <Award className="h-24 w-24 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Certificate of Completion</h3>
                <div className="text-xl text-gray-700">This is to certify that</div>
                <div className="text-2xl font-bold text-blue-900">[Student Name]</div>
                <div className="text-lg text-gray-700">has successfully completed</div>
                <div className="text-2xl font-bold text-gray-900">[Program Name]</div>
                <div className="pt-6 border-t border-gray-200 space-y-2">
                  <div className="text-gray-600">Certificate ID: EZZCODE-YYYY-XX-###</div>
                  <div className="text-gray-600">Issue Date: MM/DD/YYYY</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => navigate('certificate')}
                aria-label="Verify a certificate"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <CheckCircle className="h-5 w-5" aria-hidden="true" />
                Verify a Certificate
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Tech Career?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join hundreds of students who have already transformed their careers with EzzCode. Get hands-on experience, industry mentorship, and verifiable certificates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('programs')}
              aria-label="Browse available programs"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-blue-900 rounded-lg font-semibold text-lg transition-all hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Browse Programs
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => navigate('contact')}
              aria-label="Contact EzzCode"
              className="px-8 py-4 border-2 border-white hover:bg-white hover:text-blue-900 text-white rounded-lg font-semibold text-lg transition-all"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
