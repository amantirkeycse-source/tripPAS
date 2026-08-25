import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, Compass, MapPin, Users, Sparkles, TrendingDown, ArrowUpRight, Scale, ChevronDown } from 'lucide-react';
import destinations from '../data/destinations';
import experiences from '../data/experiences';
import DestinationCard from '../components/DestinationCard';
import ExperienceCard from '../components/ExperienceCard';
import BudgetSlider from '../components/BudgetSlider';
import { formatINR } from '../utils/format';
import { Parallax, MagneticHover, TextReveal, AnimatedCounter, StaggerChildren } from '../components/animations';

const Home = () => {
  const featuredDestinationIds = ['manali', 'goa', 'kashmir', 'jaipur', 'rishikesh', 'darjeeling', 'kathmandu', 'pokhara', 'lumbini'];
  const featuredDestinations = featuredDestinationIds.map(id => destinations.find(d => d.id === id)).filter(Boolean);

  const [homeBudget, setHomeBudget] = useState(15000);
  const homeMinBudget = 12500;
  const homeMaxBudget = 40000;
  const featuredExperiences = experiences.slice(0, 3);

  const budgetFeatures = [
    { min: 12500, accommodation: 'Basic homestay / hostel', activities: '2 essential activities', level: 'Basic' },
    { min: 20000, accommodation: '3★ hotel / good homestay', activities: '4 activities incl. adventure', level: 'Comfort' },
    { min: 30000, accommodation: '4★ resort / boutique stay', activities: '6+ activities & experiences', level: 'Premium' }
  ];
  const currentFeature = budgetFeatures.filter(f => homeBudget >= f.min).pop() || budgetFeatures[0];

  const whyCards = [
    { icon: TrendingDown, title: 'Know your minimum', desc: 'Get a realistic minimum budget for every destination before you plan.' },
    { icon: Scale, title: 'Compare budgets', desc: 'See exactly what each budget tier unlocks - from basic stays to luxury.' },
    { icon: Compass, title: 'Discover hidden experiences', desc: 'Find offbeat destinations and local gems suggested by real travelers.' },
    { icon: Users, title: 'Learn from travelers', desc: 'Read genuine experiences that save you money and time.' },
    { icon: Sparkles, title: 'Plan smarter', desc: 'Build trips with confidence knowing exactly what you will spend.' }
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

  return (
    <div>
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-dark" style={{ backgroundColor: '#102A43' }}>
        <motion.div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-1 opacity-85" style={{ y: heroY }}>
          <img src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=600&q=80" alt="Manali" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&q=80" alt="Goa" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1598091383021-15ddea10925d?w=600&q=80" alt="Kashmir" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1545486332-9e59a7e4f9bd?w=600&q=80" alt="Pokhara" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1527596433154-e9e1e1ef800d?w=600&q=80" alt="Kathmandu" className="w-full h-full object-cover" />
          <img src="https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&q=80" alt="Jaipur" className="w-full h-full object-cover" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark/95 via-dark/75 to-dark/30" />
        <div className="relative container-tp py-20 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div style={{ opacity: heroOpacity }}>
              <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}>
                <div className="inline-flex items-center gap-2 badge bg-white/10 text-white backdrop-blur mb-6">
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}><Compass size={16} /></motion.div>
                  Fresh, budget-friendly travel
                </div>
              </motion.div>
              <div className="mb-6">
                <motion.h1 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
                  <TextReveal delay={0.3}>Travel more.</TextReveal><br />
                  <TextReveal delay={0.5} className="text-accent">Spend smarter.</TextReveal>
                </motion.h1>
              </div>
              <motion.p className="text-lg lg:text-xl text-white/80 mb-8 max-w-xl" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}>
                Discover the minimum budget you need for your next trip and see exactly what you unlock when you spend a little more.
              </motion.p>
              <motion.div className="flex flex-wrap gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.6 }}>
                <MagneticHover strength={0.2}><Link to="/plan" className="btn-accent text-base px-8 py-4">Plan My Trip <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={20} /></motion.span></Link></MagneticHover>
                <MagneticHover strength={0.2}><Link to="/explore" className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur text-white font-semibold rounded-xl hover:bg-white/20 transition-all">Explore Destinations</Link></MagneticHover>
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.33, 1, 0.68, 1] }} className="hidden lg:block">
              <MagneticHover strength={0.1}>
                <motion.div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 shadow-2xl border border-white/20 max-w-md ml-auto" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <div className="flex items-center justify-between mb-6">
                    <div><h3 className="text-white font-display font-semibold text-xl">Manali</h3><p className="text-white/60 text-sm flex items-center gap-1"><MapPin size={14} />Himachal Pradesh, India</p></div>
                    <motion.span className="badge bg-white/20 text-white" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>Popular</motion.span>
                  </div>
                  <div className="border-t border-white/20 pt-4 mb-6">
                    <p className="text-white/60 text-sm mb-1">Estimated minimum</p>
                    <motion.p className="text-4xl font-display font-bold text-white" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}>{formatINR(12500)}</motion.p>
                  </div>
                  <MagneticHover strength={0.15}><Link to="/plan" className="btn-primary w-full">Analyze Trip <ArrowUpRight size={18} /></Link></MagneticHover>
                </motion.div>
              </MagneticHover>
            </motion.div>
          </div>
          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="flex flex-col items-center text-white/50">
              <span className="text-xs mb-2">Scroll to explore</span><ChevronDown size={20} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white relative overflow-hidden">
        <div className="container-tp relative">
          <StaggerChildren staggerDelay={0.15} className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <motion.div key={stat.label} className="text-center" whileHover={{ scale: 1.05 }}>
                <motion.div className="text-4xl lg:text-5xl font-display font-bold text-primary-500 mb-2" initial={{ opacity: 0, scale: 0.5 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 200 }}>
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} decimals={stat.decimals || 0} />
                </motion.div>
                <p className="text-muted font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Budget Tiers */}
      <section className="py-20 bg-white">
        <div className="container-tp">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-dark mb-4">Know your minimum. Choose your experience.</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">The same destination feels completely different at different budgets.</p>
          </motion.div>
          <StaggerChildren staggerDelay={0.15} className="grid md:grid-cols-3 gap-8">
            {[{ price: 12500, name: 'Budget', color: 'bg-primary-500', desc: 'Basic homestay, public transport', icon: '🎒' }, { price: 18500, name: 'Comfort', color: 'bg-secondary', desc: '3★ hotel, better food', icon: '🏨' }, { price: 27000, name: 'Premium', color: 'bg-accent', desc: '4★ resort, private transport', icon: '✨' }].map((tier) => (
              <MagneticHover key={tier.name} strength={0.1}>
                <motion.div className="card p-8 text-center relative overflow-hidden" whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15)' }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <motion.div className="text-4xl mb-4" animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>{tier.icon}</motion.div>
                  <div className={`w-2 h-12 ${tier.color} mx-auto rounded-full mb-4`} />
                  <p className="text-4xl font-display font-bold text-dark mb-2">{formatINR(tier.price)}</p>
                  <h3 className="font-display font-semibold text-xl text-dark mb-3">{tier.name}</h3>
                  <p className="text-sm text-muted">{tier.desc}</p>
                </motion.div>
              </MagneticHover>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 relative overflow-hidden">
        <div className="container-tp relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-dark mb-4">Where do you want to go?</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Explore our curated destinations across India and Nepal.</p>
          </motion.div>
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDestinations.map((dest, index) => (<DestinationCard key={dest.id} destination={dest} index={index} />))}
          </StaggerChildren>
          <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <MagneticHover strength={0.15}><Link to="/explore" className="btn-primary">Explore All Destinations <ArrowRight size={18} /></Link></MagneticHover>
          </motion.div>
        </div>
      </section>

      {/* Budget Slider */}
      <section className="py-20 bg-white">
        <div className="container-tp max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-dark mb-4">What does your budget get you?</h2>
            <p className="text-lg text-muted">Slide to see how your experience changes with your budget.</p>
          </motion.div>
          <MagneticHover strength={0.05}>
            <motion.div className="card p-8" whileHover={{ boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
              <BudgetSlider value={homeBudget} min={homeMinBudget} max={homeMaxBudget} onChange={setHomeBudget} label="Your trip budget" />
              <AnimatePresence mode="wait">
                <motion.div key={currentFeature.level} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }} className="mt-8 grid sm:grid-cols-3 gap-4">
                  <motion.div className="p-4 rounded-xl bg-primary-50" whileHover={{ scale: 1.02 }}><p className="text-xs font-semibold text-primary-500 uppercase tracking-wide mb-1">Experience</p><p className="font-semibold text-dark">{currentFeature.level} level</p></motion.div>
                  <motion.div className="p-4 rounded-xl bg-teal-50" whileHover={{ scale: 1.02 }}><p className="text-xs font-semibold text-secondary uppercase tracking-wide mb-1">Accommodation</p><p className="text-sm font-medium text-text">{currentFeature.accommodation}</p></motion.div>
                  <motion.div className="p-4 rounded-xl bg-amber-50" whileHover={{ scale: 1.02 }}><p className="text-xs font-semibold text-accent uppercase tracking-wide mb-1">Activities</p><p className="text-sm font-medium text-text">{currentFeature.activities}</p></motion.div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </MagneticHover>
        </div>
      </section>

      {/* Experiences */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="container-tp">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-dark mb-4">Real experiences from real travelers</h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">Honest stories, real budgets, and advice you can actually use.</p>
          </motion.div>
          <StaggerChildren staggerDelay={0.15} className="grid lg:grid-cols-3 gap-6">
            {featuredExperiences.map((exp, index) => (<ExperienceCard key={exp.id} experience={exp} index={index} />))}
          </StaggerChildren>
          <motion.div className="text-center mt-10" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <MagneticHover strength={0.15}><Link to="/experiences" className="btn-primary">Explore Experiences <ArrowRight size={18} /></Link></MagneticHover>
          </motion.div>
        </div>
      </section>

      {/* Why TripPAS */}
      <section className="py-20 bg-dark text-white relative overflow-hidden">
        <div className="container-tp relative">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-display font-bold mb-4">Why TripPAS?</h2>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">Your budget intelligence companion for smarter travel decisions.</p>
          </motion.div>
          <StaggerChildren staggerDelay={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {whyCards.map((card) => (
              <MagneticHover key={card.title} strength={0.15}>
                <motion.div className="bg-white/5 backdrop-blur rounded-2xl p-6 relative overflow-hidden" whileHover={{ backgroundColor: 'rgba(255,255,255,0.1)', scale: 1.02 }} transition={{ duration: 0.3 }}>
                  <card.icon size={28} className="text-primary-400 mb-4" />
                  <h3 className="font-semibold mb-2">{card.title}</h3>
                  <p className="text-sm text-white/60">{card.desc}</p>
                </motion.div>
              </MagneticHover>
            ))}
          </StaggerChildren>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container-tp">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary-500 to-primary-600 p-12 lg:p-20 text-center">
            <motion.div className="absolute inset-0 opacity-20" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 20, repeat: Infinity }}>
              <img src="https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=1200&q=80" alt="" className="w-full h-full object-cover" aria-hidden="true" />
            </motion.div>
            <div className="relative">
              <motion.h2 className="text-3xl lg:text-5xl font-display font-bold text-white mb-6" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                Your next trip starts with knowing what it really costs.
              </motion.h2>
              <MagneticHover strength={0.2}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link to="/plan" className="btn-accent text-base px-10 py-4 text-lg">Analyze My Trip <motion.span animate={{ x: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight size={20} /></motion.span></Link>
                </motion.div>
              </MagneticHover>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;