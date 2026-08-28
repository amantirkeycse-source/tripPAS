import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Bookmark,
  Compass,
  Plus,
  ArrowRight,
  Calendar,
  Users,
  Wallet,
  TrendingUp,
  Plane,
  Clock,
  AlertCircle
} from 'lucide-react';

import { useAuth } from '../hooks/useAuth.jsx';
import { getDestinations, getExperiences } from '../services/api';
import { formatINR } from '../utils/format';
import {
  getSavedDestinations,
  getSavedExperiences,
  getTrips
} from '../services/api';
import DestinationImageCarousel from '../components/DestinationImageCarousel';

const Dashboard = () => {
  const { user } = useAuth();

  // --------------------------------------------------
  // ALL DATA FROM API
  // --------------------------------------------------

  const [destinations, setDestinations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  const [savedDestIds, setSavedDestIds] = useState([]);
  const [savedExpIds, setSavedExpIds] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);

  const [loadingTrips, setLoadingTrips] = useState(true);
  const [tripError, setTripError] = useState('');

  // --------------------------------------------------
  // FETCH ALL USER DATA + REFERENCE DATA
  // --------------------------------------------------

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        setLoadingTrips(true);
        setTripError('');

        const [tripsRes, destsRes, expsRes, allDestsRes, allExpsRes] = await Promise.all([
          getTrips(),
          getSavedDestinations(),
          getSavedExperiences(),
          getDestinations(),
          getExperiences()
        ]);

        setPlannedTrips(tripsRes.trips || []);
        setSavedDestIds(
          (destsRes.savedDestinations || []).map(d => d.destinationId)
        );
        setSavedExpIds(
          (expsRes.savedExperiences || []).map(e => e.experienceId)
        );
        if (allDestsRes.success) setDestinations(allDestsRes.destinations || []);
        if (allExpsRes.success) setExperiences(allExpsRes.experiences || []);
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        setTripError(error.message || 'Could not load data');
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchAllData();
  }, []);

  // --------------------------------------------------
  // RESOLVE IDs TO FULL DATA
  // --------------------------------------------------

  const savedDestinations = savedDestIds
    .map((id) => destinations.find((d) => d.id === id))
    .filter(Boolean);

  const savedExperiences = savedExpIds
    .map((id) => experiences.find((e) => e.id === id))
    .filter(Boolean);

  // --------------------------------------------------
  // HELPERS
  // --------------------------------------------------

  const getDestination = (destinationId) => {
    return destinations.find(
      (destination) => destination.id === destinationId
    );
  };

  const getTotalTravelers = (trip) => {
    return (
      Number(trip?.adults || 0) +
      Number(trip?.children || 0)
    );
  };

  const formatStyle = (style) => {
    if (!style) return 'Budget';

    return (
      style.charAt(0).toUpperCase() +
      style.slice(1).toLowerCase()
    );
  };

  const formatTransport = (transport) => {
    if (!transport) return 'Mixed';

    return (
      transport.charAt(0).toUpperCase() +
      transport.slice(1).toLowerCase()
    );
  };

  // --------------------------------------------------
  // STATS
  // --------------------------------------------------

  const stats = [
    {
      icon: MapPin,
      label: 'Saved Destinations',
      value: savedDestinations.length
    },
    {
      icon: Bookmark,
      label: 'Saved Experiences',
      value: savedExperiences.length
    },
    {
      icon: Compass,
      label: 'Planned Trips',
      value: plannedTrips.length
    },
    {
      icon: TrendingUp,
      label: 'Budget Analyzed',
      value: plannedTrips.length
    }
  ];

  // --------------------------------------------------
  // RECENT ACTIVITY
  // --------------------------------------------------

  const recentTrips = plannedTrips
    .slice(0, 4)
    .map((trip) => {
      const destination = getDestination(
        trip.destinationId
      );

      return {
        type: 'planned',
        text: `Planned a trip to ${
          destination?.name || trip.destinationId
        }`,
        date: trip.createdAt
          ? new Date(
              trip.createdAt
            ).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'short',
              year: 'numeric'
            })
          : 'Recently'
      };
    });

  // --------------------------------------------------
  // DASHBOARD
  // --------------------------------------------------

  return (
    <div className="min-h-screen bg-surface py-16">
      <div className="container-tp">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-8 md:p-10 mb-10 shadow-lg shadow-primary-500/20">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-white/5 rounded-full blur-2xl" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">

            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">
                Ready for your next trip,{' '}
                {user?.name?.split(' ')[0] || 'Traveler'}?
              </h1>

              <p className="text-lg text-white/80">
                Here's what you've been planning and saving.
              </p>
            </div>

            <div className="flex gap-3">

              <Link
                to="/plan"
                className="btn-primary"
              >
                <Plus size={18} />
                Plan a Trip
              </Link>

              <Link
                to="/explore"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl font-bold text-sm
                  bg-white/15 text-white backdrop-blur-sm ring-1 ring-white/20
                  hover:bg-white/25 transition-all duration-200"
              >
                Explore
              </Link>

            </div>
          </div>
        </div>

        {/* ==================================================
            STATS
        ================================================== */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">

          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <motion.div
                key={stat.label}
                initial={{
                  opacity: 0,
                  y: 20
                }}
                animate={{
                  opacity: 1,
                  y: 0
                }}
                transition={{
                  delay: index * 0.05
                }}
                className="card p-6 text-center hover:shadow-card-hover transition-all duration-200"
              >

                <div className="w-12 h-12 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-3">
                  <Icon
                    size={22}
                    className="text-primary-500"
                  />
                </div>

                <p className="text-3xl font-display font-bold text-dark mb-1">
                  {stat.value}
                </p>

                <p className="text-sm font-medium text-gray-500">
                  {stat.label}
                </p>

              </motion.div>
            );
          })}

        </div>

        {/* ==================================================
            MAIN CONTENT
        ================================================== */}

        <div className="grid lg:grid-cols-3 gap-8">

          {/* ==================================================
              SAVED DESTINATIONS
          ================================================== */}

          <div className="lg:col-span-2">

            <div className="flex items-center justify-between mb-5">

              <h2 className="text-xl font-display font-semibold text-dark">
                Saved Destinations
              </h2>

              <Link
                to="/saved"
                className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors duration-200"
              >
                View all
              </Link>

            </div>

            {savedDestinations.length === 0 ? (
              <div className="card p-10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                  <MapPin size={28} className="text-primary-500" />
                </div>
                <p className="text-lg font-semibold text-dark mb-2">No saved destinations yet</p>
                <p className="text-sm text-gray-500 mb-4">Explore amazing places and save your favorites.</p>
                <Link to="/explore" className="btn-primary">
                  Start exploring →
                </Link>
              </div>
            ) : (
            <div className="grid sm:grid-cols-3 gap-5">

              {savedDestinations.map(
                (dest, index) => (
                  <motion.div
                    key={dest.id}
                    initial={{
                      opacity: 0,
                      y: 20
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay: index * 0.05
                    }}
                    className="card-hover overflow-hidden group"
                  >

                    <div className="relative h-36">

                      <DestinationImageCarousel
                        images={dest.images || (dest.image ? [dest.image] : [])}
                        alt={dest.name}
                        height="h-36"
                        autoPlay={5000}
                        showDots={false}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      <div className="absolute bottom-3 left-4 right-4">

                        <h3 className="text-white font-display font-bold">
                          {dest.name}
                        </h3>

                        <p className="text-white/60 text-xs">
                          {dest.country}
                        </p>

                      </div>

                    </div>

                    <div className="p-4">

                      <p className="text-sm text-gray-500 mb-3">
                        From{' '}
                        <span className="font-semibold text-primary-500">
                          {formatINR(
                            dest.startingBudget
                          )}
                        </span>
                      </p>

                      <Link
                        to={`/destination/${dest.id}`}
                        className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors duration-200"
                      >
                        View →
                      </Link>

                    </div>

                  </motion.div>
                )
              )}

            </div>
            )}

          </div>

          {/* ==================================================
              RECENT ACTIVITY
          ================================================== */}

          <div>

            <h2 className="text-xl font-display font-semibold text-dark mb-5">
              Recent Activity
            </h2>

            <div className="card p-6">

              {loadingTrips ? (
                <div className="py-8 text-center">

                  <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />

                  <p className="text-sm text-muted">
                    Loading activity...
                  </p>

                </div>
              ) : tripError ? (
                <div className="py-8 text-center">

                  <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
                    <AlertCircle
                      size={22}
                      className="text-red-500"
                    />
                  </div>

                  <p className="text-sm font-medium text-gray-500">
                    Could not load activity.
                  </p>

                </div>
              ) : recentTrips.length > 0 ? (
                <div className="space-y-4">

                  {recentTrips.map(
                    (activity, index) => (
                      <motion.div
                        key={index}
                        initial={{
                          opacity: 0,
                          x: 20
                        }}
                        animate={{
                          opacity: 1,
                          x: 0
                        }}
                        transition={{
                          delay: index * 0.05
                        }}
                        className="flex items-start gap-3"
                      >

                        <div className="w-9 h-9 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">

                          <Compass
                            size={16}
                            className="text-primary-500"
                          />

                        </div>

                        <div>

                          <p className="text-sm text-text font-medium">
                            {activity.text}
                          </p>

                          <p className="text-xs text-gray-400">
                            {activity.date}
                          </p>

                        </div>

                      </motion.div>
                    )
                  )}

                </div>
              ) : (
                <div className="py-8 text-center">

                  <div className="w-14 h-14 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                    <Compass
                      size={24}
                      className="text-primary-500"
                    />
                  </div>

                  <p className="text-base font-semibold text-dark mb-1">
                    No trips planned yet
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    Start planning your first adventure.
                  </p>

                  <Link
                    to="/plan"
                    className="btn-primary"
                  >
                    <Plus size={16} />
                    Plan a Trip
                  </Link>

                </div>
              )}

            </div>

          </div>

        </div>

        {/* ==================================================
            PLANNED TRIPS
        ================================================== */}

        <div className="mt-10">

          <div className="flex items-center justify-between mb-5">

            <h2 className="text-xl font-display font-semibold text-dark">
              Your Planned Trips
            </h2>

            <Link
              to="/saved"
              className="text-sm font-semibold text-primary-500 hover:text-primary-600 transition-colors duration-200"
            >
              View all
            </Link>

          </div>

          {loadingTrips ? (
            <div className="card p-10 text-center">

              <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />

              <p className="text-muted">
                Loading planned trips...
              </p>

            </div>
          ) : tripError ? (
            <div className="card p-10 text-center">

              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-3">
                <AlertCircle
                  size={22}
                  className="text-red-500"
                />
              </div>

              <p className="text-muted">
                {tripError}
              </p>

            </div>
          ) : plannedTrips.length === 0 ? (
            <div className="card p-10 text-center">

              <div className="w-16 h-16 rounded-2xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Compass
                  size={28}
                  className="text-primary-500"
                />
              </div>

              <h3 className="font-display font-bold text-dark text-lg mb-2">
                No planned trips yet
              </h3>

              <p className="text-gray-500 mb-5">
                Start planning your next adventure.
              </p>

              <Link
                to="/plan"
                className="btn-primary"
              >
                <Plus size={18} />
                Plan a Trip
              </Link>

            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

              {plannedTrips
                .slice(0, 3)
                .map((trip, index) => {

                  const destination =
                    getDestination(
                      trip.destinationId
                    );

                  const travelers =
                    getTotalTravelers(trip);

                  return (
                    <motion.div
                      key={trip._id}
                      initial={{
                        opacity: 0,
                        y: 20
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                      transition={{
                        delay: index * 0.05
                      }}
                      className="card-hover overflow-hidden"
                    >

                      {/* Image */}

                      <div className="relative h-36">

                        {destination?.image ? (
                          <DestinationImageCarousel
                            images={destination.images || (destination.image ? [destination.image] : [])}
                            alt={destination.name}
                            height="h-full"
                            autoPlay={5000}
                            showDots={false}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center">
                            <Compass
                              size={40}
                              className="text-primary-400"
                            />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`badge text-xs font-bold ${
                            trip.status === 'completed'
                              ? 'bg-green-100 text-green-700 ring-1 ring-green-200'
                              : trip.status === 'booked'
                              ? 'bg-amber-100 text-amber-700 ring-1 ring-amber-200'
                              : 'bg-blue-100 text-blue-700 ring-1 ring-blue-200'
                          }`}>
                            {(trip.status || 'planned').charAt(0).toUpperCase() + (trip.status || 'planned').slice(1)}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-4 right-4">

                          <h3 className="text-white font-display font-bold text-lg">
                            {destination?.name ||
                              trip.destinationId}
                          </h3>

                          <p className="text-white/70 text-xs flex items-center gap-1">
                            <MapPin size={12} />
                            {destination?.country ||
                              'India'}
                          </p>

                        </div>

                      </div>

                      {/* Content */}

                      <div className="p-5">

                        <div className="grid grid-cols-2 gap-3 mb-4">

                          <div className="bg-surface rounded-xl p-3">

                            <div className="flex items-center gap-1.5 mb-1">
                              <Calendar
                                size={14}
                                className="text-primary-500"
                              />

                              <span className="text-xs text-gray-500">
                                Duration
                              </span>
                            </div>

                            <p className="font-bold text-sm text-dark">
                              {trip.days} days
                            </p>

                          </div>

                          <div className="bg-surface rounded-xl p-3">

                            <div className="flex items-center gap-1.5 mb-1">
                              <Users
                                size={14}
                                className="text-primary-500"
                              />

                              <span className="text-xs text-gray-500">
                                Travelers
                              </span>
                            </div>

                            <p className="font-bold text-sm text-dark">
                              {travelers}
                            </p>

                          </div>

                        </div>

                        <div className="flex items-center justify-between mb-4">

                          <div>

                            <p className="text-xs text-gray-400">
                              Starting from
                            </p>

                            <p className="font-bold text-sm text-dark">
                              {trip.startingCity}
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="text-xs text-gray-400">
                              Style
                            </p>

                            <p className="font-bold text-sm text-primary-500">
                              {formatStyle(
                                trip.travelStyle
                              )}
                            </p>

                          </div>

                        </div>

                        <Link
                          to="/saved"
                          className="btn-secondary w-full text-sm"
                        >
                          View Trip
                          <ArrowRight size={16} />
                        </Link>

                      </div>

                    </motion.div>
                  );
                })}

            </div>
          )}

        </div>

        {/* ==================================================
            QUICK ACTIONS
        ================================================== */}

        <div className="mt-10">

          <h2 className="text-xl font-display font-semibold text-dark mb-5">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">

            {/* Plan */}

            <Link
              to="/plan"
              className="card-hover p-6 group"
            >

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 shadow-sm shadow-primary-500/20 group-hover:shadow-md group-hover:shadow-primary-500/30 transition-all duration-200">
                <Compass
                  size={22}
                  className="text-white"
                />
              </div>

              <h3 className="font-bold text-dark mb-1">
                Plan a Trip
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                Calculate your trip budget
              </p>

              <span className="text-sm font-semibold text-primary-500 group-hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
                Start Planning
                <ArrowRight size={16} />
              </span>

            </Link>

            {/* Explore */}

            <Link
              to="/explore"
              className="card-hover p-6 group"
            >

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 shadow-sm shadow-primary-500/20 group-hover:shadow-md group-hover:shadow-primary-500/30 transition-all duration-200">
                <MapPin
                  size={22}
                  className="text-white"
                />
              </div>

              <h3 className="font-bold text-dark mb-1">
                Explore
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                Discover new destinations
              </p>

              <span className="text-sm font-semibold text-primary-500 group-hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
                Explore Now
                <ArrowRight size={16} />
              </span>

            </Link>

            {/* Experience */}

            <Link
              to="/experiences/new"
              className="card-hover p-6 group"
            >

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-4 shadow-sm shadow-primary-500/20 group-hover:shadow-md group-hover:shadow-primary-500/30 transition-all duration-200">
                <Bookmark
                  size={22}
                  className="text-white"
                />
              </div>

              <h3 className="font-bold text-dark mb-1">
                Share Experience
              </h3>

              <p className="text-sm text-gray-500 mb-3">
                Help other travelers
              </p>

              <span className="text-sm font-semibold text-primary-500 group-hover:gap-2 inline-flex items-center gap-1 transition-all duration-200">
                Share Now
                <ArrowRight size={16} />
              </span>

            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Dashboard;
