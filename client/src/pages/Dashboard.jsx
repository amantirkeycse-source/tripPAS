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
import destinations from '../data/destinations';
import experiences from '../data/experiences';
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
  // USER-SPECIFIC DATA FROM API
  // --------------------------------------------------

  const [savedDestIds, setSavedDestIds] = useState([]);
  const [savedExpIds, setSavedExpIds] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);

  const [loadingTrips, setLoadingTrips] = useState(true);
  const [tripError, setTripError] = useState('');

  // --------------------------------------------------
  // FETCH ALL USER DATA
  // --------------------------------------------------

  useEffect(() => {
    const fetchAllUserData = async () => {
      try {
        setLoadingTrips(true);
        setTripError('');

        const [tripsRes, destsRes, expsRes] = await Promise.all([
          getTrips(),
          getSavedDestinations(),
          getSavedExperiences()
        ]);

        setPlannedTrips(tripsRes.trips || []);
        setSavedDestIds(
          (destsRes.savedDestinations || []).map(d => d.destinationId)
        );
        setSavedExpIds(
          (expsRes.savedExperiences || []).map(e => e.experienceId)
        );
      } catch (error) {
        console.error('Dashboard fetch error:', error);
        setTripError(error.message || 'Could not load data');
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchAllUserData();
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
    <div className="min-h-screen bg-surface py-12">
      <div className="container-tp">

        {/* ==================================================
            HEADER
        ================================================== */}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">

          <div>
            <h1 className="text-4xl font-display font-bold text-dark mb-2">
              Ready for your next trip,{' '}
              {user?.name?.split(' ')[0] || 'Traveler'}?
            </h1>

            <p className="text-lg text-muted">
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
              className="btn-secondary"
            >
              Explore
            </Link>

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
                className="card p-6 text-center"
              >

                <Icon
                  size={24}
                  className="mx-auto text-primary-500 mb-3"
                />

                <p className="text-3xl font-display font-bold text-dark">
                  {stat.value}
                </p>

                <p className="text-sm text-muted">
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

            <div className="flex items-center justify-between mb-4">

              <h2 className="text-xl font-display font-semibold text-dark">
                Saved Destinations
              </h2>

              <Link
                to="/saved"
                className="text-sm font-semibold text-primary-500 hover:text-primary-600"
              >
                View all
              </Link>

            </div>

            {savedDestinations.length === 0 ? (
              <div className="card p-8 text-center">
                <MapPin size={32} className="mx-auto text-primary-500 mb-3" />
                <p className="text-muted mb-3">No saved destinations yet.</p>
                <Link to="/explore" className="text-sm font-semibold text-primary-500 hover:text-primary-600">
                  Start planning your first trip →
                </Link>
              </div>
            ) : (
            <div className="grid sm:grid-cols-3 gap-4">

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
                    className="card overflow-hidden group"
                  >

                    <div className="relative h-32">

                      <DestinationImageCarousel
                        images={dest.images || (dest.image ? [dest.image] : [])}
                        alt={dest.name}
                        height="h-32"
                        autoPlay={5000}
                        showDots={false}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                      <div className="absolute bottom-3 left-4">

                        <h3 className="text-white font-display font-semibold">
                          {dest.name}
                        </h3>

                        <p className="text-white/70 text-xs">
                          {dest.country}
                        </p>

                      </div>

                    </div>

                    <div className="p-4">

                      <p className="text-sm text-muted mb-3">
                        From{' '}
                        <span className="font-semibold text-primary-500">
                          {formatINR(
                            dest.startingBudget
                          )}
                        </span>
                      </p>

                      <Link
                        to={`/destination/${dest.id}`}
                        className="text-sm font-semibold text-primary-500 hover:text-primary-600"
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

            <h2 className="text-xl font-display font-semibold text-dark mb-4">
              Recent Activity
            </h2>

            <div className="card p-6">

              {loadingTrips ? (
                <div className="py-6 text-center">

                  <div className="w-8 h-8 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-3" />

                  <p className="text-sm text-muted">
                    Loading activity...
                  </p>

                </div>
              ) : tripError ? (
                <div className="py-6 text-center">

                  <AlertCircle
                    size={28}
                    className="mx-auto text-red-500 mb-3"
                  />

                  <p className="text-sm text-muted">
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

                        <div className="w-8 h-8 rounded-lg bg-primary-50 flex items-center justify-center shrink-0">

                          <Compass
                            size={16}
                            className="text-primary-500"
                          />

                        </div>

                        <div>

                          <p className="text-sm text-text">
                            {activity.text}
                          </p>

                          <p className="text-xs text-muted">
                            {activity.date}
                          </p>

                        </div>

                      </motion.div>
                    )
                  )}

                </div>
              ) : (
                <div className="py-6 text-center">

                  <Compass
                    size={30}
                    className="mx-auto text-primary-500 mb-3"
                  />

                  <p className="text-sm text-muted mb-4">
                    No trips planned yet.
                  </p>

                  <Link
                    to="/plan"
                    className="text-sm font-semibold text-primary-500"
                  >
                    Plan your first trip →
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

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-xl font-display font-semibold text-dark">
              Your Planned Trips
            </h2>

            <Link
              to="/saved"
              className="text-sm font-semibold text-primary-500 hover:text-primary-600"
            >
              View all
            </Link>

          </div>

          {loadingTrips ? (
            <div className="card p-8 text-center">

              <div className="w-8 h-8 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-3" />

              <p className="text-muted">
                Loading planned trips...
              </p>

            </div>
          ) : tripError ? (
            <div className="card p-8 text-center">

              <AlertCircle
                size={30}
                className="mx-auto text-red-500 mb-3"
              />

              <p className="text-muted">
                {tripError}
              </p>

            </div>
          ) : plannedTrips.length === 0 ? (
            <div className="card p-8 text-center">

              <Compass
                size={40}
                className="mx-auto text-primary-500 mb-4"
              />

              <h3 className="font-display font-semibold text-dark text-lg mb-2">
                No planned trips yet
              </h3>

              <p className="text-muted mb-5">
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
                      className="card overflow-hidden"
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
                          <div className="w-full h-full bg-primary-50 flex items-center justify-center">
                            <Compass
                              size={40}
                              className="text-primary-500"
                            />
                          </div>
                        )}

                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                        {/* Status Badge */}
                        <div className="absolute top-3 right-3">
                          <span className={`badge text-xs ${
                            trip.status === 'completed'
                              ? 'bg-green-100 text-green-700'
                              : trip.status === 'booked'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}>
                            {(trip.status || 'planned').charAt(0).toUpperCase() + (trip.status || 'planned').slice(1)}
                          </span>
                        </div>

                        <div className="absolute bottom-3 left-4">

                          <h3 className="text-white font-display font-bold text-lg">
                            {destination?.name ||
                              trip.destinationId}
                          </h3>

                          <p className="text-white/80 text-xs flex items-center gap-1">
                            <MapPin size={12} />
                            {destination?.country ||
                              'India'}
                          </p>

                        </div>

                      </div>

                      {/* Content */}

                      <div className="p-4">

                        <div className="grid grid-cols-2 gap-2 mb-4">

                          <div className="bg-surface rounded-lg p-2.5">

                            <div className="flex items-center gap-1.5 mb-1">
                              <Calendar
                                size={14}
                                className="text-primary-500"
                              />

                              <span className="text-xs text-muted">
                                Duration
                              </span>
                            </div>

                            <p className="font-semibold text-sm">
                              {trip.days} days
                            </p>

                          </div>

                          <div className="bg-surface rounded-lg p-2.5">

                            <div className="flex items-center gap-1.5 mb-1">
                              <Users
                                size={14}
                                className="text-primary-500"
                              />

                              <span className="text-xs text-muted">
                                Travelers
                              </span>
                            </div>

                            <p className="font-semibold text-sm">
                              {travelers}
                            </p>

                          </div>

                        </div>

                        <div className="flex items-center justify-between mb-4">

                          <div>

                            <p className="text-xs text-muted">
                              Starting from
                            </p>

                            <p className="font-semibold text-dark">
                              {trip.startingCity}
                            </p>

                          </div>

                          <div className="text-right">

                            <p className="text-xs text-muted">
                              Style
                            </p>

                            <p className="font-semibold text-primary-500">
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

          <h2 className="text-xl font-display font-semibold text-dark mb-4">
            Quick Actions
          </h2>

          <div className="grid sm:grid-cols-3 gap-4">

            {/* Plan */}

            <Link
              to="/plan"
              className="card p-6 hover:shadow-card-hover transition-all group"
            >

              <Compass
                size={24}
                className="text-primary-500 mb-3"
              />

              <h3 className="font-semibold text-dark mb-1">
                Plan a Trip
              </h3>

              <p className="text-sm text-muted mb-3">
                Calculate your trip budget
              </p>

              <span className="text-sm font-semibold text-primary-500 group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                Start Planning
                <ArrowRight size={16} />
              </span>

            </Link>

            {/* Explore */}

            <Link
              to="/explore"
              className="card p-6 hover:shadow-card-hover transition-all group"
            >

              <MapPin
                size={24}
                className="text-primary-500 mb-3"
              />

              <h3 className="font-semibold text-dark mb-1">
                Explore
              </h3>

              <p className="text-sm text-muted mb-3">
                Discover new destinations
              </p>

              <span className="text-sm font-semibold text-primary-500 group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                Explore Now
                <ArrowRight size={16} />
              </span>

            </Link>

            {/* Experience */}

            <Link
              to="/experiences/new"
              className="card p-6 hover:shadow-card-hover transition-all group"
            >

              <Bookmark
                size={24}
                className="text-primary-500 mb-3"
              />

              <h3 className="font-semibold text-dark mb-1">
                Share Experience
              </h3>

              <p className="text-sm text-muted mb-3">
                Help other travelers
              </p>

              <span className="text-sm font-semibold text-primary-500 group-hover:gap-2 inline-flex items-center gap-1 transition-all">
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