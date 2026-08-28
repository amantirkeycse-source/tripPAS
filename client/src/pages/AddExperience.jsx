import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ShieldCheck, Loader2, PenLine, MessageCircle } from 'lucide-react';
import { getDestinations } from '../services/api';
import { formatINR } from '../utils/format';

const AddExperience = () => {
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loadingDestinations, setLoadingDestinations] = useState(true);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    destinationId: '',
    travelDates: '',
    duration: '',
    budget: '',
    travelStyle: '',
    accommodationType: '',
    transportType: '',
    rating: 4,
    story: '',
    whatILoved: '',
    whatToAvoid: '',
    whatIRecommend: '',
    bestBudgetTip: '',
    anonymous: false
  });

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await getDestinations();
        if (res.success) setDestinations(res.destinations || []);
      } catch (error) {
        console.error('Failed to load destinations:', error);
      } finally {
        setLoadingDestinations(false);
      }
    };
    fetchDestinations();
  }, []);

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setTimeout(() => navigate('/experiences'), 2000);
    }, 1500);
  };

  const travelStyles = ['Budget', 'Comfort', 'Premium', 'Luxury', 'Solo', 'Family', 'Adventure', 'Beach', 'Culture', 'Nature'];
  const accommodationTypes = ['Hostel', 'Homestay', 'Hotel', 'Resort', 'Guesthouse', 'Camping', 'Houseboat'];
  const transportTypes = ['Bus', 'Train', 'Flight', 'Car', 'Bike', 'Mixed'];

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="w-24 h-24 mx-auto rounded-2xl bg-green-100 flex items-center justify-center mb-6 shadow-lg">
            <ShieldCheck size={48} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-display font-bold text-dark mb-3">Experience Submitted!</h1>
          <p className="text-muted mb-4">
            Your experience may be reviewed before appearing publicly.
          </p>
          <p className="text-sm text-muted">Redirecting you to experiences...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="container-tp max-w-3xl">
        {/* Header with decorative glows */}
        <div className="relative text-center mb-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[250px] bg-primary-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -top-6 right-1/4 w-[160px] h-[160px] bg-primary-400/8 rounded-full blur-3xl -z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 border border-primary-100 mb-5">
              <PenLine size={32} className="text-primary-500" />
            </div>
            <h1 className="text-4xl font-display font-bold text-dark mb-3">Share Your Experience</h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Help other travelers by sharing your real experience, budget, and tips.
            </p>
          </motion.div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trip details */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="card rounded-3xl overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
            <div className="p-6">
              <h2 className="text-xl font-display font-bold text-dark mb-6">Trip Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-field">Destination *</label>
                  {loadingDestinations ? (
                    <div className="input-field flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-primary-100 border-t-primary-500 rounded-full animate-spin" />
                      Loading destinations...
                    </div>
                  ) : (
                    <select
                      required
                      value={formData.destinationId}
                      onChange={(e) => updateField('destinationId', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Select destination</option>
                      {destinations.map(dest => (
                        <option key={dest.id} value={dest.id}>{dest.name}, {dest.country}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div>
                  <label className="label-field">Travel dates</label>
                  <input
                    type="text"
                    value={formData.travelDates}
                    onChange={(e) => updateField('travelDates', e.target.value)}
                    placeholder="e.g. June 2025"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-field">Duration</label>
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    placeholder="e.g. 3 days"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-field">Approximate total budget (₹)</label>
                  <input
                    type="number"
                    value={formData.budget}
                    onChange={(e) => updateField('budget', e.target.value)}
                    placeholder="e.g. 15000"
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="label-field">Travel style</label>
                  <select
                    value={formData.travelStyle}
                    onChange={(e) => updateField('travelStyle', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select style</option>
                    {travelStyles.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field">Accommodation type</label>
                  <select
                    value={formData.accommodationType}
                    onChange={(e) => updateField('accommodationType', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select type</option>
                    {accommodationTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field">Transport type</label>
                  <select
                    value={formData.transportType}
                    onChange={(e) => updateField('transportType', e.target.value)}
                    className="input-field"
                  >
                    <option value="">Select type</option>
                    {transportTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label-field">Rating</label>
                  <div className="flex items-center gap-2 p-3 rounded-2xl border-2 border-gray-100 bg-gray-50/50">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => updateField('rating', star)}
                        className={`text-2xl transition-all hover:scale-110 ${
                          star <= formData.rating ? 'text-accent drop-shadow-sm' : 'text-gray-300'
                        }`}
                        aria-label={`Rate ${star} stars`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card rounded-3xl overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center">
                  <MessageCircle size={18} className="text-primary-500" />
                </div>
                <h2 className="text-xl font-display font-bold text-dark">Your Experience</h2>
              </div>
              <div className="space-y-5">
                <div>
                  <label className="label-field">Tell other travelers about your experience *</label>
                  <textarea
                    required
                    value={formData.story}
                    onChange={(e) => updateField('story', e.target.value)}
                    rows={6}
                    placeholder="Share your journey, highlights, and what it was really like..."
                    className="input-field resize-y"
                  />
                </div>
                <div>
                  <label className="label-field">What did you love?</label>
                  <textarea
                    value={formData.whatILoved}
                    onChange={(e) => updateField('whatILoved', e.target.value)}
                    rows={3}
                    placeholder="The best moments of your trip..."
                    className="input-field resize-y"
                  />
                </div>
                <div>
                  <label className="label-field">What should travelers avoid?</label>
                  <textarea
                    value={formData.whatToAvoid}
                    onChange={(e) => updateField('whatToAvoid', e.target.value)}
                    rows={3}
                    placeholder="Scams, overpriced spots, or things not worth it..."
                    className="input-field resize-y"
                  />
                </div>
                <div>
                  <label className="label-field">What would you recommend?</label>
                  <textarea
                    value={formData.whatIRecommend}
                    onChange={(e) => updateField('whatIRecommend', e.target.value)}
                    rows={3}
                    placeholder="Must-do activities, places to stay, food to try..."
                    className="input-field resize-y"
                  />
                </div>
                <div>
                  <label className="label-field">Best budget tip?</label>
                  <textarea
                    value={formData.bestBudgetTip}
                    onChange={(e) => updateField('bestBudgetTip', e.target.value)}
                    rows={3}
                    placeholder="How did you save money?"
                    className="input-field resize-y"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="card rounded-3xl overflow-hidden"
          >
            <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
            <div className="p-6">
              <h2 className="text-xl font-display font-bold text-dark mb-4">Privacy</h2>
              <label className="flex items-center gap-3 cursor-pointer p-3 rounded-2xl border-2 border-gray-100 hover:border-primary-200 transition-colors">
                <input
                  type="checkbox"
                  checked={formData.anonymous}
                  onChange={(e) => updateField('anonymous', e.target.checked)}
                  className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-text">Post anonymously</span>
              </label>
            </div>
          </motion.div>

          {/* Moderation notice */}
          <div className="flex items-start gap-3 p-5 rounded-2xl bg-primary-50 border-2 border-primary-100">
            <ShieldCheck size={22} className="text-primary-500 shrink-0 mt-0.5" />
            <p className="text-sm text-text">
              Your experience may be reviewed before appearing publicly. Please be honest and respectful. Do not share personal contact information.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-lg disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Publish Experience
                </>
              )}
            </button>
          </motion.div>
        </form>
      </div>
    </div>
  );
};

export default AddExperience;
