import {
  Users,
  Heart,
  Flag,
  MessageCircle,
  Globe,
  ShieldCheck,
  AlertCircle,
} from 'lucide-react';

import LegalPageLayout from '../components/legal/LegalPageLayout';

const sections = [
  { id: 'mission', title: 'Our Mission' },
  { id: 'respect', title: 'Be Respectful' },
  { id: 'honest', title: 'Share Honest Experiences' },
  { id: 'spam', title: 'No Spam or Misinformation' },
  { id: 'local', title: 'Respect Local Communities' },
  { id: 'safety', title: 'Safety First' },
  { id: 'reporting', title: 'Reporting Violations' },
  { id: 'enforcement', title: 'Enforcement' },
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

const RuleList = ({ items }) => (
  <div className="grid gap-3">
    {items.map((item) => (
      <div
        key={item}
        className="flex items-start gap-3 rounded-xl bg-gray-50 border border-gray-100 p-4"
      >
        <div className="w-2 h-2 mt-2 rounded-full bg-primary-500 shrink-0" />

        <span className="text-sm leading-6 text-muted">
          {item}
        </span>
      </div>
    ))}
  </div>
);

const CommunityGuidelines = () => {
  return (
    <LegalPageLayout
      icon={Users}
      title="Community Guidelines"
      description="Building a respectful travel community."
      sections={sections}
    >

      <section id="mission" className="scroll-mt-28 pb-9">
        <SectionHeader
          number="00"
          icon={Users}
          title="Our Mission"
        />

        <p className="text-muted leading-7">
          TripPAS is a community of travelers helping travelers. We're here
          to share experiences, provide honest recommendations, and make
          travel planning easier for everyone exploring India and Nepal.
        </p>
      </section>

      <Divider />

      <section id="respect" className="scroll-mt-28 py-9">
        <SectionHeader
          number="01"
          icon={Heart}
          title="Be Respectful"
        />

        <RuleList
          items={[
            'Treat all community members with kindness and respect',
            'Celebrate cultural differences and local traditions',
            'Avoid offensive language, stereotypes, or discriminatory remarks',
            'Be considerate when giving feedback or suggestions',
          ]}
        />
      </section>

      <Divider />

      <section id="honest" className="scroll-mt-28 py-9">
        <SectionHeader
          number="02"
          icon={MessageCircle}
          title="Share Honest Experiences"
        />

        <RuleList
          items={[
            'Provide genuine reviews based on personal experiences',
            'Be accurate when sharing costs, timings, and recommendations',
            'Include helpful tips that benefit other travelers',
            'Share both positive and constructive feedback',
          ]}
        />
      </section>

      <Divider />

      <section id="spam" className="scroll-mt-28 py-9">
        <SectionHeader
          number="03"
          icon={Flag}
          title="No Spam or Misinformation"
        />

        <RuleList
          items={[
            'Do not post promotional content or advertisements',
            'Do not spread false information about destinations',
            'Do not create multiple accounts for manipulation',
            'Do not impersonate other users or businesses',
          ]}
        />
      </section>

      <Divider />

      <section id="local" className="scroll-mt-28 py-9">
        <SectionHeader
          number="04"
          icon={Globe}
          title="Respect Local Communities"
        />

        <p className="text-muted leading-7">
          When sharing travel experiences, be mindful of local communities.
          Respect sacred sites, follow local customs, and promote responsible
          tourism. Do not encourage behavior that could harm local
          environments or cultures.
        </p>
      </section>

      <Divider />

      <section id="safety" className="scroll-mt-28 py-9">
        <SectionHeader
          number="05"
          icon={ShieldCheck}
          title="Safety First"
        />

        <div className="rounded-2xl bg-primary-50 border border-primary-100 p-5">
          <p className="text-muted leading-7">
            Do not share information that could compromise traveler safety,
            such as unsafe routes, illegal activities, or locations known for
            scams. If you encounter safety concerns, report them immediately.
          </p>
        </div>
      </section>

      <Divider />

      <section id="reporting" className="scroll-mt-28 py-9">
        <SectionHeader
          number="06"
          icon={Flag}
          title="Reporting Violations"
        />

        <p className="text-muted leading-7">
          If you encounter content that violates these guidelines, please
          report it using the report feature or contact us at{' '}
          <a
            href="mailto:support@trippas.com"
            className="font-medium text-primary-500 hover:underline"
          >
            support@trippas.com
          </a>
          . We review all reports and take appropriate action.
        </p>
      </section>

      <Divider />

      <section id="enforcement" className="scroll-mt-28 pt-9">
        <SectionHeader
          number="07"
          icon={AlertCircle}
          title="Enforcement"
        />

        <p className="text-muted leading-7">
          Violations may result in content removal, temporary suspension, or
          permanent account termination. We reserve the right to take action
          without prior notice for severe violations.
        </p>
      </section>

    </LegalPageLayout>
  );
};

export default CommunityGuidelines;