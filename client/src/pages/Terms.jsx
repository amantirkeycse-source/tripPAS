import {
  FileText,
  AlertTriangle,
  CheckCircle,
  User,
  MessageSquare,
  Scale,
  RefreshCw,
  Mail,
} from 'lucide-react';

import LegalPageLayout from '../components/legal/LegalPageLayout';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms' },
  { id: 'service', title: 'Service Description' },
  { id: 'disclaimer', title: 'Budget Estimates Disclaimer' },
  { id: 'accounts', title: 'User Accounts' },
  { id: 'content', title: 'User Content' },
  { id: 'acceptable', title: 'Acceptable Use' },
  { id: 'liability', title: 'Limitation of Liability' },
  { id: 'changes', title: 'Changes to Terms' },
  { id: 'contact', title: 'Contact' },
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

const Terms = () => {
  return (
    <LegalPageLayout
      icon={FileText}
      title="Terms & Conditions"
      description="The rules and conditions for using TripPAS."
      sections={sections}
    >

      <section id="acceptance" className="scroll-mt-28 pb-9">
        <SectionHeader
          number="01"
          icon={CheckCircle}
          title="Acceptance of Terms"
        />

        <p className="text-muted leading-7">
          By accessing or using TripPAS, you agree to be bound by these Terms
          & Conditions. If you do not agree to these terms, please do not use
          our platform.
        </p>
      </section>

      <Divider />

      <section id="service" className="scroll-mt-28 py-9">
        <SectionHeader
          number="02"
          icon={FileText}
          title="Service Description"
        />

        <p className="text-muted leading-7">
          TripPAS provides travel planning tools, budget estimates, and
          destination information for India and Nepal. Our budget estimates
          are approximate and based on average costs. Actual prices may vary
          depending on season, availability, and booking time.
        </p>
      </section>

      <Divider />

      <section id="disclaimer" className="scroll-mt-28 py-9">
        <SectionHeader
          number="03"
          icon={AlertTriangle}
          title="Budget Estimates Disclaimer"
        />

        <div className="rounded-2xl border border-amber-100 bg-amber-50 p-5">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 shrink-0 rounded-xl bg-amber-500 flex items-center justify-center">
              <AlertTriangle size={19} className="text-white" />
            </div>

            <p className="text-muted leading-7">
              All budget estimates provided by TripPAS are approximate and
              for informational purposes only. We are not responsible for
              actual travel costs, which may differ significantly based on
              booking platform, travel dates, and market conditions.
            </p>
          </div>
        </div>
      </section>

      <Divider />

      <section id="accounts" className="scroll-mt-28 py-9">
        <SectionHeader
          number="04"
          icon={User}
          title="User Accounts"
        />

        <p className="text-muted leading-7">
          You are responsible for maintaining the confidentiality of your
          account credentials. You agree to provide accurate information
          during registration and keep your profile updated. You are solely
          responsible for all activities under your account.
        </p>
      </section>

      <Divider />

      <section id="content" className="scroll-mt-28 py-9">
        <SectionHeader
          number="05"
          icon={MessageSquare}
          title="User Content"
        />

        <p className="text-muted leading-7">
          When you share experiences, reviews, or other content on TripPAS,
          you grant us a non-exclusive license to display and distribute that
          content. You retain ownership of your content and can request its
          removal at any time.
        </p>
      </section>

      <Divider />

      <section id="acceptable" className="scroll-mt-28 py-9">
        <SectionHeader
          number="06"
          icon={CheckCircle}
          title="Acceptable Use"
        />

        <div className="grid gap-3">
          {[
            'Do not misuse the platform for illegal activities',
            'Do not attempt to gain unauthorized access to other accounts',
            'Do not spam or post misleading information',
            'Do not scrape or harvest user data',
          ].map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4"
            >
              <CheckCircle
                size={18}
                className="mt-0.5 shrink-0 text-green-500"
              />

              <span className="text-sm leading-6 text-muted">
                {item}
              </span>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      <section id="liability" className="scroll-mt-28 py-9">
        <SectionHeader
          number="07"
          icon={Scale}
          title="Limitation of Liability"
        />

        <p className="text-muted leading-7">
          TripPAS is provided "as is" without warranties. We are not liable
          for any damages arising from your use of the platform, including but
          not limited to travel decisions made based on our estimates or
          recommendations.
        </p>
      </section>

      <Divider />

      <section id="changes" className="scroll-mt-28 py-9">
        <SectionHeader
          number="08"
          icon={RefreshCw}
          title="Changes to Terms"
        />

        <p className="text-muted leading-7">
          We reserve the right to update these terms at any time. Continued
          use of the platform after changes constitutes acceptance of the new
          terms. We will notify users of significant changes via email.
        </p>
      </section>

      <Divider />

      <section id="contact" className="scroll-mt-28 pt-9">
        <SectionHeader
          number="09"
          icon={Mail}
          title="Contact"
        />

        <p className="text-muted leading-7">
          For questions about these terms, contact us at{' '}
          <a
            href="mailto:legal@trippas.com"
            className="font-medium text-primary-500 hover:underline"
          >
            legal@trippas.com
          </a>
        </p>
      </section>

    </LegalPageLayout>
  );
};

export default Terms;