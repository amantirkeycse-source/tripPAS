import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Thermometer, Star, Bookmark, ArrowRight, Clock, Tag, Check, ChevronDown } from 'lucide-react';
import { getDestination, getSimilarDestinations, getExperiences } from '../services/api';
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
  const [destination, setDestination] = useState(null);
  const [similarDestinations, setSimilarDestinations] = useState([]);
  const [destinationExperiences, setDestinationExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [destRes, similarRes, expsRes] = await Promise.all([
          getDestination(id),
          getSimilarDestinations(id),
          getExperiences()
        ]);
        if (destRes.success) setDestination(destRes.destination);
        if (similarRes.success) setSimilarDestinations(similarRes.destinations || []);
        if (expsRes.success) {
          const allExps = expsRes.experiences || [];
          setDestinationExperiences(allExps.filter(e => e.destinationId === id).slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to load destination:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-5" />
          <p className="text-lg font-display font-semibold text-dark mb-1">Loading destination</p>
          <p className="text-sm text-muted">Gathering details for you...</p>
        </div>
      </div>
    );
  }

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
      <section className="relative h-[65vh] min-h-[440px]">
        <DestinationImageCarousel
          images={destination.images || (destination.image ? [destination.image] : [])}
          alt={destination.name}
          height="h-full"
          autoPlay={5000}
          showDots={true}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/20 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/40 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0">
          <div className="container-tp pb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                <MapPin size={16} className="text-primary-400" />
                {destination.country} · {destination.state || destination.region}
              </div>
              <h1 className="text-4xl lg:text-6xl font-display font-bold text-white mb-3">
                {destination.name}
              </h1>
              <p className="text-white/70 max-w-2xl mb-6">{destination.description}</p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => navigate('/plan', { state: { destinationId: destination.id } })} className="btn-accent">
                  Plan This Trip
                  <ArrowRight size={18} />
                </button>
                <button
                  onClick={() => setSaved(!saved)}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all duration-200 ${
                    saved ? 'bg-white text-primary-500 shadow-elevated' : 'bg-white/10 backdrop-blur text-white hover:bg-white/20 ring-1 ring-white/20'
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
      <section className="py-16 relative">
        <div className="absolute -top-10 right-10 w-32 h-32 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
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
                className="card p-5 text-center hover:shadow-card-hover transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                  <item.icon size={20} className="text-primary-500" />
                </div>
                <p className="text-xs font-medium text-muted mb-1">{item.label}</p>
                <p className="text-sm font-bold text-dark">{item.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimum Budget */}
      <section className="py-16 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
        <div className="container-tp">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
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
                      <span className="text-sm font-bold text-dark">{formatINR(item.value)}</span>
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
              <div className="grid sm:grid-cols-2 gap-5">
                {Object.entries(tiers).map(([key, tier], index) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className={`card-hover overflow-hidden ${key === 'budget' ? 'ring-2 ring-primary-500 shadow-elevated' : ''}`}
                  >
                    <div className={`h-1 ${
                      key === 'budget' ? 'bg-gradient-to-r from-primary-500 to-primary-600' :
                      key === 'comfort' ? 'bg-gradient-to-r from-blue-400 to-blue-500' :
                      key === 'premium' ? 'bg-gradient-to-r from-amber-400 to-amber-500' :
                      'bg-gradient-to-r from-purple-400 to-purple-500'
                    }`} />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-display font-bold text-dark capitalize">{key}</h3>
                        {key === 'budget' && <span className="badge-primary">Minimum</span>}
                      </div>
                      <p className="text-2xl font-display font-bold text-primary-500 mb-4">{formatINR(tier.price)}</p>
                      <ul className="space-y-2">
                        {(tier.benefits || []).map((benefit) => (
                          <li key={benefit} className="flex items-start gap-2 text-sm text-text">
                            <Check size={14} className="text-primary-500 mt-0.5 shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Things to do */}
      <section className="py-16 relative">
        <div className="absolute -bottom-10 right-20 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container-tp">
          <h2 className="text-3xl font-display font-bold text-dark mb-8">Things to do</h2>
          {destination.activities?.length ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
      <section className="py-16 bg-white relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
        <div className="container-tp">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-display font-bold text-dark">Community recommendations</h2>
            <Link to="/experiences" className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors duration-200">
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
      <section className="py-16">
        <div className="container-tp max-w-3xl">
          <h2 className="text-3xl font-display font-bold text-dark mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="card-hover p-0 group">
                <summary className="flex items-center justify-between cursor-pointer font-bold text-dark p-7">
                  {faq.q}
                  <ChevronDown size={20} className="text-muted group-open:rotate-180 transition-transform duration-200 shrink-0 ml-4" />
                </summary>
                <div className="px-7 pb-7">
                  <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Similar destinations */}
      {similarDestinations.length > 0 && (
        <section className="py-16 bg-white relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
          <div className="absolute -top-10 left-10 w-40 h-40 bg-primary-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="container-tp">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-dark mb-3">Similar destinations</h2>
              <p className="text-gray-500">You might also love these places</p>
            </div>
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
