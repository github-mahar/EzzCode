import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative py-20 md:py-24 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 dot-grid" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-green/10 rounded-2xl mb-4">
            <FileText className="h-8 w-8 text-accent-green" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">Terms & Conditions</h1>
          <p className="text-slate-500 text-sm">Last updated: February 2026</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20 bg-base-dark">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="glass-card p-8 md:p-12 space-y-8">
            {[
              { title: 'Agreement to Terms', body: 'By accessing and using EzzCode platform, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the platform.' },
              { title: 'Program Enrollment', body: 'Enrollment in our programs is subject to eligibility criteria, availability, and successful completion of any required assessments. EzzCode reserves the right to modify enrollment requirements.' },
              { title: 'Payment Terms', body: 'Certain programs may require payment. All fees are clearly communicated before enrollment. Refund policies are outlined separately for each program.' },
              { title: 'Intellectual Property', body: 'All content on this platform, including text, graphics, logos, and software, is the property of EzzCode and protected by intellectual property laws. Course materials are for personal educational use only.' },
              { title: 'Code of Conduct', body: 'Participants are expected to maintain professional conduct during their internship programs. Any form of plagiarism, harassment, or misconduct may result in termination from the program.' },
              { title: 'Certificates', body: 'Certificates are issued upon successful completion of programs and are verifiable through our platform. EzzCode reserves the right to revoke certificates if fraud is detected.' },
              { title: 'Program Changes', body: 'EzzCode reserves the right to modify, suspend, or discontinue any program or service at any time. We will notify enrolled students of any significant changes.' },
              { title: 'Limitation of Liability', body: 'EzzCode shall not be liable for any indirect, incidental, or consequential damages arising from the use of our platform or participation in our programs.' },
              { title: 'Contact', body: 'For questions about these Terms and Conditions, please contact us at info@ezzcode.com.' },
            ].map(({ title, body }) => (
              <div key={title}>
                <h2 className="text-xl font-bold text-white mb-3">{title}</h2>
                <p className="text-slate-400 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
