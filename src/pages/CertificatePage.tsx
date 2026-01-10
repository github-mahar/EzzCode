import { useState } from 'react';
import { Award, Search, CheckCircle, XCircle, Calendar, User, FileText } from 'lucide-react';
import { supabase, Certificate } from '../lib/supabase';
import AdBanner from '../components/AdBanner';

export default function CertificatePage() {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) {
      setError('Please enter a certificate ID');
      return;
    }

    setLoading(true);
    setError('');
    setSearched(true);
    setCertificate(null);

    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_id', certificateId.trim().toUpperCase())
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setCertificate(data);
      } else {
        setError('Certificate not found. Please check the ID and try again.');
      }
    } catch (err) {
      console.error('Error verifying certificate:', err);
      setError('An error occurred while verifying the certificate.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Award className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Certificate Verification</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Enter a certificate ID to verify its authenticity and view details
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleVerify} className="space-y-6">
              <div>
                <label htmlFor="certificateId" className="block text-sm font-medium text-gray-700 mb-2">
                  Certificate ID
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    id="certificateId"
                    value={certificateId}
                    onChange={(e) => setCertificateId(e.target.value)}
                    placeholder="e.g., EZZCODE-2024-WD-001"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <Search className="h-5 w-5" />
                        Verify
                      </>
                    )}
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Certificate IDs are case-insensitive and follow the format: EZZCODE-YYYY-XX-###
                </p>
              </div>
            </form>

            {error && searched && (
              <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900">Verification Failed</h3>
                  <p className="text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {certificate && (
              <div className="mt-8 space-y-6">
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900">Certificate Verified</h3>
                    <p className="text-green-700 mt-1">This certificate is valid and authentic.</p>
                  </div>
                </div>

                <div className="border-4 border-blue-900 rounded-xl p-8 bg-gradient-to-br from-blue-50 to-white">
                  <div className="text-center space-y-6">
                    <div className="flex justify-center">
                      <Award className="h-20 w-20 text-blue-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900">Certificate of Completion</h2>

                    <div className="space-y-4 py-6">
                      <div className="flex items-center justify-center gap-3 text-lg">
                        <User className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">Student Name:</span>
                        <span className="font-bold text-blue-900">{certificate.student_name}</span>
                      </div>

                      <div className="flex items-center justify-center gap-3 text-lg">
                        <FileText className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">Program:</span>
                        <span className="font-bold text-gray-900">{certificate.program_name}</span>
                      </div>

                      <div className="flex items-center justify-center gap-3 text-lg">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">Issue Date:</span>
                        <span className="font-bold text-gray-900">{formatDate(certificate.issue_date)}</span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-gray-600 text-sm">Certificate ID</p>
                      <p className="text-blue-900 font-mono font-bold text-lg">{certificate.certificate_id}</p>
                    </div>

                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                      certificate.status === 'valid'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {certificate.status === 'valid' ? (
                        <>
                          <CheckCircle className="h-5 w-5" />
                          <span className="font-semibold">Status: Valid</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5" />
                          <span className="font-semibold">Status: {certificate.status}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
              </div>

              <div className="mt-8 bg-blue-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Sample Certificate IDs</h3>
                <p className="text-gray-700 mb-3">Try verifying one of these sample certificates:</p>
                <ul className="space-y-2">
                  <li className="font-mono text-sm text-blue-700">EZZCODE-2024-WD-001</li>
                  <li className="font-mono text-sm text-blue-700">EZZCODE-2024-PY-002</li>
                  <li className="font-mono text-sm text-blue-700">EZZCODE-2024-AI-003</li>
                  <li className="font-mono text-sm text-blue-700">EZZCODE-2024-FS-004</li>
                </ul>
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
    </div>
  );
}
