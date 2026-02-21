import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div>
      <section className="relative bg-gradient-to-br from-primary-50 via-white to-purple-50 py-20 md:py-24 overflow-hidden">
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-2xl mb-4">
            <Shield className="h-8 w-8 text-primary-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-3">Privacy Policy</h1>
          <p className="text-slate-400 text-sm">Last updated: February 2026</p>
        </div>
      </section>
      <section className="section-white py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <div className="card !p-8 md:!p-12 space-y-8">
            {[
              { title: 'Information We Collect', body: 'We collect personal information such as your name, email address, phone number, and resume when you submit forms on our platform. We also collect usage data through analytics tools to improve our services.' },
              { title: 'How We Use Your Information', body: 'Your information is used to process your applications, communicate with you about our programs, issue certificates, and improve our platform. We never sell your personal data to third parties.' },
              { title: 'Data Protection', body: 'We implement industry-standard security measures to protect your personal data. All data is stored securely using Supabase with encryption at rest and in transit.' },
              { title: 'Cookies', body: 'Our website uses essential cookies and Google Analytics to understand how visitors interact with our platform. You can disable cookies through your browser settings.' },
              { title: 'Your Rights', body: 'You have the right to access, modify, or delete your personal information. To exercise these rights, please contact us at info@ezzcode.com.' },
              { title: 'Contact', body: 'If you have any questions about this Privacy Policy, please contact us at info@ezzcode.com.' },
            ].map(({ title, body }) => (
              <div key={title}>
                <h2 className="text-xl font-bold text-slate-900 mb-3">{title}</h2>
                <p className="text-slate-500 leading-relaxed text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
