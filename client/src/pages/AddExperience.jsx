import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, ShieldCheck, Loader2 } from 'lucide-react';
import destinations from '../data/destinations';
import { formatINR } from '../utils/format';

const AddExperience = () => {
  const navigate = useNavigate();
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
          <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center mb-6">
            <ShieldCheck size={40} className="text-green-500" />
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
        <div className="text-center mb-10">
          <h1 className="text-4xl font-display font-bold text-dark mb-3">Share Your Experience</h1>
          <p className="text-lg text-muted max-w-2xl mx-auto">
            Help other travelers by sharing your real experience, budget, and tips.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Trip details */}
          <div className="card p-6">
            <h2 className="text-xl font-display font-semibold text-dark mb-6">Trip Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="label-field">Destination *</label>
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
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => updateField('rating', star)}
                      className={`text-2xl transition-colors ${
                        star <= formData.rating ? 'text-accent' : 'text-gray-300'
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

          {/* Story */}
          <div className="card p-6">
            <h2 className="text-xl font-display font-semibold text-dark mb-6">Your Experience</h2>
            <div className="space-y-4">
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

          {/* Privacy */}
          <div className="card p-6">
            <h2 className="text-xl font-display font-semibold text-dark mb-4">Privacy</h2>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.anonymous}
                onChange={(e) => updateField('anonymous', e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-text">Post anonymously</span>
            </label>
          </div>

          {/* Moderation notice */}
          <div className="flex items-start gap-3 p-4 rounded-xl bg-primary-50 border border-primary-100">
            <ShieldCheck size={20} className="text-primary-500 shrink-0 mt-0.5" />
            <p className="text-sm text-text">
              Your experience may be reviewed before appearing publicly. Please be honest and respectful. Do not share personal contact information.
            </p>
          </div>

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
        </form>
      </div>
    </div>
  );
};

export default AddExperience;