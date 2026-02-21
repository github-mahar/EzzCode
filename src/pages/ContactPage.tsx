import { useState, useEffect, useRef } from 'react';
import { Send, Mail, Phone, MapPin, Upload, X, CheckCircle, AlertCircle, FileText, MessageSquare } from 'lucide-react';
import { supabase, Program } from '../lib/supabase';

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
  const [formData, setFormData] = useState({ name: '', email: '', whatsapp: '', program_id: '', message: '' });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [programs, setPrograms] = useState<Program[]>([]);
  const s1 = useScrollReveal();

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
    if (!formData.name || !formData.email || !formData.whatsapp || !formData.program_id || !formData.message) {
      setError('Please fill in all required fields'); setLoading(false); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { setError('Please enter a valid email'); setLoading(false); return; }
    if (!/^\+?[\d\s-]{10,}$/.test(formData.whatsapp)) { setError('Please enter a valid WhatsApp number'); setLoading(false); return; }
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
        name: formData.name, email: formData.email, whatsapp_number: formData.whatsapp,
        program_id: parseInt(formData.program_id), message: formData.message, resume_url,
      }]);
      if (insertError) throw insertError;
      setSuccess(true);
      setFormData({ name: '', email: '', whatsapp: '', program_id: '', message: '' });
      setFile(null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20 md:py-28 overflow-hidden">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary-200/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="badge mx-auto mb-4"><MessageSquare className="h-3.5 w-3.5" /><span>Get In Touch</span></div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">Have questions or ready to join? Reach out and we'll get back to you within 24 hours.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-white py-16 lg:py-20">
        <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-5">
              {[
                { icon: Mail, label: 'Email', value: 'info@ezzcode.com', href: 'mailto:info@ezzcode.com' },
                { icon: Phone, label: 'Phone', value: '+92 300 1234567', href: 'tel:+923001234567' },
                { icon: MapPin, label: 'Location', value: 'Rawalpindi, Pakistan', href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="card !p-5 flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-primary-50 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                    <Icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs uppercase tracking-wider">{label}</p>
                    <p className="text-slate-900 font-medium text-sm">{value}</p>
                  </div>
                </a>
              ))}
              <div className="card !p-5 !border-green-200 !bg-green-50/50">
                <div className="flex items-center gap-2 text-green-700 mb-1.5">
                  <CheckCircle className="h-5 w-5" /><span className="font-semibold text-sm">Quick Response</span>
                </div>
                <p className="text-slate-500 text-sm">We typically respond within 24 hours on business days.</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="card !p-8">
                {success && (
                  <div className="mb-6 flex items-start gap-3 bg-green-50 border border-green-200 text-green-700 p-5 rounded-xl">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm text-green-600 mt-1">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}
                {error && (
                  <div className="mb-6 flex items-start gap-3 bg-red-50 border border-red-200 text-red-700 p-5 rounded-xl">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" /><p className="text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Full Name <span className="text-primary-500">*</span></label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" className="input-field" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email <span className="text-primary-500">*</span></label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="input-field" required />
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-semibold text-slate-700 mb-2">WhatsApp <span className="text-primary-500">*</span></label>
                      <input id="whatsapp" name="whatsapp" type="tel" value={formData.whatsapp} onChange={handleChange} placeholder="+92 300 1234567" className="input-field" required />
                    </div>
                    <div>
                      <label htmlFor="program_id" className="block text-sm font-semibold text-slate-700 mb-2">Program <span className="text-primary-500">*</span></label>
                      <select id="program_id" name="program_id" value={formData.program_id} onChange={handleChange} className="input-field" required>
                        <option value="">Select a program</option>
                        {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message <span className="text-primary-500">*</span></label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about yourself..." className="input-field resize-none" required />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Resume (Optional)</label>
                    {file ? (
                      <div className="flex items-center gap-3 bg-primary-50 border border-primary-100 rounded-xl p-4">
                        <FileText className="h-5 w-5 text-primary-600 flex-shrink-0" />
                        <span className="text-slate-700 text-sm truncate flex-1">{file.name}</span>
                        <button type="button" onClick={() => setFile(null)} className="text-slate-400 hover:text-red-500 transition-colors"><X className="h-4 w-4" /></button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-200 hover:border-primary-300 rounded-xl cursor-pointer transition-colors group">
                        <Upload className="h-8 w-8 text-slate-300 group-hover:text-primary-400 transition-colors mb-2" />
                        <span className="text-slate-400 text-sm">Click to upload PDF (max 2MB)</span>
                        <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                      </label>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full !py-4 text-base disabled:opacity-50">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="h-5 w-5" /> Send Message</>}
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
