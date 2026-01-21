import { Shield } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-xl text-blue-100">Last updated: January 2024</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you visit or use our website and services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                We may collect basic information such as your name, email address, phone number, and project details when you contact us through forms, email, or other communication methods. We may also collect non-personal data like browser type, device information, and website usage statistics to improve our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Respond to your inquiries and provide services</li>
                <li>Understand your requirements and improve our solutions</li>
                <li>Communicate updates, proposals, or important information</li>
                <li>Maintain website security and performance</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-3">
                We do not sell, rent, or trade your personal information to third parties.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Protection</h2>
              <p className="text-gray-700 leading-relaxed">
                We take reasonable measures to protect your personal data from unauthorized access, loss, misuse, or disclosure. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
              <p className="text-gray-700 leading-relaxed">
                Our website may use third-party tools (such as analytics or hosting services) that may collect limited information according to their own privacy policies. We are not responsible for the privacy practices of third-party websites or services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
              <p className="text-gray-700 leading-relaxed">
                We may use cookies to enhance user experience and analyze website traffic. You can choose to disable cookies through your browser settings if you prefer.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Consent</h2>
              <p className="text-gray-700 leading-relaxed">
                By using our website, you agree to this Privacy Policy and the collection and use of information as described.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions or concerns about this Privacy Policy, feel free to contact us through our website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
