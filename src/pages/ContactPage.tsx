import { useState, useEffect, useRef } from 'react';
import { Send, Mail, Phone, MapPin, Upload, X, CheckCircle, AlertCircle, FileText } from 'lucide-react';
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
    supabase.from('programs').select('*').eq('status', 'active').then(({ data }) => {
      if (data) setPrograms(data);
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (f.type !== 'application/pdf') { setError('Please upload a PDF file only'); return; }
    if (f.size > 2 * 1024 * 1024) { setError('File must be under 2MB'); return; }
    setFile(f);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validation
    if (!formData.name || !formData.email || !formData.whatsapp || !formData.program_id || !formData.message) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) { setError('Please enter a valid email address'); setLoading(false); return; }
    const phoneRegex = /^\+?[\d\s-]{10,}$/;
    if (!phoneRegex.test(formData.whatsapp)) { setError('Please enter a valid WhatsApp number'); setLoading(false); return; }

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
        name: formData.name,
        email: formData.email,
        whatsapp_number: formData.whatsapp,
        program_id: parseInt(formData.program_id),
        message: formData.message,
        resume_url,
      }]);

      if (insertError) throw insertError;
      setSuccess(true);
      setFormData({ name: '', email: '', whatsapp: '', program_id: '', message: '' });
      setFile(null);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-28 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <p className="text-accent-green text-sm font-semibold uppercase tracking-widest mb-4">Get In Touch</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">Contact Us</h1>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">Have questions or ready to join? Reach out and we'll get back to you within 24 hours.</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 lg:py-20 bg-base-dark">
        <div ref={s1.ref} className={`max-w-7xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Sidebar */}
            <div className="space-y-6">
              {[
                { icon: Mail, label: 'Email', value: 'info@ezzcode.com', href: 'mailto:info@ezzcode.com' },
                { icon: Phone, label: 'Phone', value: '+92 300 1234567', href: 'tel:+923001234567' },
                { icon: MapPin, label: 'Location', value: 'Rawalpindi, Pakistan', href: '#' },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} className="glass-card p-5 flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-accent-green/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-accent-green/20 transition-colors">
                    <Icon className="h-6 w-6 text-accent-green" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wider">{label}</p>
                    <p className="text-white font-medium text-sm">{value}</p>
                  </div>
                </a>
              ))}

              <div className="glass-card p-5">
                <div className="flex items-center gap-2 text-accent-green mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <span className="font-semibold text-sm">Quick Response</span>
                </div>
                <p className="text-slate-400 text-sm">We typically respond within 24 hours on business days.</p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <div className="glass-card p-8">
                {/* Success message */}
                {success && (
                  <div className="mb-6 flex items-start gap-3 bg-green-950/50 border border-green-600/30 text-green-400 p-5 rounded-xl">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Message sent successfully!</p>
                      <p className="text-sm text-green-400/70 mt-1">We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                {/* Error */}
                {error && (
                  <div className="mb-6 flex items-start gap-3 bg-red-950/50 border border-red-600/30 text-red-400 p-5 rounded-xl">
                    <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">{error}</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name <span className="text-accent-green">*</span></label>
                      <input id="name" name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Your name" className="input-dark" required />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email <span className="text-accent-green">*</span></label>
                      <input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="input-dark" required />
                    </div>
                    <div>
                      <label htmlFor="whatsapp" className="block text-sm font-medium text-slate-300 mb-2">WhatsApp <span className="text-accent-green">*</span></label>
                      <input id="whatsapp" name="whatsapp" type="tel" value={formData.whatsapp} onChange={handleChange} placeholder="+92 300 1234567" className="input-dark" required />
                    </div>
                    <div>
                      <label htmlFor="program_id" className="block text-sm font-medium text-slate-300 mb-2">Program <span className="text-accent-green">*</span></label>
                      <select id="program_id" name="program_id" value={formData.program_id} onChange={handleChange} className="input-dark" required>
                        <option value="">Select a program</option>
                        {programs.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message <span className="text-accent-green">*</span></label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} placeholder="Tell us about yourself and what you're looking for..." className="input-dark resize-none" required />
                  </div>

                  {/* File Upload */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Resume (Optional)</label>
                    {file ? (
                      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                        <FileText className="h-5 w-5 text-accent-green flex-shrink-0" />
                        <span className="text-white text-sm truncate flex-1">{file.name}</span>
                        <button type="button" onClick={() => setFile(null)} className="text-slate-500 hover:text-red-400 transition-colors">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center py-8 border-2 border-dashed border-white/10 hover:border-accent-green/30 rounded-xl cursor-pointer transition-colors group">
                        <Upload className="h-8 w-8 text-slate-600 group-hover:text-accent-green/60 transition-colors mb-2" />
                        <span className="text-slate-500 text-sm">Click to upload PDF (max 2MB)</span>
                        <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" />
                      </label>
                    )}
                  </div>

                  <button type="submit" disabled={loading} className="btn-primary w-full !py-4 text-base disabled:opacity-50">
                    {loading ? (
                      <div className="w-5 h-5 border-2 border-base-dark/30 border-t-base-dark rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
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
