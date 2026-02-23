import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, CheckCircle, XCircle, Shield, Download } from 'lucide-react';
import { supabase, Certificate } from '../lib/supabase';
import { jsPDF } from 'jspdf';
import logoSrc from '../EZZCODE.jpg';
import sealSrc from '../ezzcode_wax_seal.png';

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

/* ── Helpers ── */
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/* ── Draw full certificate ── */
async function drawCertificate(cert: Certificate): Promise<HTMLCanvasElement> {
  const W = 1400;
  const H = 1000;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  const CX = W / 2;

  // Fill ENTIRE canvas white (no black corners in JPG)
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, W, H);

  // Mint green outer background
  roundRect(ctx, 0, 0, W, H, 32);
  ctx.fillStyle = '#A7F3D0';
  ctx.fill();

  // White inner card
  const IN = 36;
  roundRect(ctx, IN, IN, W - IN * 2, H - IN * 2, 24);
  ctx.fillStyle = '#FFFFFF';
  ctx.fill();

  // Load EzzCode logo
  try {
    const logo = await loadImage(logoSrc);
    ctx.drawImage(logo, CX - 32, 72, 64, 64);
  } catch {
    ctx.font = 'bold 44px Inter, system-ui, sans-serif';
    ctx.fillStyle = '#3B82F6';
    ctx.textAlign = 'center';
    ctx.fillText('</>', CX, 115);
  }

  // "EzzCode" brand
  ctx.textAlign = 'center';
  ctx.font = 'bold 36px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#1E40AF';
  ctx.fillText('EzzCode', CX, 168);

  // "Certificate Verified" badge
  const badgeY = 198;
  const badgeW = 280;
  const badgeH = 44;
  const badgeX = CX - badgeW / 2;
  roundRect(ctx, badgeX, badgeY, badgeW, badgeH, badgeH / 2);
  ctx.strokeStyle = '#34D399';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  // Checkmark
  const chkX = badgeX + 30, chkY = badgeY + badgeH / 2;
  ctx.beginPath();
  ctx.arc(chkX, chkY, 12, 0, Math.PI * 2);
  ctx.fillStyle = '#34D399';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(chkX - 4.5, chkY + 0.5);
  ctx.lineTo(chkX - 1, chkY + 4);
  ctx.lineTo(chkX + 6, chkY - 4);
  ctx.strokeStyle = '#FFFFFF';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.stroke();
  ctx.font = '600 18px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#059669';
  ctx.textAlign = 'center';
  ctx.fillText('Certificate Verified', CX + 10, badgeY + 29);

  // Title
  ctx.font = 'bold 52px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText('Certificate of Completion', CX, 328);

  // "It is to be certified that"
  ctx.font = 'italic 22px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('It is to be certified that', CX, 390);

  // Student name
  ctx.font = 'bold 46px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#312E81';
  ctx.fillText(cert.student_name, CX, 450);

  // "completed {program} internship at EzzCode"
  ctx.font = 'italic 22px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('completed', CX, 500);

  // Program name
  ctx.font = 'bold 40px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(cert.program_name, CX, 550);

  // "internship at EzzCode"
  ctx.font = 'italic 22px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('internship at EzzCode', CX, 590);

  // Verification URL
  ctx.font = '500 16px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#3B82F6';
  ctx.fillText('Verify certificate at https://ezzcode.online/#certificate', CX, 630);

  // Divider line
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(IN + 60, 670);
  ctx.lineTo(W - IN - 60, 670);
  ctx.stroke();

  // Certificate ID (left)
  ctx.textAlign = 'left';
  ctx.font = '600 14px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('CERTIFICATE ID', IN + 80, 730);
  ctx.font = 'bold 20px "JetBrains Mono", "Courier New", monospace';
  ctx.fillStyle = '#059669';
  ctx.fillText(cert.certificate_id, IN + 80, 764);

  // Issue Date (right)
  ctx.textAlign = 'right';
  ctx.font = '600 14px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#94A3B8';
  ctx.fillText('ISSUE DATE', W - IN - 80, 730);
  const dateStr = new Date(cert.issue_date).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  ctx.font = '600 20px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#0F172A';
  ctx.fillText(dateStr, W - IN - 80, 764);

  // ── Wax seal stamp image (bottom-right) ──
  try {
    const seal = await loadImage(sealSrc);
    const sealSize = 180;
    ctx.drawImage(seal, CX - sealSize / 2, H - IN - sealSize - 30, sealSize, sealSize);
  } catch {
    // Fallback if image fails to load
  }

  // Bottom branding
  ctx.textAlign = 'center';
  ctx.font = '500 13px Inter, system-ui, sans-serif';
  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('www.ezzcode.online', CX, H - 52);

  return canvas;
}

export default function CertificatePage() {
  const [certificateId, setCertificateId] = useState('');
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');
  const s1 = useScrollReveal();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!certificateId.trim()) { setError('Please enter a certificate ID'); return; }
    setLoading(true); setError(''); setCertificate(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('certificates').select('*')
        .eq('certificate_id', certificateId.trim().toUpperCase())
        .maybeSingle();
      if (fetchError) throw fetchError;
      if (data) setCertificate(data);
      else setError('No certificate found with this ID. Please check and try again.');
    } catch {
      setError('An error occurred while verifying. Please try again later.');
    } finally { setLoading(false); }
  };

  const handleDownload = useCallback(async () => {
    if (!certificate) return;
    setDownloading(true);
    try {
      const canvas = await drawCertificate(certificate);
      const imgData = canvas.toDataURL('image/jpeg', 0.95);
      const pdfW = 297;
      const pdfH = (canvas.height / canvas.width) * pdfW;
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: [pdfW, pdfH] });
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfW, pdfH);

      // Make the verification URL clickable in the PDF
      // Canvas coords: text centered at (700, 630), font 16px, ~500px wide
      const scale = pdfW / 1400;
      const linkW = 480 * scale;   // approximate text width
      const linkH = 20 * scale;    // approximate text height
      const linkX = (700 * scale) - linkW / 2;
      const linkY = (630 * scale) - linkH + 2;
      pdf.link(linkX, linkY, linkW, linkH, { url: 'https://ezzcode.online/#certificate' });

      // Make the bottom branding URL clickable too
      const brandW = 200 * scale;
      const brandH = 16 * scale;
      const brandX = (700 * scale) - brandW / 2;
      const brandY = ((1000 - 52) * scale) - brandH + 2;
      pdf.link(brandX, brandY, brandW, brandH, { url: 'https://www.ezzcode.online' });

      pdf.save(`${certificate.certificate_id}.pdf`);
    } catch (err) {
      console.error('Download failed:', err);
    } finally { setDownloading(false); }
  }, [certificate]);

  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950 py-20 md:py-28 overflow-hidden">
        <div className="absolute bottom-0 -left-32 w-96 h-96 bg-primary-200/20 dark:bg-primary-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 dark:bg-primary-500/10 rounded-3xl mb-6">
            <Shield className="h-10 w-10 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4">Certificate Verification</h1>
          <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl mx-auto">Verify the authenticity of EzzCode certificates by entering the certificate ID below.</p>
        </div>
      </section>

      <section className="section-white py-16 lg:py-20">
        <div ref={s1.ref} className={`max-w-2xl mx-auto px-6 lg:px-8 animate-section ${s1.visible ? 'visible' : ''}`}>
          <div className="card !p-8">
            <form onSubmit={handleVerify} className="space-y-5">
              <label htmlFor="cert-id" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">Certificate ID</label>
              <div className="flex gap-3">
                <input id="cert-id" type="text" value={certificateId} onChange={(e) => setCertificateId(e.target.value)}
                  placeholder="e.g. EZZCODE-2024-WD-001" className="input-field flex-1 font-mono tracking-wider uppercase" />
                <button type="submit" disabled={loading} className="btn-primary !px-6 whitespace-nowrap disabled:opacity-50">
                  {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Search className="h-5 w-5" /> Verify</>}
                </button>
              </div>
            </form>
            <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-700">
              <p className="text-slate-400 dark:text-slate-500 text-xs mb-2">Sample IDs for testing:</p>
              <div className="flex flex-wrap gap-2">
                {['EZZCODE-2024-PY-002', 'EZZCODE-2026-WD-002', 'EZZCODE-2024-WD-001'].map(id => (
                  <button key={id} onClick={() => setCertificateId(id)}
                    className="font-mono text-xs text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-500/10 hover:bg-primary-100 dark:hover:bg-primary-500/20 px-3 py-1.5 rounded-lg border border-primary-100 dark:border-primary-500/20 transition-colors">
                    {id}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-6 flex items-start gap-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-600/30 text-red-700 dark:text-red-400 p-5 rounded-xl">
              <XCircle className="h-5 w-5 flex-shrink-0 mt-0.5" /><p className="text-sm">{error}</p>
            </div>
          )}

          {certificate && (
            <div className="mt-8 card !border-green-200 dark:!border-green-600/30 !bg-green-50/30 dark:!bg-green-950/30 !p-8">
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/30 rounded-full px-5 py-2 text-sm font-semibold">
                  <CheckCircle className="h-4 w-4" /> Certificate Verified
                </span>
              </div>
              <div className="text-center space-y-5">
                <img src={logoSrc} alt="EzzCode Logo" className="w-14 h-14 mx-auto" />
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Certificate of Completion</h3>
                <div className="space-y-1">
                  <p className="text-slate-400 dark:text-slate-500 text-sm italic">It is to be certified that</p>
                  <p className="text-xl font-bold gradient-text">{certificate.student_name}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-400 dark:text-slate-500 text-sm italic">completed</p>
                  <p className="text-xl font-bold text-slate-900 dark:text-white">{certificate.program_name}</p>
                  <p className="text-slate-400 dark:text-slate-500 text-sm italic">internship at EzzCode</p>
                </div>
                <p className="text-primary-500 dark:text-primary-400 text-xs mt-2">Verify certificate at <a href="https://ezzcode.online/#certificate" className="underline hover:text-primary-600 dark:hover:text-primary-300 transition-colors">ezzcode.online/#certificate</a></p>
                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-200 dark:border-slate-700 max-w-sm mx-auto">
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1">Certificate ID</p>
                    <p className="font-mono text-emerald-600 dark:text-emerald-400 text-sm font-bold">{certificate.certificate_id}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 dark:text-slate-500 text-xs uppercase tracking-wider mb-1">Issue Date</p>
                    <p className="text-slate-900 dark:text-white text-sm font-semibold">{new Date(certificate.issue_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="pt-4">
                  <button onClick={handleDownload} disabled={downloading} className="btn-primary !py-3 !px-8 text-base disabled:opacity-50">
                    {downloading
                      ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Generating...</>
                      : <><Download className="h-5 w-5" /> Download Certificate (PDF)</>
                    }
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
