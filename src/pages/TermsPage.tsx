import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <FileText className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
            <p className="text-xl text-blue-100">Last updated: January 2024</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing or using EzzCode's services, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Program Enrollment</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                When you enroll in any EzzCode program:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>You must provide accurate and complete information during registration</li>
                <li>You are responsible for maintaining the confidentiality of your account</li>
                <li>You must meet the eligibility requirements specified for each program</li>
                <li>You agree to actively participate in the program activities</li>
                <li>You understand that program completion depends on meeting specified requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Payment and Refunds</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                Our payment and refund policy includes:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>All program fees must be paid in full before starting the program</li>
                <li>Refund requests must be made within 7 days of enrollment</li>
                <li>No refunds will be provided after program commencement</li>
                <li>Payment plans may be available for eligible students</li>
                <li>Fees are subject to change with prior notice</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Intellectual Property</h2>
              <p className="text-gray-700 leading-relaxed">
                All course materials, content, and resources provided by EzzCode are protected by copyright and other intellectual property laws. Students may use these materials solely for personal learning purposes and may not reproduce, distribute, or create derivative works without written permission.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Code of Conduct</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                All students must adhere to our code of conduct:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>Treat instructors, mentors, and fellow students with respect</li>
                <li>Submit original work and properly attribute sources</li>
                <li>Maintain professional communication in all interactions</li>
                <li>Protect confidential information shared during the program</li>
                <li>Report any violations of the code of conduct</li>
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Certificates</h2>
              <p className="text-gray-700 leading-relaxed">
                Certificates of completion are issued to students who successfully meet all program requirements. Certificates include unique verification IDs and may be verified through our website. EzzCode reserves the right to revoke certificates if fraud or misconduct is discovered.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Program Changes</h2>
              <p className="text-gray-700 leading-relaxed">
                EzzCode reserves the right to modify, suspend, or discontinue any program at any time. We will make reasonable efforts to notify enrolled students of significant changes. In the event of program cancellation, enrolled students will receive a full refund.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                EzzCode provides training and education services but does not guarantee employment or specific career outcomes. While we strive for excellence in our programs, we are not liable for any indirect, incidental, or consequential damages arising from your use of our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your use of EzzCode's services is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                EzzCode reserves the right to terminate or suspend access to our services immediately, without prior notice, for conduct that violates these Terms or is harmful to other users, us, or third parties, or for any other reason at our sole discretion.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms on this page and updating the "Last updated" date. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us via our website.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
