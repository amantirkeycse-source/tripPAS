import { motion } from 'framer-motion';
import { Users, Heart, Flag, MessageCircle } from 'lucide-react';

const CommunityGuidelines = () => {
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
              <Users size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-dark">Community Guidelines</h1>
              <p className="text-muted text-sm">Building a respectful travel community</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-8 space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">Our Mission</h2>
              <p className="text-muted leading-relaxed">
                TripPAS is a community of travelers helping travelers. We're here to share experiences, 
                provide honest recommendations, and make travel planning easier for everyone exploring 
                India and Nepal.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Heart size={20} className="text-pink-500" />
                <h2 className="text-xl font-semibold text-dark">1. Be Respectful</h2>
              </div>
              <ul className="list-disc list-inside text-muted space-y-2 ml-5">
                <li>Treat all community members with kindness and respect</li>
                <li>Celebrate cultural differences and local traditions</li>
                <li>Avoid offensive language, stereotypes, or discriminatory remarks</li>
                <li>Be considerate when giving feedback or suggestions</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <MessageCircle size={20} className="text-blue-500" />
                <h2 className="text-xl font-semibold text-dark">2. Share Honest Experiences</h2>
              </div>
              <ul className="list-disc list-inside text-muted space-y-2 ml-5">
                <li>Provide genuine reviews based on personal experiences</li>
                <li>Be accurate when sharing costs, timings, and recommendations</li>
                <li>Include helpful tips that benefit other travelers</li>
                <li>Share both positive and constructive feedback</li>
              </ul>
            </section>

            <section>
              <div className="flex items-center gap-2 mb-3">
                <Flag size={20} className="text-amber-500" />
                <h2 className="text-xl font-semibold text-dark">3. No Spam or Misinformation</h2>
              </div>
              <ul className="list-disc list-inside text-muted space-y-2 ml-5">
                <li>Do not post promotional content or advertisements</li>
                <li>Do not spread false information about destinations</li>
                <li>Do not create multiple accounts for manipulation</li>
                <li>Do not impersonate other users or businesses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">4. Respect Local Communities</h2>
              <p className="text-muted leading-relaxed">
                When sharing travel experiences, be mindful of local communities. Respect sacred sites, 
                follow local customs, and promote responsible tourism. Do not encourage behavior that 
                could harm local environments or cultures.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">5. Safety First</h2>
              <p className="text-muted leading-relaxed">
                Do not share information that could compromise traveler safety, such as unsafe routes, 
                illegal activities, or locations known for scams. If you encounter safety concerns, 
                report them immediately.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">6. Reporting Violations</h2>
              <p className="text-muted leading-relaxed">
                If you encounter content that violates these guidelines, please report it using the 
                report feature or contact us at{' '}
                <a href="mailto:support@trippas.com" className="text-primary-500 hover:underline">
                  support@trippas.com
                </a>
                . We review all reports and take appropriate action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark mb-3">7. Enforcement</h2>
              <p className="text-muted leading-relaxed">
                Violations may result in content removal, temporary suspension, or permanent account 
                termination. We reserve the right to take action without prior notice for severe 
                violations.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CommunityGuidelines;
