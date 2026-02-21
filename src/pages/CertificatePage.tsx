import { useState, useRef, useEffect } from 'react';
import { Award, Search, CheckCircle, XCircle, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { supabase, Certificate } from '../lib/supabase';

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

export default function CertificatePage() {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const s1 = useScrollReveal();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) { setError('Please enter a certificate ID'); return; }

    setLoading(true);
    setError('');
    setCertificate(null);
    setSearched(true);

    try {
      const { data, error: fetchError } = await supabase
        .from('certificates')
        .select('*')
        .eq('certificate_id', certificateId.trim().toUpperCase())
        .maybeSingle();

      if (fetchError) throw fetchError;
      if (data) { setCertificate(data); }
      else { setError('No certificate found with this ID. Please check and try again.'); }
    } catch (err) {
      setError('An error occurred while verifying. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent-green/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-accent-green/10 rounded-3xl mb-6 animate-glow-pulse">
            <Shield className="h-10 w-10 text-accent-green" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Certificate Verification</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Verify the authenticity of EzzCode certificates by entering the certificate ID below.</p>
        </div>
      </section>

      {/* Verify Form */}
      <section className="py-16 lg:py-20 bg-base-dark">
        <div ref={s1.ref} className={`max-w-2xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          <div className="glass-card p-8">
            <form onSubmit={handleVerify} className="space-y-5">
              <label htmlFor="cert-id" className="block text-sm font-medium text-slate-300">Certificate ID</label>
              <div className="flex gap-3">
                <input
                  id="cert-id"
                  type="text"
                  value={certificateId}
                  onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g. EZZCODE-2025-01-001"
                  className="input-dark flex-1 font-mono tracking-wider uppercase"
                />
                <button type="submit" disabled={loading} className="btn-primary !px-6 whitespace-nowrap disabled:opacity-50">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-base-dark/30 border-t-base-dark rounded-full animate-spin" />
                  ) : (
                    <>
                      <Search className="h-5 w-5" />
                      Verify
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Sample IDs */}
            <div className="mt-5 pt-5 border-t border-white/5">
              <p className="text-slate-600 text-xs mb-2">Sample IDs for testing:</p>
              <div className="flex flex-wrap gap-2">
                {['EZZCODE-2025-01-001', 'EZZCODE-2025-01-002'].map(id => (
                  <button
                    key={id}
                    onClick={() => setCertificateId(id)}
                    className="font-mono text-xs text-accent-green/70 bg-accent-green/5 hover:bg-accent-green/10 px-3 py-1.5 rounded-lg border border-accent-green/10 transition-colors"
                  >
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 flex items-start gap-3 bg-red-950/50 border border-red-600/30 text-red-400 p-5 rounded-xl">
              <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Result */}
          {certificate && (
            <div className="mt-8 glass-card p-8 border-accent-green/20">
              {/* Glow decoration */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-green/5 rounded-full blur-3xl pointer-events-none" />

              {/* Status badge */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full px-5 py-2 text-sm font-medium">
                  <CheckCircle className="h-4 w-4" /> Certificate Verified
                </span>
              </div>

              <div className="text-center space-y-5 relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-green/10 rounded-3xl">
                  <Award className="h-9 w-9 text-accent-green" />
                </div>
                <h3 className="text-2xl font-bold text-white">Certificate of Completion</h3>

                <div className="space-y-1">
                  <p className="text-slate-500 text-sm">Awarded to</p>
                  <p className="text-xl font-bold text-accent-green">{certificate.student_name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-slate-500 text-sm">For completing</p>
                  <p className="text-xl font-bold text-white">{certificate.program_name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 max-w-sm mx-auto">
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Certificate ID</p>
                    <p className="font-mono text-accent-green text-sm font-bold">{certificate.certificate_id}</p>
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider mb-1">Issue Date</p>
                    <p className="text-white text-sm">{new Date(certificate.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
