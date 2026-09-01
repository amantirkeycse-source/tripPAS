import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  UserCheck,
  Cookie,
  Mail,
  Eye,
} from 'lucide-react';

import LegalPageLayout from '../components/legal/LegalPageLayout';

const sections = [
  { id: 'information', title: 'Information We Collect' },
  { id: 'usage', title: 'How We Use Your Information' },
  { id: 'security', title: 'Data Storage & Security' },
  { id: 'sharing', title: 'Data Sharing' },
  { id: 'rights', title: 'Your Rights' },
  { id: 'cookies', title: 'Cookies' },
  { id: 'contact', title: 'Contact Us' },
];

const SectionHeader = ({ number, icon: Icon, title }) => (
  <div className="flex items-center gap-4 mb-4">
    <div className="w-10 h-10 shrink-0 rounded-xl bg-primary-50 flex items-center justify-center">
      <Icon size={19} className="text-primary-500" />
    </div>

    <div className="flex items-center gap-3">
      <span className="text-xs font-semibold text-primary-500">
        {number}
      </span>

      <h2 className="text-xl font-semibold text-dark">
        {title}
      </h2>
    </div>
  </div>
);

const Divider = () => (
  <div className="h-px bg-gray-100" />
);

const Privacy = () => {
  return (
    <LegalPageLayout
      icon={Shield}
      title="Privacy Policy"
      description="How TripPAS collects, uses, and protects your information."
      sections={sections}
    >

      <section id="information" className="scroll-mt-28 pb-9">
        <SectionHeader
          number="01"
          icon={Eye}
          title="Information We Collect"
        />

        <p className="text-muted leading-7">
          When you use TripPAS, we collect information you provide directly,
          including your name, email address, profile photo, trip preferences,
          and saved destinations. We also collect usage data such as pages
          visited and features used to improve our service.
        </p>
      </section>

      <Divider />

      <section id="usage" className="scroll-mt-28 py-9">
        <SectionHeader
          number="02"
          icon={Shield}
          title="How We Use Your Information"
        />

        <p className="text-muted leading-7">
          We use your information to provide personalized travel
          recommendations, save your trip preferences, display your profile,
          and improve our platform. Your data helps us create better budget
          estimates and destination suggestions tailored to your travel style.
        </p>
      </section>

      <Divider />

      <section id="security" className="scroll-mt-28 py-9">
        <SectionHeader
          number="03"
          icon={Lock}
          title="Data Storage & Security"
        />

        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-primary-500 flex items-center justify-center">
              <Lock size={19} className="text-white" />
            </div>

            <p className="text-muted leading-7">
              Your data is stored securely in MongoDB with encryption. We
              implement industry-standard security measures to protect your
              personal information from unauthorized access.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section id="sharing" className="scroll-mt-28 py-9">
        <SectionHeader
          number="04"
          icon={Shield}
          title="Data Sharing"
        />

        <p className="text-muted leading-7">
          We do not sell or share your personal information with third
          parties. Your trip data and profile information are only accessible
          to you. We may share anonymized, aggregated data for analytics
          purposes only.
        </p>
      </section>

      <Divider />

      <section id="rights" className="scroll-mt-28 py-9">
        <SectionHeader
          number="05"
          icon={UserCheck}
          title="Your Rights"
        />

        <div className="rounded-2xl bg-gray-50 border border-gray-100 p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-gray-100 flex items-center justify-center">
              <UserCheck size={19} className="text-primary-500" />
            </div>

            <p className="text-muted leading-7">
              You have the right to access, update, or delete your personal
              data at any time. You can remove your profile photo, delete
              saved trips, or request complete account deletion by contacting
              our support team.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section id="cookies" className="scroll-mt-28 py-9">
        <SectionHeader
          number="06"
          icon={Cookie}
          title="Cookies"
        />

        <p className="text-muted leading-7">
          TripPAS uses essential cookies for authentication and session
          management. We do not use tracking cookies or share cookie data with
          advertisers.
        </p>
      </section>

      <Divider />

      <section id="contact" className="scroll-mt-28 pt-9">
        <SectionHeader
          number="07"
          icon={Mail}
          title="Contact Us"
        />

        <p className="text-muted leading-7">
          For privacy-related inquiries, please contact us at{' '}
          <a
            href="mailto:privacy@trippas.com"
            className="font-medium text-primary-500 hover:underline"
          >
            privacy@trippas.com
          </a>
        </p>
      </section>

    </LegalPageLayout>
  );
};

export default Privacy;