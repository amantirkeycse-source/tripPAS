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
    <div className="min-h-screen bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[140px]" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-primary-400/10 rounded-full blur-[120px]" />

      <div className="container-tp relative z-10 py-20 lg:py-28">
        <div className="text-center mb-20">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-primary-500/25">
            <Sparkles size={36} className="text-white" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-display font-bold text-dark mb-5 tracking-tight">
            How It Works
          </h1>
          <p className="text-xl text-muted max-w-2xl mx-auto leading-relaxed">
            From destination to decision in <span className="font-bold text-primary-500">7 simple steps</span>.
          </p>
        </div>

        {/* Journey visualization */}
        <div className="relative max-w-3xl mx-auto mb-24">
          <div className="absolute left-10 top-10 bottom-10 w-1 bg-gradient-to-b from-primary-400 via-primary-500 to-primary-600 hidden md:block rounded-full" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="relative flex items-start gap-7 group"
              >
                <div className="relative z-10 w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shrink-0 shadow-xl shadow-primary-500/30 group-hover:scale-110 transition-transform duration-300">
                  <step.icon size={30} className="text-white" />
                  <span className="absolute -top-2.5 -right-2.5 w-8 h-8 rounded-full bg-accent text-white text-sm font-bold flex items-center justify-center ring-3 ring-white shadow-lg">
                    {index + 1}
                  </span>
                </div>
                <div className="card card-hover p-6 flex-1 relative overflow-hidden group-hover:shadow-xl transition-shadow duration-300">
                  <div className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-600 absolute top-0 left-0 right-0 rounded-t-2xl" />
                  <h3 className="font-display font-bold text-dark text-lg mb-2 mt-1">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How estimates work */}
        <div className="card p-8 md:p-12 mb-20 relative overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-primary-500 to-primary-600 absolute top-0 left-0 right-0" />
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-lg shadow-primary-500/25">
              <Info size={26} className="text-white" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-display font-bold text-dark">How TripPAS estimates costs</h2>
          </div>
          <p className="text-lg text-muted leading-relaxed mb-8">
            TripPAS estimates are based on a combination of factors including:
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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
                className="p-4 rounded-2xl bg-primary-50 border-2 border-primary-100"
              >
                <p className="text-sm font-semibold text-dark">{factor}</p>
              </motion.div>
            ))}
          </div>
          <div className="p-5 rounded-2xl bg-amber-50 border-2 border-amber-200">
            <p className="text-sm text-dark leading-relaxed font-medium">
              <strong>Important:</strong> These are estimates based on typical costs. Actual prices may vary significantly depending on season, availability, booking time, and personal preferences. Always check current prices before booking.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600" />
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-white/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-[100px]" />
          <div className="relative z-10 text-center py-16 px-8">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-4">
              Ready to plan your trip?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
              Start with 7 simple steps and travel with confidence.
            </p>
            <Link to="/plan" className="inline-flex items-center gap-2.5 bg-white text-primary-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl">
              Start Planning Your Trip
              <ArrowRight size={20} />
            </Link>
            <p className="text-sm text-white/60 mt-4">Free to use. No sign-up required to explore.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;