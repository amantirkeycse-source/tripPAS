import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, MapPin, Users, Sparkles, TrendingDown, ArrowUpRight, Scale, ChevronDown, Star, Zap, Globe } from 'lucide-react';
import { getDestinations, getExperiences } from '../services/api';
import DestinationCard from '../components/DestinationCard';
import ExperienceCard from '../components/ExperienceCard';
import BudgetSlider from '../components/BudgetSlider';
import { formatINR } from '../utils/format';
import { AnimatedCounter, StaggerChildren } from '../components/animations';

const Home = () => {
  const [destinations, setDestinations] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [destRes, expRes] = await Promise.all([getDestinations(), getExperiences()]);
        if (destRes.success) setDestinations(destRes.destinations || []);
        if (expRes.success) setExperiences(expRes.experiences || []);
      } catch (error) {
        console.error('Failed to load home data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredIds = ['manali', 'goa', 'kashmir', 'jaipur', 'rishikesh', 'darjeeling', 'kathmandu', 'pokhara', 'lumbini'];
  const featuredDestinations = featuredIds.map(id => destinations.find(d => d.id === id)).filter(Boolean);

  const [homeBudget, setHomeBudget] = useState(15000);
  const homeMinBudget = 12500;
  const homeMaxBudget = 40000;
  const featuredExperiences = experiences.slice(0, 3);

  const budgetFeatures = [
    { min: 12500, accommodation: 'Basic homestay / hostel', activities: '2 essential activities', level: 'Budget' },
    { min: 20000, accommodation: '3★ hotel / good homestay', activities: '4 activities incl. adventure', level: 'Comfort' },
    { min: 30000, accommodation: '4★ resort / boutique stay', activities: '6+ activities & experiences', level: 'Premium' }
  ];
  const currentFeature = budgetFeatures.filter(f => homeBudget >= f.min).pop() || budgetFeatures[0];

  const whyCards = [
    { icon: TrendingDown, title: 'Know your minimum', desc: 'Get a realistic minimum budget before you book anything.', color: 'from-primary-500 to-primary-600' },
    { icon: Scale, title: 'Compare budgets', desc: 'See what each tier unlocks — from basic to luxury.', color: 'from-blue-500 to-blue-600' },
    { icon: Compass, title: 'Discover offbeat places', desc: 'Find hidden gems suggested by real travelers.', color: 'from-violet-500 to-violet-600' },
    { icon: Users, title: 'Learn from travelers', desc: 'Real stories, real budgets, real advice.', color: 'from-rose-500 to-rose-600' },
    { icon: Zap, title: 'Plan smarter', desc: 'Build trips knowing exactly what you\'ll spend.', color: 'from-amber-500 to-amber-600' }
  ];

  const stats = [
    { value: 27, label: 'Destinations', suffix: '+' },
    { value: 50, label: 'Experiences', suffix: '+' },
    { value: 1000, label: 'Happy Travelers', suffix: '+' },
    { value: 4.8, label: 'Average Rating', suffix: '/5', decimals: 1 }
  ];

  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dark">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-white/10 border-t-primary-400 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/60 text-sm font-medium">Loading your next adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ========== HERO ========== */}
      <section ref={heroRef} className="relative min-h-[100vh] flex items-center overflow-hidden bg-dark">
        {/* Background Grid with parallax + scale */}
        <motion.div
          className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0 opacity-60"
          style={{ y: heroY, scale: heroScale }}
        >
          {[
            'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=600&q=80',
            'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80',
            'https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80',
            'https://images.unsplash.com/photo-1545486332-9e59a7e4f9bd?w=600&q=80',
            'https://images.unsplash.com/photo-1527596433154-e9e1e1ef800d?w=600&q=80',
            'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80',
          ].map((src, i) => (
            <img key={i} src={src} alt="" className="w-full h-full object-cover" aria-hidden="true" />
          ))}
        </motion.div>

        {/* Gradient Overlays - Multiple layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/85 to-dark/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark/30" />

        {/* Decorative glow */}
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/8 rounded-full blur-[100px]" />

        <div className="relative container-tp py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <motion.div style={{ opacity: heroOpacity }}>
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-white/80 text-sm font-medium mb-8">
                  <span className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
                  Smart budget travel planning
                </div>
              </motion.div>

              <motion.h1
                className="text-5xl sm:text-6xl lg:text-[4.5rem] font-display font-bold text-white leading-[1.05] mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
              >
                Travel more.
                <br />
                <span className="bg-gradient-to-r from-primary-400 via-primary-300 to-accent bg-clip-text text-transparent">
                  Spend smarter.
                </span>
              </motion.h1>

              <motion.p
                className="text-xl text-white/60 mb-10 max-w-xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
              >
                Discover the real cost of your next trip and see exactly what you unlock at every budget level.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <Link to="/plan" className="btn-accent px-8 py-4 text-base">
                  Plan My Trip
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/explore"
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-bold text-base rounded-2xl border border-white/15 hover:bg-white/20 hover:border-white/25 transition-all duration-200"
                >
                  Explore Destinations
                </Link>
              </motion.div>

              {/* Trust badges */}
              <motion.div
                className="flex items-center gap-6 mt-10 pt-8 border-t border-white/10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <Globe size={16} className="text-primary-400" />
                  <span>27+ Destinations</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <Star size={16} className="text-amber-400 fill-amber-400" />
                  <span>4.8 Rating</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-white/20" />
                <div className="flex items-center gap-2 text-white/40 text-sm">
                  <Users size={16} className="text-primary-400" />
                  <span>1000+ Travelers</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Card */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.33, 1, 0.68, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/20 to-amber-500/10 rounded-3xl blur-2xl" />

                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/15">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-white font-display font-bold text-xl">Manali</h3>
                      <p className="text-white/50 text-sm flex items-center gap-1.5 mt-1">
                        <MapPin size={14} className="text-primary-400" /> Himachal Pradesh, India
                      </p>
                    </div>
                    <span className="badge bg-primary-500/20 text-primary-300 border border-primary-400/20">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      Popular
                    </span>
                  </div>
                  <div className="border-t border-white/10 pt-5 mb-6">
                    <p className="text-white/40 text-xs uppercase tracking-wider mb-2 font-medium">Estimated minimum budget</p>
                    <p className="text-4xl font-display font-bold text-white">{formatINR(12500)}</p>
                    <p className="text-white/35 text-sm mt-1.5">for 2 travelers · 3 days / 2 nights</p>
                  </div>
                  <Link to="/plan" className="btn-primary w-full py-3.5 text-sm">
                    Analyze This Trip
                    <ArrowUpRight size={18} />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center text-white/30"
            >
              <span className="text-[11px] mb-2 tracking-[0.2em] uppercase font-medium">Scroll to explore</span>
              <ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ========== STATS ========== */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container-tp">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl lg:text-5xl font-display font-bold text-primary-500 mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </div>
                <p className="text-sm text-gray-500 font-semibold tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== BUDGET TIERS ========== */}
      <section className="py-24 bg-white">
        <div className="container-tp">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge-primary mb-4 inline-flex">Budget Intelligence</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-dark mb-4">
              Know your minimum.
              <br className="hidden sm:block" />
              Choose your experience.
            </h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              The same destination feels completely different at different budgets.
            </p>
          </motion.div>

          <StaggerChildren staggerDelay={0.12} className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { price: 12500, name: 'Budget', desc: 'Hostels, public transport, local food', accent: 'from-primary-500 to-primary-600', ring: 'ring-primary-200' },
              { price: 18500, name: 'Comfort', desc: '3★ hotels, better dining, more activities', accent: 'from-primary-400 to-primary-500', ring: 'ring-primary-100' },
              { price: 27000, name: 'Premium', desc: '4★ resorts, private transport, all experiences', accent: 'from-amber-500 to-amber-400', ring: 'ring-amber-200' }
            ].map((tier) => (
              <motion.div
                key={tier.name}
                className="card p-8 text-center group relative overflow-hidden"
                whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.12)' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${tier.accent}`} />
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tier.accent} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                  <span className="text-2xl">{tier.name === 'Budget' ? '🎒' : tier.name === 'Comfort' ? '🏨' : '✨'}</span>
                </div>
                <p className="text-4xl font-display font-bold text-dark mb-2">{formatINR(tier.price)}</p>
                <h3 className="font-display font-bold text-xl text-dark mb-3">{tier.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{tier.desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ========== DESTINATIONS ========== */}
      <section className="py-24">
        <div className="container-tp">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge-primary mb-4 inline-flex">Explore India & Nepal</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-dark mb-4">Where do you want to go?</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Curated destinations with realistic budget estimates.</p>
          </motion.div>

          <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest, index) => (
              <DestinationCard key={dest.id} destination={dest} index={index} />
            ))}
          </StaggerChildren>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/explore" className="btn-primary px-8 py-3.5">
              Explore All Destinations <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== BUDGET SLIDER ========== */}
      <section className="py-24 bg-white">
        <div className="container-tp max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="badge-accent mb-4 inline-flex">Interactive Tool</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-dark mb-4">What does your budget get you?</h2>
            <p className="text-lg text-gray-500">Slide to see how your experience changes.</p>
          </motion.div>

          <div className="card p-8 lg:p-10 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-amber-400" />
            <BudgetSlider value={homeBudget} min={homeMinBudget} max={homeMaxBudget} onChange={setHomeBudget} label="Your trip budget" />

            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.level}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="mt-8 grid sm:grid-cols-3 gap-4"
              >
                <div className="p-5 rounded-2xl bg-primary-50 border border-primary-100">
                  <p className="text-xs font-bold text-primary-600 uppercase tracking-wider mb-1.5">Tier</p>
                  <p className="font-bold text-dark text-lg">{currentFeature.level}</p>
                </div>
                <div className="p-5 rounded-2xl bg-primary-50/50 border border-primary-100/50">
                  <p className="text-xs font-bold text-primary-500 uppercase tracking-wider mb-1.5">Stay</p>
                  <p className="text-sm font-semibold text-gray-700">{currentFeature.accommodation}</p>
                </div>
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-100">
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1.5">Activities</p>
                  <p className="text-sm font-semibold text-gray-700">{currentFeature.activities}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ========== EXPERIENCES ========== */}
      <section className="py-24">
        <div className="container-tp">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge-primary mb-4 inline-flex">Community</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-dark mb-4">Real experiences, real budgets</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">Honest stories from travelers who've been there.</p>
          </motion.div>

          <StaggerChildren staggerDelay={0.1} className="grid lg:grid-cols-3 gap-6">
            {featuredExperiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </StaggerChildren>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link to="/experiences" className="btn-primary px-8 py-3.5">
              Explore Experiences <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ========== WHY TRIPPAS ========== */}
      <section className="py-24 bg-dark text-white relative overflow-hidden">
        {/* Decorative glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]" />

        <div className="container-tp relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="badge bg-white/10 text-primary-300 border border-white/10 mb-4 inline-flex">Why TripPAS</span>
            <h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-4">Budget intelligence for smarter travel.</h2>
            <p className="text-lg text-white/40 max-w-2xl mx-auto">Everything you need to plan trips with confidence.</p>
          </motion.div>

          <StaggerChildren staggerDelay={0.08} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {whyCards.map((card) => (
              <motion.div
                key={card.title}
                className="bg-white/5 backdrop-blur rounded-3xl p-6 border border-white/5 group hover:border-white/10"
                whileHover={{ backgroundColor: 'rgba(255,255,255,0.08)', y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 shadow-lg`}>
                  <card.icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-sm text-white mb-2">{card.title}</h3>
                <p className="text-xs text-white/40 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* ========== CTA ========== */}
      <section className="py-24">
        <div className="container-tp">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 p-12 lg:p-20 text-center"
          >
            {/* Background effects */}
            <div className="absolute inset-0 opacity-10">
              <img
                src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1200&q=80"
                alt=""
                className="w-full h-full object-cover"
                aria-hidden="true"
              />
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />

            <div className="relative">
              <motion.h2
                className="text-3xl lg:text-5xl font-display font-bold text-white mb-6 max-w-3xl mx-auto leading-tight"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                Your next trip starts with knowing what it really costs.
              </motion.h2>
              <Link to="/plan" className="btn-accent text-base px-10 py-4 mt-4">
                Analyze My Trip <ArrowRight size={20} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
