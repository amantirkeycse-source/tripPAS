import { motion } from 'framer-motion';
import { Shield, Lock, Eye, UserCheck } from 'lucide-react';

const Privacy = () => {
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
              <Shield size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-dark">Privacy Policy</h1>
              <p className="text-muted text-sm">Last updated: August 2026</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">1. Information We Collect</h2>
              <p className="text-muted leading-relaxed">
                When you use TripPAS, we collect information you provide directly, including your name, 
                email address, profile photo, trip preferences, and saved destinations. We also collect 
                usage data such as pages visited and features used to improve our service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">2. How We Use Your Information</h2>
              <p className="text-muted leading-relaxed">
                We use your information to provide personalized travel recommendations, save your trip 
                preferences, display your profile, and improve our platform. Your data helps us create 
                better budget estimates and destination suggestions tailored to your travel style.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">3. Data Storage & Security</h2>
              <div className="flex items-start gap-3 mb-3">
                <Lock size={20} className="text-primary-500 mt-1" />
                <p className="text-muted leading-relaxed">
                  Your data is stored securely in MongoDB with encryption. We implement industry-standard 
                  security measures to protect your personal information from unauthorized access.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">4. Data Sharing</h2>
              <p className="text-muted leading-relaxed">
                We do not sell or share your personal information with third parties. Your trip data and 
                profile information are only accessible to you. We may share anonymized, aggregated data 
                for analytics purposes only.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">5. Your Rights</h2>
              <div className="flex items-start gap-3 mb-3">
                <UserCheck size={20} className="text-primary-500 mt-1" />
                <p className="text-muted leading-relaxed">
                  You have the right to access, update, or delete your personal data at any time. 
                  You can remove your profile photo, delete saved trips, or request complete account 
                  deletion by contacting our support team.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">6. Cookies</h2>
              <p className="text-muted leading-relaxed">
                TripPAS uses essential cookies for authentication and session management. We do not 
                use tracking cookies or share cookie data with advertisers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">7. Contact Us</h2>
              <p className="text-muted leading-relaxed">
                For privacy-related inquiries, please contact us at{' '}
                <a href="mailto:privacy@trippas.com" className="text-primary-500 hover:underline">
                  privacy@trippas.com
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Privacy;
