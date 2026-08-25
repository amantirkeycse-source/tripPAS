import { motion } from 'framer-motion';
import { FileText, AlertTriangle, CheckCircle } from 'lucide-react';

const Terms = () => {
  return (
    <div className="min-h-screen bg-surface">
      <div className="container-tp py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center">
              <FileText size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-dark">Terms & Conditions</h1>
              <p className="text-muted text-sm">Last updated: August 2026</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">1. Acceptance of Terms</h2>
              <p className="text-muted leading-relaxed">
                By accessing or using TripPAS, you agree to be bound by these Terms & Conditions. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">2. Service Description</h2>
              <p className="text-muted leading-relaxed">
                TripPAS provides travel planning tools, budget estimates, and destination information 
                for India and Nepal. Our budget estimates are approximate and based on average costs. 
                Actual prices may vary depending on season, availability, and booking time.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle size={20} className="text-amber-500" />
                <h2 className="text-xl font-semibold text-dark">3. Budget Estimates Disclaimer</h2>
              </div>
              <p className="text-muted leading-relaxed">
                All budget estimates provided by TripPAS are approximate and for informational 
                purposes only. We are not responsible for actual travel costs, which may differ 
                significantly based on booking platform, travel dates, and market conditions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">4. User Accounts</h2>
              <p className="text-muted leading-relaxed">
                You are responsible for maintaining the confidentiality of your account credentials. 
                You agree to provide accurate information during registration and keep your profile 
                updated. You are solely responsible for all activities under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">5. User Content</h2>
              <p className="text-muted leading-relaxed">
                When you share experiences, reviews, or other content on TripPAS, you grant us a 
                non-exclusive license to display and distribute that content. You retain ownership 
                of your content and can request its removal at any time.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={20} className="text-green-500" />
                <h2 className="text-xl font-semibold text-dark">6. Acceptable Use</h2>
              </div>
              <ul className="list-disc list-inside text-muted space-y-2 ml-5">
                <li>Do not misuse the platform for illegal activities</li>
                <li>Do not attempt to gain unauthorized access to other accounts</li>
                <li>Do not spam or post misleading information</li>
                <li>Do not scrape or harvest user data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">7. Limitation of Liability</h2>
              <p className="text-muted leading-relaxed">
                TripPAS is provided "as is" without warranties. We are not liable for any damages 
                arising from your use of the platform, including but not limited to travel decisions 
                made based on our estimates or recommendations.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">8. Changes to Terms</h2>
              <p className="text-muted leading-relaxed">
                We reserve the right to update these terms at any time. Continued use of the platform 
                after changes constitutes acceptance of the new terms. We will notify users of 
                significant changes via email.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">9. Contact</h2>
              <p className="text-muted leading-relaxed">
                For questions about these terms, contact us at{' '}
                <a href="mailto:legal@trippas.com" className="text-primary-500 hover:underline">
                  legal@trippas.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;
