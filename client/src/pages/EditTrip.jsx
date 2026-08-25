import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Save,
  MapPin,
  Users,
  Calendar,
  Wallet,
  Bus,
  Train,
  Plane,
  Car,
  Route,
  Loader2,
  AlertCircle,
  Compass,
  Search,
  Check
} from 'lucide-react';

import destinations from '../data/destinations';
import { getTrip, updateTrip } from '../services/api';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const travelStyles = [
  { key: 'budget', label: 'Budget', desc: 'Hostels, local food, public transport', icon: '₹' },
  { key: 'comfort', label: 'Comfort', desc: '3★ hotels, good food, private cabs', icon: '₹₹' },
  { key: 'premium', label: 'Premium', desc: '4★ resorts, premium dining, private car', icon: '₹₹₹' },
  { key: 'luxury', label: 'Luxury', desc: '5★ luxury, fine dining, chauffeur', icon: '₹₹₹₹' }
];

const transportOptions = [
  { key: 'bus', label: 'Bus', icon: Bus },
  { key: 'train', label: 'Train', icon: Train },
  { key: 'flight', label: 'Flight', icon: Plane },
  { key: 'car', label: 'Car', icon: Car },
  { key: 'mixed', label: 'Mixed', icon: Route }
];

const popularCities = [
  'Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Kolkata',
  'Hyderabad', 'Pune', 'Ahmedabad', 'Jaipur', 'Lucknow',
  'Chandigarh', 'Bhopal', 'Indore', 'Nagpur', 'Kochi',
  'Goa', 'Shimla', 'Manali', 'Varanasi', 'Udaipur'
];

const EditTrip = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Loading & error states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Form fields
  const [startingCity, setStartingCity] = useState('');
  const [citySearch, setCitySearch] = useState('');
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);
  const [destinationId, setDestinationId] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [days, setDays] = useState(3);
  const [travelMonth, setTravelMonth] = useState('');
  const [travelStyle, setTravelStyle] = useState('budget');
  const [transportPreference, setTransportPreference] = useState('mixed');

  // Filter city suggestions
  const filteredCities = popularCities.filter(city =>
    city.toLowerCase().includes(citySearch.toLowerCase())
  ).slice(0, 6);

  // ==================================================
  // FETCH EXISTING TRIP
  // ==================================================
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        setLoading(true);
        setError('');

        const data = await getTrip(id);

        if (!data.success || !data.trip) {
          throw new Error(data.message || 'Trip not found');
        }

        const trip = data.trip;
        setStartingCity(trip.startingCity || '');
        setCitySearch(trip.startingCity || '');
        setDestinationId(trip.destinationId || '');
        setAdults(trip.adults || 1);
        setChildren(trip.children || 0);
        setDays(trip.days || 3);
        setTravelMonth(trip.travelMonth || '');
        setTravelStyle(trip.travelStyle || 'budget');
        setTransportPreference(trip.transportPreference || 'mixed');

      } catch (err) {
        console.error('Failed to load trip:', err);
        setError(err.message || 'Could not load trip details');
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
  }, [id]);

  // ==================================================
  // SAVE CHANGES
  // ==================================================
  const handleSave = async (e) => {
    e.preventDefault();

    if (!startingCity.trim()) {
      setError('Please enter a starting city');
      return;
    }

    if (!destinationId) {
      setError('Please select a destination');
      return;
    }

    if (!travelMonth) {
      setError('Please select a travel month');
      return;
    }

    try {
      setSaving(true);
      setError('');

      await updateTrip(id, {
        startingCity: startingCity.trim(),
        destinationId,
        adults,
        children,
        days,
        travelMonth,
        travelStyle,
        transportPreference
      });

      setSuccess(true);

      setTimeout(() => {
        navigate('/saved');
      }, 1500);

    } catch (err) {
      console.error('Failed to update trip:', err);
      setError(err.message || 'Could not update trip');
    } finally {
      setSaving(false);
    }
  };

  // ==================================================
  // LOADING STATE
  // ==================================================
  if (loading) {
    return (
      <div className="min-h-screen bg-surface py-12">
        <div className="container-tp max-w-3xl mx-auto">
          <div className="card p-10 text-center">
            <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
            <h3 className="font-display font-semibold text-dark text-lg mb-2">
              Loading trip details...
            </h3>
            <p className="text-muted">
              Fetching your trip from the server.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ==================================================
  // ERROR STATE (trip not found)
  // ==================================================
  if (error && !startingCity) {
    return (
      <div className="min-h-screen bg-surface py-12">
        <div className="container-tp max-w-3xl mx-auto">
          <div className="card p-10 text-center border border-red-200">
            <AlertCircle size={40} className="mx-auto text-red-500 mb-4" />
            <h3 className="font-display font-semibold text-dark text-lg mb-2">
              Could not load trip
            </h3>
            <p className="text-muted mb-5">{error}</p>
            <Link to="/saved" className="btn-primary">
              Back to Saved Trips
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedDest = destinations.find(d => d.id === destinationId);

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="container-tp max-w-3xl mx-auto">

        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="mb-8">
          <Link
            to="/saved"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary-500 transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to Saved Trips
          </Link>

          <div className="flex items-center gap-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary-50">
              <Compass size={24} className="text-primary-500" />
            </div>
            <div>
              <h1 className="text-3xl font-display font-bold text-dark">
                Edit Trip
              </h1>
              <p className="text-muted">
                {selectedDest
                  ? `Editing your trip to ${selectedDest.name}`
                  : 'Update your trip details'
                }
              </p>
            </div>
          </div>
        </div>

        {/* ==================================================
            SUCCESS MESSAGE
        ================================================== */}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6 mb-6 border border-green-200 bg-green-50"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <Check size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-semibold text-green-800">
                  Trip updated successfully!
                </p>
                <p className="text-sm text-green-600">
                  Redirecting to your saved trips...
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================================================
            ERROR MESSAGE
        ================================================== */}
        {error && startingCity && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-4 mb-6 border border-red-200 bg-red-50"
          >
            <div className="flex items-center gap-3">
              <AlertCircle size={18} className="text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </motion.div>
        )}

        {/* ==================================================
            FORM
        ================================================== */}
        <form onSubmit={handleSave} className="space-y-6">

          {/* Starting City */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-6"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <MapPin size={18} className="text-primary-500" />
              Starting City
            </label>
            <div className="relative">
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-100 transition-all bg-white">
                <Search size={18} className="text-muted" />
                <input
                  type="text"
                  value={citySearch}
                  onChange={(e) => {
                    setCitySearch(e.target.value);
                    setStartingCity(e.target.value);
                    setShowCitySuggestions(true);
                  }}
                  onFocus={() => setShowCitySuggestions(true)}
                  onBlur={() => setTimeout(() => setShowCitySuggestions(false), 200)}
                  placeholder="Search your city..."
                  className="flex-1 outline-none text-dark bg-transparent"
                />
              </div>

              {showCitySuggestions && filteredCities.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
                  {filteredCities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onMouseDown={() => {
                        setStartingCity(city);
                        setCitySearch(city);
                        setShowCitySuggestions(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm hover:bg-primary-50 transition-colors flex items-center gap-2"
                    >
                      <MapPin size={14} className="text-primary-500" />
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Destination */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="card p-6"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <Compass size={18} className="text-primary-500" />
              Destination
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {destinations.map((dest) => (
                <button
                  key={dest.id}
                  type="button"
                  onClick={() => setDestinationId(dest.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${
                    destinationId === dest.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-dark text-sm truncate">
                      {dest.name}
                    </p>
                    <p className="text-xs text-muted truncate">
                      {dest.country}
                    </p>
                  </div>
                  {destinationId === dest.id && (
                    <Check size={18} className="text-primary-500 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Travelers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card p-6"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <Users size={18} className="text-primary-500" />
              Travelers
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted mb-2">Adults</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setAdults(Math.max(1, adults - 1))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors font-bold text-dark"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold text-dark text-lg">{adults}</span>
                  <button
                    type="button"
                    onClick={() => setAdults(Math.min(20, adults + 1))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors font-bold text-dark"
                  >
                    +
                  </button>
                </div>
              </div>
              <div>
                <p className="text-sm text-muted mb-2">Children</p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setChildren(Math.max(0, children - 1))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors font-bold text-dark"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold text-dark text-lg">{children}</span>
                  <button
                    type="button"
                    onClick={() => setChildren(Math.min(10, children + 1))}
                    className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors font-bold text-dark"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Duration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="card p-6"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <Calendar size={18} className="text-primary-500" />
              Duration (Days)
            </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setDays(Math.max(1, days - 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors font-bold text-dark"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold text-dark text-lg">{days}</span>
              <button
                type="button"
                onClick={() => setDays(Math.min(30, days + 1))}
                className="w-10 h-10 rounded-xl border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors font-bold text-dark"
              >
                +
              </button>
              <span className="text-sm text-muted ml-2">
                ({Math.max(days - 1, 1)} nights)
              </span>
            </div>
          </motion.div>

          {/* Travel Month */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card p-6"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <Calendar size={18} className="text-primary-500" />
              Travel Month
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {months.map((month) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => setTravelMonth(month)}
                  className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    travelMonth === month
                      ? 'bg-primary-500 text-white shadow'
                      : 'bg-surface text-text hover:bg-primary-50'
                  }`}
                >
                  {month.slice(0, 3)}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Travel Style */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="card p-6"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <Wallet size={18} className="text-primary-500" />
              Travel Style
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {travelStyles.map((style) => (
                <button
                  key={style.key}
                  type="button"
                  onClick={() => setTravelStyle(style.key)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    travelStyle === style.key
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-primary-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-dark">{style.label}</span>
                    <span className="text-sm font-bold text-primary-500">{style.icon}</span>
                  </div>
                  <p className="text-xs text-muted">{style.desc}</p>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Transport */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card p-6"
          >
            <label className="flex items-center gap-2 text-sm font-semibold text-dark mb-3">
              <Route size={18} className="text-primary-500" />
              Transport Preference
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {transportOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setTransportPreference(option.key)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      transportPreference === option.key
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-200'
                    }`}
                  >
                    <Icon
                      size={22}
                      className={transportPreference === option.key ? 'text-primary-500' : 'text-muted'}
                    />
                    <span className={`text-xs font-medium ${
                      transportPreference === option.key ? 'text-primary-500' : 'text-dark'
                    }`}>
                      {option.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ==================================================
              SUBMIT
          ================================================== */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex gap-4"
          >
            <Link
              to="/saved"
              className="btn-secondary flex-1 justify-center"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={saving || success}
              className="btn-primary flex-1 justify-center"
            >
              {saving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Saving...
                </>
              ) : success ? (
                <>
                  <Check size={18} />
                  Saved!
                </>
              ) : (
                <>
                  <Save size={18} />
                  Save Changes
                </>
              )}
            </button>
          </motion.div>

        </form>

      </div>
    </div>
  );
};

export default EditTrip;
