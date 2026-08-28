import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Heart, Bookmark, Flag, MapPin, Calendar, Clock, Users, Wallet, Check, X, Lightbulb, Eye, AlertTriangle } from 'lucide-react';
import { getExperience, getRelatedExperiences, getDestination } from '../services/api';
import { formatINR, getInitials } from '../utils/format';
import { getExperienceById, getRelatedExperiences as getLocalRelatedExperiences } from '../data/experiences';
import Rating from '../components/Rating';
import ExperienceCard from '../components/ExperienceCard';
import EmptyState from '../components/EmptyState';

const ExperienceDetails = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [destination, setDestination] = useState(null);
  const [relatedExperiences, setRelatedExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [reported, setReported] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const localExperience = getExperienceById(id);
      try {
        setLoading(true);
        const expRes = await getExperience(id);
        const currentExperience = expRes.success && expRes.experience
          ? expRes.experience
          : localExperience;

        if (currentExperience) {
          setExperience(currentExperience);
          const [relatedRes, destRes] = await Promise.allSettled([
            getRelatedExperiences(id),
            getDestination(currentExperience.destinationId)
          ]);
          if (relatedRes.status === 'fulfilled' && relatedRes.value.success) {
            setRelatedExperiences(relatedRes.value.experiences || []);
          } else {
            setRelatedExperiences(getLocalRelatedExperiences(id).filter((item) => item.id !== id));
          }
          if (destRes.status === 'fulfilled' && destRes.value.success) {
            setDestination(destRes.value.destination);
          }
        }
      } catch (error) {
        console.error('Failed to load experience:', error);
        setExperience(localExperience);
        setRelatedExperiences(localExperience
          ? getLocalRelatedExperiences(id).filter((item) => item.id !== id)
          : []);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface py-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading experience...</p>
        </div>
      </div>
    );
  }

  if (!experience) {
    return (
      <div className="container-tp py-20">
        <EmptyState
          title="Experience not found"
          description="The experience you're looking for doesn't exist."
          action={<Link to="/experiences" className="btn-primary">Browse Experiences</Link>}
        />
      </div>
    );
  }

  const sections = [
    { icon: Lightbulb, title: 'My trip', content: experience.story },
    { icon: Check, title: 'What I recommend', content: experience.whatIRecommend },
    { icon: X, title: 'What I would avoid', content: experience.whatToAvoid },
    { icon: Eye, title: 'Best experience', content: experience.whatILoved },
    { icon: Wallet, title: 'Budget tips', content: experience.bestBudgetTip },
    { icon: MapPin, title: 'Hidden places', content: experience.hiddenPlaces }
  ].filter(section => section.content);

  return (
    <div className="min-h-screen bg-surface pt-28 pb-12">
      <div className="container-tp max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="card p-8 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            {experience.user?.avatar ? (
              <img
                src={experience.user.avatar}
                alt={experience.user.name}
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary-100 flex items-center justify-center">
                <span className="text-primary-500 font-semibold text-lg">
                  {getInitials(experience.user?.name)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <p className="font-semibold text-dark">
                {experience.user?.name || 'Anonymous traveler'}
                {experience.user?.verified && (
                  <span className="ml-1 text-primary-500" aria-label="Verified">✓</span>
                )}
              </p>
              <p className="text-sm text-muted">
                {experience.date} · {experience.duration}
              </p>
            </div>
            <Rating value={experience.rating || 0} size={18} />
          </div>

          <h1 className="text-3xl lg:text-4xl font-display font-bold text-dark mb-4">
            {experience.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
            <span className="flex items-center gap-1">
              <MapPin size={16} className="text-primary-500" />
              {experience.destination}, {experience.country}
            </span>
            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-primary-500" />
              {experience.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock size={16} className="text-primary-500" />
              {experience.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users size={16} className="text-primary-500" />
              {experience.travelers || 2} travelers
            </span>
            <span className="flex items-center gap-1">
              <Wallet size={16} className="text-primary-500" />
              ~{formatINR(experience.budget)}
            </span>
          </div>

          {destination && (
            <Link
              to={`/destination/${destination.id}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-500 hover:text-primary-600"
            >
              <MapPin size={16} />
              View {destination.name} destination guide
            </Link>
          )}

          <div className="flex items-center gap-3 mt-6 pt-6 border-t border-gray-100">
            <button
              onClick={() => setLiked(!liked)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                liked ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-text hover:bg-gray-100'
              }`}
            >
              <Heart size={18} className={liked ? 'fill-red-500' : ''} />
              {liked ? 'Liked' : 'Like'} · {experience.likes || 0}
            </button>
            <button
              onClick={() => setSaved(!saved)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                saved ? 'bg-primary-50 text-primary-500' : 'bg-gray-50 text-text hover:bg-gray-100'
              }`}
            >
              <Bookmark size={18} className={saved ? 'fill-primary-500' : ''} />
              {saved ? 'Saved' : 'Save'} · {experience.saves || 0}
            </button>
            <button
              onClick={() => setReported(!reported)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all ${
                reported ? 'bg-amber-50 text-accent' : 'bg-gray-50 text-text hover:bg-gray-100'
              }`}
            >
              <Flag size={18} />
              {reported ? 'Reported' : 'Report'}
            </button>
          </div>
        </motion.div>

        {/* Story sections */}
        <div className="space-y-6 mb-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center">
                  <section.icon size={20} className="text-primary-500" />
                </div>
                <h2 className="text-xl font-display font-semibold text-dark">{section.title}</h2>
              </div>
              <p className="text-text leading-relaxed whitespace-pre-line">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Moderation notice */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200 mb-8">
          <AlertTriangle size={20} className="text-accent shrink-0 mt-0.5" />
          <p className="text-sm text-text">
            This experience was shared by a community member. TripPAS does not verify the accuracy of individual stories. Always do your own research before traveling.
          </p>
        </div>

        {/* Related experiences */}
        <div>
          <h2 className="text-2xl font-display font-bold text-dark mb-6">Related experiences</h2>
          <div className="grid lg:grid-cols-3 gap-6">
            {relatedExperiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceDetails;
