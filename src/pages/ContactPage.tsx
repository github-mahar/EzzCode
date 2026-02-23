import { useState, useEffect, useRef } from 'react';
import { Send, Mail, Upload, X, CheckCircle, AlertCircle, FileText, MessageSquare, ChevronDown, Clock } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';

const COUNTRY_CODES = [
  { code: '+92', name: 'PK', flag: '🇵🇰' },
  { code: '+1', name: 'US', flag: '🇺🇸' },
  { code: '+44', name: 'UK', flag: '🇬🇧' },
  { code: '+91', name: 'IN', flag: '🇮🇳' },
  { code: '+971', name: 'AE', flag: '🇦🇪' },
  { code: '+966', name: 'SA', flag: '🇸🇦' },
  { code: '+90', name: 'TR', flag: '🇹🇷' },
  { code: '+61', name: 'AU', flag: '🇦🇺' },
  { code: '+49', name: 'DE', flag: '🇩🇪' },
  { code: '+33', name: 'FR', flag: '🇫🇷' },
  { code: '+81', name: 'JP', flag: '🇯🇵' },
  { code: '+86', name: 'CN', flag: '🇨🇳' },
  { code: '+7', name: 'RU', flag: '🇷🇺' },
  { code: '+55', name: 'BR', flag: '🇧🇷' },
  { code: '+39', name: 'IT', flag: '🇮🇹' },
  { code: '+34', name: 'ES', flag: '🇪🇸' },
  { code: '+1', name: 'CA', flag: '🇨🇦' },
  { code: '+82', name: 'KR', flag: '🇰🇷' },
  { code: '+62', name: 'ID', flag: '🇮🇩' },
  { code: '+234', name: 'NG', flag: '🇳🇬' },
  { code: '+20', name: 'EG', flag: '🇪🇬' },
  { code: '+27', name: 'ZA', flag: '🇿🇦' },
  { code: '+60', name: 'MY', flag: '🇲🇾' },
  { code: '+66', name: 'TH', flag: '🇹🇭' },
  { code: '+84', name: 'VN', flag: '🇻🇳' },
  { code: '+63', name: 'PH', flag: '🇵🇭' },
  { code: '+65', name: 'SG', flag: '🇸🇬' },
  { code: '+31', name: 'NL', flag: '🇳🇱' },
  { code: '+41', name: 'CH', flag: '🇨🇭' },
  { code: '+46', name: 'SE', flag: '🇸🇪' },
  { code: '+47', name: 'NO', flag: '🇳🇴' },
  { code: '+45', name: 'DK', flag: '🇩🇰' },
  { code: '+353', name: 'IE', flag: '🇮🇪' },
  { code: '+351', name: 'PT', flag: '🇵🇹' },
  { code: '+30', name: 'GR', flag: '🇬🇷' },
  { code: '+43', name: 'AT', flag: '🇦🇹' },
  { code: '+32', name: 'BE', flag: '🇧🇪' },
  { code: '+48', name: 'PL', flag: '🇵🇱' },
  { code: '+358', name: 'FI', flag: '🇫🇮' },
  { code: '+64', name: 'NZ', flag: '🇳🇿' },
  { code: '+52', name: 'MX', flag: '🇲🇽' },
  { code: '+974', name: 'QA', flag: '🇶🇦' },
  { code: '+965', name: 'KW', flag: '🇰🇼' },
  { code: '+968', name: 'OM', flag: '🇴🇲' },
  { code: '+973', name: 'BH', flag: '🇧🇭' },
  { code: '+962', name: 'JO', flag: '🇯🇴' },
  { code: '+961', name: 'LB', flag: '🇱🇧' },
  { code: '+212', name: 'MA', flag: '🇲🇦' },
].sort((a, b) => a.code.localeCompare(b.code));

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

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', countryCode: '+92', program_id: '', message: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const s1 = useScrollReveal();

  // Auto-dismiss toast after 8 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 8000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    supabase.from('programs').select('*').eq('status', 'active').then(({ data }) => { if (data) setPrograms(data); });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'application/pdf') { setError('Please upload a PDF file only'); return; }
    if (f.size > 2 * 1024 * 1024) { setError('File must be under 2MB'); return; }
    setFile(f); setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError(''); setSuccess(false);

    // Auto-strip leading zeros from the phone number
    const cleanNumber = formData.whatsapp.replace(/\s+/g, '').replace(/^0+/, '');
    const fullWhatsapp = `${formData.countryCode}${cleanNumber}`;

    if (!formData.name || !formData.email || !formData.whatsapp || !formData.program_id || !formData.message) {
      setError('Please fill in all required fields'); setLoading(false); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError('Please enter a valid email'); setLoading(false); return; }
    if (!/^\d{7,15}$/.test(cleanNumber)) {
      setError('Please enter a valid WhatsApp number (7-15 digits after country code)'); setLoading(false); return;
    }

    try {
      let resume_url = null;
      if (file) {
        const fileName = `resumes/${formData.name}_${Date.now()}.pdf`;
        const { error: uploadError } = await supabase.storage.from('contacts').upload(fileName, file);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from('contacts').getPublicUrl(fileName);
        resume_url = urlData.publicUrl;
      }
      const { error: insertError } = await supabase.from('contacts').insert([{
        name: formData.name, email: formData.email, whatsapp_number: fullWhatsapp,
        program_id: formData.program_id, message: formData.message, resume_url,
      }]);
      if (insertError) {
        // Postgres unique violation = code 23505
        if (insertError.code === '23505') {
          setToast('You have already sent a query. Please wait 24 hours — our team will contact you shortly, or mail us at info@ezzcode.online');
          setLoading(false);
          return;
        }
        throw insertError;
      }
      setSuccess(true);
      setFormData({ name: '', email: '', whatsapp: '', countryCode: '+92', program_id: '', message: '' });
      setFile(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div>
      {/* ── Duplicate Email Toast ── */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9999] w-[94%] max-w-lg animate-[slideDown_0.4s_cubic-bezier(0.16,1,0.3,1)] pointer-events-auto">
          <div className="bg-amber-50 dark:bg-amber-950/80 border border-amber-300 dark:border-amber-500/30 rounded-2xl shadow-2xl shadow-amber-500/10 p-5 flex items-start gap-4 backdrop-blur-xl">
            <div className="w-10 h-10 bg-amber-100 dark:bg-amber-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
              <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-amber-900 dark:text-amber-200 font-bold text-sm mb-1">Already Submitted</p>
              <p className="text-amber-700 dark:text-amber-300/90 text-sm leading-relaxed">{toast}</p>
            </div>
            <button onClick={() => setToast(null)} className="p-1.5 hover:bg-amber-200/50 dark:hover:bg-amber-500/20 rounded-lg transition-colors flex-shrink-0">
              <X className="h-4 w-4 text-amber-500 dark:text-amber-400" />
            </button>
          </div>
        </div>
      )}
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-200/20 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4 tracking-widest font-bold"><MessageSquare className="h-4 w-4" /><span>GET IN TOUCH</span></div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">Contact <span className="gradient-text">Us</span></h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">Have questions or ready to join? Reach out and we'll get back to you within 24 hours.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-white py-16 lg:py-24">
        <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Sidebar — Email only */}
            <div className="space-y-6">
              <a href="mailto:info@ezzcode.com" className="card !p-6 flex items-center gap-5 group border-slate-100 dark:border-slate-800">
                <div className="w-14 h-14 bg-primary-50 dark:bg-primary-500/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  <Mail className="h-6 w-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-slate-400 dark:text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-0.5">Direct Email</p>
                  <p className="text-slate-900 dark:text-white font-bold text-base tracking-tight">info@ezzcode.com</p>
                </div>
              </a>

              <div className="card !p-6 !border-primary-100 dark:!border-primary-500/10 !bg-primary-50/30 dark:!bg-primary-950/10">
                <div className="flex items-center gap-2.5 text-primary-600 dark:text-primary-400 mb-2">
                  <CheckCircle className="h-5 w-5" /><span className="font-bold text-sm uppercase tracking-wider">Quick Response</span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">We typically respond within 24 hours on business days. Your career is our priority.</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div id="contact-form-card" className="card !p-10 border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/20 dark:shadow-none">
                {success && (
                  <div className="mb-8 flex items-start gap-4 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-500/20 text-emerald-700 dark:text-emerald-400 p-6 rounded-2xl">
                    <CheckCircle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-lg">Message sent successfully!</p>
                      <p className="text-sm opacity-90 mt-1">We've received your application. Our team will get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="mb-8 flex items-start gap-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-500/20 text-rose-700 dark:text-rose-400 p-6 rounded-2xl">
                    <AlertCircle className="h-6 w-6 flex-shrink-0 mt-0.5" /><p className="text-sm font-medium">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Full Name <span className="text-primary-500 font-bold">*</span></label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="First and last name" className="input-field" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Email Address <span className="text-primary-500">*</span></label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="input-field" required />
                    </div>

                    {/* WhatsApp with Country Code */}
                    <div className="md:col-span-1">
                      <label htmlFor="whatsapp" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">WhatsApp Number <span className="text-primary-500">*</span></label>
                      <div className="flex gap-2">
                        <div className="relative min-w-[125px]">
                          <select
                            name="countryCode"
                            value={formData.countryCode}
                            onChange={handleChange}
                            className="input-field appearance-none pr-8 font-bold text-sm bg-slate-50 dark:bg-slate-800"
                          >
                            {COUNTRY_CODES.map(c => (
                              <option key={`${c.name}-${c.code}`} value={c.code}>
                                {c.flag} {c.code}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                        </div>
                        <input id="whatsapp" name="whatsapp" type="tel" value={formData.whatsapp} onChange={handleChange} placeholder="300 1234567" className="input-field flex-1" required />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="program_id" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Selected Program <span className="text-primary-500">*</span></label>
                      <div className="relative">
                        <select id="program_id" name="program_id" value={formData.program_id} onChange={handleChange} className="input-field appearance-none pr-10 font-medium" required>
                          <option value="">Select a program</option>
                          {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Additional Message <span className="text-primary-500">*</span></label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about yourself and your career goals..." className="input-field resize-none !py-4" required />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2.5">Resume / CV (Optional)</label>
                    {file ? (
                      <div className="flex items-center gap-4 bg-primary-50 dark:bg-primary-500/10 border border-primary-200 dark:border-primary-500/20 rounded-2xl p-5 shadow-sm">
                        <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-sm">
                          <FileText className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <span className="text-slate-900 dark:text-white text-sm font-bold truncate flex-1">{file.name}</span>
                        <button type="button" onClick={() => setFile(null)} className="p-2 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-slate-400 hover:text-rose-500 rounded-xl transition-all"><X className="h-5 w-5" /></button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center py-10 border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-primary-400 dark:hover:border-primary-500/40 rounded-2xl cursor-pointer transition-all group bg-slate-50/50 dark:bg-transparent">
                        <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                          <Upload className="h-8 w-8 text-slate-300 dark:text-slate-600 group-hover:text-primary-500 transition-colors" />
                        </div>
                        <span className="text-slate-900 dark:text-white font-bold text-sm">Upload Resume</span>
                        <span className="text-slate-400 dark:text-slate-500 text-xs mt-1">PDF format (max 2MB)</span>
                        <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                      </label>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full !py-4 text-base font-bold shadow-xl shadow-primary-500/20 disabled:opacity-50">
                    {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : <><Send className="h-5 w-5" /> Send Application</>}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
