import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Thermometer, Star, Bookmark, ArrowRight, Clock, Tag, Check, ChevronDown } from 'lucide-react';
import { getDestinationById, getSimilarDestinations } from '../data/destinations';
import experiences from '../data/experiences';
import { formatINR } from '../utils/format';
import DestinationCard from '../components/DestinationCard';
import ExperienceCard from '../components/ExperienceCard';
import ActivityCard from '../components/ActivityCard';
import Rating from '../components/Rating';
import EmptyState from '../components/EmptyState';
import DestinationImageCarousel from '../components/DestinationImageCarousel';

const DestinationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = getDestinationById(id);
  const [saved, setSaved] = useState(false);

  if (!destination) {
    return (
      <div className="container-tp py-20">
        <EmptyState
          title="Destination not found"
          description="The destination you're looking for doesn't exist."
          action={<Link to="/explore" className="btn-primary">Explore Destinations</Link>}
        />
      </div>
    );
  }

  const similarDestinations = getSimilarDestinations(id, 3);
  const destinationExperiences = experiences.filter(e => e.destinationId === id).slice(0, 3);
  const tiers = destination.budgetTiers || {
    budget: { price: destination.startingBudget, accommodation: 'Basic stay', transport: 'Public transport', food: 'Local food', activities: 'Essential activities', benefits: ['Basic stay', 'Public transport', 'Essential activities'] },
    comfort: { price: destination.startingBudget * 1.5, accommodation: '3★ hotel', transport: 'Private cab', food: 'Good restaurants', activities: 'More activities', benefits: ['Better stay', 'Private transport', 'More activities'] },
    premium: { price: destination.startingBudget * 2.2, accommodation: '4★ resort', transport: 'Private car', food: 'Premium dining', activities: 'All experiences', benefits: ['Premium stay', 'Private car', 'All experiences'] },
    luxury: { price: destination.startingBudget * 3.2, accommodation: '5★ luxury', transport: 'Chauffeur', food: 'Fine dining', activities: 'Premium experiences', benefits: ['Luxury stay', 'Chauffeur', 'Premium experiences'] }
  };

  const faqs = [
    { q: `What is the minimum budget for ${destination.name}?`, a: `The minimum estimated budget for ${destination.name} is ${formatINR(destination.startingBudget)} for 2 travelers for 3 days. This includes basic accommodation, local transport, food and essential activities.` },
    { q: 'How many days are ideal?', a: `The ideal duration for ${destination.name} is ${destination.idealDuration || '3-5 days'}. This gives you enough time to explore the highlights without rushing.` },
    { q: 'When is the cheapest time to visit?', a: `The cheapest time is usually during the off-season (${destination.bestTime ? 'outside ' + destination.bestTime : 'shoulder months'}). Prices for accommodation and activities are typically 20-30% lower.` },
    { q: 'How can I reduce the cost?', a: 'Travel in a group to split costs, use public transport instead of private cabs, stay in hostels or homestays, eat at local restaurants, and book in advance during off-peak seasons.' }
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px]">
        <DestinationImageCarousel
          images={destination.images || (destination.image ? [destination.image] : [])}
          alt={destination.name}
          height="h-full"
          autoPlay={5000}
          showDots={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-tp pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-white/80 text-sm mb-2">
                <MapPin size={16} />
                {destination.country} · {destination.state || destination.region}
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-3">
                {destination.name}
              </h1>
              <p className="text-white/80 max-w-2xl mb-6">{destination.description}</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigate('/plan', { state: { destinationId: destination.id } })} className="btn-accent">
                  Plan This Trip
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                    saved ? 'bg-white text-primary-500' : 'bg-white/10 backdrop-blur text-white hover:bg-white/20'
                  }`}
                >
                  <Bookmark size={18} className={saved ? 'fill-primary-500' : ''} />
                  {saved ? 'Saved' : 'Save Destination'}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-12">
        <div className="container-tp">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { icon: Calendar, label: 'Best Time', value: destination.bestTime || 'Year round' },
              { icon: Clock, label: 'Ideal Duration', value: destination.idealDuration || '3-5 days' },
              { icon: Tag, label: 'Travel Style', value: (destination.tags || destination.travelStyle || []).slice(0, 2).join(', ') || 'Mixed' },
              { icon: Thermometer, label: 'Avg Temperature', value: destination.avgTemp || 'Varies' },
              { icon: Star, label: 'Popularity', value: `${destination.popularity || 85}%` }
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card p-4 text-center"
              >
                <item.icon size={20} className="mx-auto text-primary-500 mb-2" />
                <p className="text-xs text-muted mb-1">{item.label}</p>
                <p className="text-sm font-semibold text-dark">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimum Budget */}
      <section className="py-12 bg-white">
        <div className="container-tp">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-dark mb-4">Minimum Budget</h2>
              <p className="text-muted mb-6">
                For 2 travelers · 3 Days / 2 Nights
              </p>
              <div className="card p-8 mb-6">
                <p className="text-sm text-muted mb-2">Minimum estimated</p>
                <p className="text-5xl font-display font-bold text-primary-500 mb-6">
                  {formatINR(destination.startingBudget)}
                </p>
                <div className="space-y-3">
                  {[
                    { label: 'Travel', value: destination.travelCost || 4000 },
                    { label: 'Accommodation', value: destination.accommodationCost || 3000 },
                    { label: 'Food', value: destination.foodCost || 2400 },
                    { label: 'Local Transport', value: destination.localTransportCost || 1500 },
                    { label: 'Activities', value: destination.activityCost || 1000 },
                    { label: 'Miscellaneous', value: destination.miscellaneousCost || 600 }
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                      <span className="text-sm text-text">{item.label}</span>
                      <span className="text-sm font-semibold text-dark">{formatINR(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted">
                * Estimated costs for sample purposes. Actual prices may vary by season and availability.
              </p>
            </div>

            {/* Budget Tiers */}
            <div>
              <h2 className="text-3xl font-display font-bold text-dark mb-6">Budget Tiers</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {Object.entries(tiers).map(([key, tier], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`card p-6 ${key === 'budget' ? 'ring-2 ring-primary-500' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-display font-semibold text-dark capitalize">{key}</h3>
                      {key === 'budget' && <span className="badge bg-primary-500 text-white">Minimum</span>}
                    </div>
                    <p className="text-2xl font-display font-bold text-primary-500 mb-3">{formatINR(tier.price)}</p>
                    <ul className="space-y-1.5">
                      {(tier.benefits || []).map((benefit) => (
                        <li key={benefit} className="flex items-start gap-2 text-sm text-text">
                          <Check size={14} className="text-primary-500 mt-0.5 shrink-0" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Things to do */}
      <section className="py-12">
        <div className="container-tp">
          <h2 className="text-3xl font-display font-bold text-dark mb-6">Things to do</h2>
          {destination.activities?.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {destination.activities.map((activity, index) => (
                <ActivityCard key={activity.name} activity={activity} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState title="No activities listed yet" description="Check back soon for activities at this destination." />
          )}
        </div>
      </section>

      {/* Community recommendations */}
      <section className="py-12 bg-white">
        <div className="container-tp">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-display font-bold text-dark">Community recommendations</h2>
            <Link to="/experiences" className="text-sm font-semibold text-primary-500 hover:text-primary-600">
              View all experiences
            </Link>
          </div>
          {destinationExperiences.length ? (
            <div className="grid lg:grid-cols-3 gap-6">
              {destinationExperiences.map((exp, index) => (
                <ExperienceCard key={exp.id} experience={exp} index={index} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No experiences yet"
              description="Be the first to share your experience at this destination!"
              action={<Link to="/experiences/new" className="btn-primary">Share Your Experience</Link>}
            />
          )}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12">
        <div className="container-tp max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-dark mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="card p-6 group">
                <summary className="flex items-center justify-between cursor-pointer font-semibold text-dark">
                  {faq.q}
                  <ChevronDown size={20} className="text-muted group-open:rotate-180 transition-transform" />
                </summary>
                <p className="mt-4 text-sm text-text leading-relaxed">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Similar destinations */}
      {similarDestinations.length > 0 && (
        <section className="py-12 bg-white">
          <div className="container-tp">
            <h2 className="text-3xl font-display font-bold text-dark mb-6">Similar destinations</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarDestinations.map((dest, index) => (
                <DestinationCard key={dest.id} destination={dest} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default DestinationDetails;