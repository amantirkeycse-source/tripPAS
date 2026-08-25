import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, ClipboardList, Calculator, SlidersHorizontal, Sparkles, Users, CheckCircle2, ArrowRight, Info } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    { icon: MapPin, title: 'Choose destination', desc: 'Browse our curated list of destinations across India and Nepal.' },
    { icon: ClipboardList, title: 'Enter trip details', desc: 'Tell us your starting city, travelers, duration, and travel month.' },
    { icon: Calculator, title: 'Calculate minimum budget', desc: 'Get a realistic minimum budget estimate for your trip.' },
    { icon: SlidersHorizontal, title: 'Adjust your budget', desc: 'Use the interactive slider to explore different budget levels.' },
    { icon: Sparkles, title: 'Discover what extra money unlocks', desc: 'See exactly what better accommodation, transport, and activities you get.' },
    { icon: Users, title: 'Read real traveler experiences', desc: 'Learn from people who have actually been there.' },
    { icon: CheckCircle2, title: 'Build your trip', desc: 'Plan with confidence knowing exactly what your budget gets you.' }
  ];

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="container-tp">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-display font-bold text-dark mb-4">How It Works</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            From destination to decision in 7 simple steps.
          </p>
        </div>

        {/* Journey visualization */}
        <div className="relative max-w-3xl mx-auto mb-16">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200 hidden md:block" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex items-start gap-6"
              >
                <div className="relative z-10 w-16 h-16 rounded-2xl bg-primary-500 flex items-center justify-center shrink-0 shadow-card">
                  <step.icon size={28} className="text-white" />
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-white text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <div className="card p-6 flex-1">
                  <h3 className="font-display font-semibold text-dark text-lg mb-2">{step.title}</h3>
                  <p className="text-sm text-muted">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How estimates work */}
        <div className="card p-8 mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center">
              <Info size={24} className="text-primary-500" />
            </div>
            <h2 className="text-2xl font-display font-bold text-dark">How TripPAS estimates costs</h2>
          </div>
          <p className="text-text leading-relaxed mb-6">
            TripPAS estimates are based on a combination of factors including:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[
              'Destination and its typical price level',
              'Trip duration and number of nights',
              'Number of travelers (adults and children)',
              'Travel style (budget, comfort, premium, luxury)',
              'Transportation preferences',
              'Seasonal price variations'
            ].map((factor, index) => (
              <motion.div
                key={factor}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="p-4 rounded-xl bg-gray-50"
              >
                <p className="text-sm font-medium text-text">{factor}</p>
              </motion.div>
            ))}
          </div>
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <p className="text-sm text-text">
              <strong>Important:</strong> These are estimates based on typical costs. Actual prices may vary significantly depending on season, availability, booking time, and personal preferences. Always check current prices before booking.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/plan" className="btn-primary text-lg px-10 py-4">
            Start Planning Your Trip
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;