import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  Users,
  Wallet,
  Trash2,
  ArrowRight,
  Heart,
  Bookmark,
  Compass,
  Plus,
  Plane,
  Hotel,
  Clock,
  UserRound,
  Pencil
} from 'lucide-react';

import { getDestinations, getExperiences } from '../services/api';
import { formatINR } from '../utils/format';
import {
  updateTripStatus,
  getSavedDestinations,
  getSavedExperiences,
  getTrips,
  removeSavedDestination,
  removeSavedExperience,
  deleteTrip
} from '../services/api';
import EmptyState from '../components/EmptyState';
import DestinationImageCarousel from '../components/DestinationImageCarousel';

const statusOptions = [
  { key: 'planned', label: 'Planned', color: 'bg-blue-100 text-blue-700' },
  { key: 'booked', label: 'Booked', color: 'bg-amber-100 text-amber-700' },
  { key: 'completed', label: 'Completed', color: 'bg-green-100 text-green-700' }
];

const SavedTrips = () => {
  const [activeTab, setActiveTab] = useState('trips');

  // Reference data from API
  const [destinations, setDestinations] = useState([]);
  const [experiences, setExperiences] = useState([]);

  // User-specific IDs from MongoDB
  const [savedDestIds, setSavedDestIds] = useState([]);
  const [savedExpIds, setSavedExpIds] = useState([]);
  const [plannedTrips, setPlannedTrips] = useState([]);

  const [loadingTrips, setLoadingTrips] = useState(true);
  const [tripError, setTripError] = useState('');
  const [deletingTripId, setDeletingTripId] = useState(null);

  // ==================================================
  // FETCH ALL USER DATA + REFERENCE DATA FROM API
  // ==================================================
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
        console.error('Failed to load data:', error);
        setTripError(error.message || 'Could not load saved data');
      } finally {
        setLoadingTrips(false);
      }
    };

    fetchAllData();
  }, []);

  // ==================================================
  // TABS
  // ==================================================
  const tabs = [
    {
      key: 'destinations',
      label: 'Saved Destinations',
      icon: MapPin
    },
    {
      key: 'experiences',
      label: 'Saved Experiences',
      icon: Bookmark
    },
    {
      key: 'trips',
      label: 'Planned Trips',
      icon: Compass
    }
  ];

  // ==================================================
  // REMOVE DESTINATION (API + local)
  // ==================================================
  const removeDestination = async (id) => {
    try {
      await removeSavedDestination(id);
      setSavedDestIds((current) =>
        current.filter((destId) => destId !== id)
      );
    } catch (error) {
      console.error('Failed to remove destination:', error);
    }
  };

  // ==================================================
  // REMOVE EXPERIENCE (API + local)
  // ==================================================
  const removeExperience = async (id) => {
    try {
      await removeSavedExperience(id);
      setSavedExpIds((current) =>
        current.filter((expId) => expId !== id)
      );
    } catch (error) {
      console.error('Failed to remove experience:', error);
    }
  };

  // ==================================================
  // DELETE TRIP FROM MONGODB
  // ==================================================
  const removeTrip = async (id) => {
    try {
      const confirmed = window.confirm(
        'Are you sure you want to delete this trip?'
      );

      if (!confirmed) {
        return;
      }

      setDeletingTripId(id);

      await deleteTrip(id);

      // Remove from UI after successful MongoDB deletion
      setPlannedTrips((current) =>
        current.filter(
          (trip) => trip._id !== id
        )
      );

    } catch (error) {
      console.error(
        'Failed to delete trip:',
        error
      );

      alert(
        error.message || 'Could not delete trip'
      );

    } finally {
      setDeletingTripId(null);
    }
  };

  // ==================================================
  // RESOLVE IDs TO FULL DATA
  // ==================================================
  const savedDestData = savedDestIds
    .map((id) => destinations.find((d) => d.id === id))
    .filter(Boolean);

  const savedExpData = savedExpIds
    .map((id) => experiences.find((e) => e.id === id))
    .filter(Boolean);

  // ==================================================
  // FIND DESTINATION
  // ==================================================
  const getDestination = (destinationId) => {
    return destinations.find(
      (destination) =>
        destination.id === destinationId
    );
  };

  // ==================================================
  // FORMAT DATE
  // ==================================================
  const formatTripDate = (trip) => {
    if (!trip?.travelMonth) {
      return 'Travel date not selected';
    }

    return `${trip.travelMonth} ${new Date().getFullYear()}`;
  };

  // ==================================================
  // FORMAT TRAVEL STYLE
  // ==================================================
  const formatStyle = (style) => {
    if (!style) return 'Budget';

    return (
      style.charAt(0).toUpperCase() +
      style.slice(1).toLowerCase()
    );
  };

  // ==================================================
  // FORMAT TRANSPORT
  // ==================================================
  const formatTransport = (transport) => {
    if (!transport) return 'Mixed';

    return (
      transport.charAt(0).toUpperCase() +
      transport.slice(1).toLowerCase()
    );
  };

  // ==================================================
  // TOTAL TRAVELERS
  // ==================================================
  const getTotalTravelers = (trip) => {
    const adults = Number(
      trip?.adults || 0
    );

    const children = Number(
      trip?.children || 0
    );

    return adults + children;
  };

  // ==================================================
  // ==================================================
  // GET STATUS
  // ==================================================
  const getTripStatus = (trip) => {
    if (trip?.status) {
      return trip.status;
    }
    return 'planned';
  };

  const getStatusConfig = (statusKey) => {
    return statusOptions.find(o => o.key === statusKey) || statusOptions[0];
  };

  const formatStatus = (status) => {
    if (!status) return 'Planned';
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  // ==================================================
  // UPDATE TRIP STATUS
  // ==================================================
  const changeTripStatus = async (tripId, newStatus) => {
    try {
      await updateTripStatus(tripId, newStatus);

      setPlannedTrips((current) =>
        current.map((trip) =>
          trip._id === tripId
            ? { ...trip, status: newStatus }
            : trip
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
      alert(error.message || 'Could not update trip status');
    }
  };

  return (
    <div className="min-h-screen bg-surface py-12">
      <div className="container-tp">

        {/* ==================================================
            HEADER
        ================================================== */}
        <div className="text-center mb-10">

          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-50 mb-4">
            <Compass
              size={28}
              className="text-primary-500"
            />
          </div>

          <h1 className="text-4xl font-display font-bold text-dark mb-3">
            Your Saved Trips
          </h1>

          <p className="text-lg text-muted max-w-2xl mx-auto">
            Manage your saved destinations,
            experiences, and trips you've planned.
          </p>

        </div>

        {/* ==================================================
            TABS
        ================================================== */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">

          {tabs.map((tab) => {

            const Icon = tab.icon;

            const count =
              tab.key === 'destinations'
                ? savedDestIds.length
                : tab.key === 'experiences'
                ? savedExpIds.length
                : plannedTrips.length;

            return (
              <button
                key={tab.key}
                onClick={() =>
                  setActiveTab(tab.key)
                }
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary-500 text-white shadow'
                    : 'bg-white text-text hover:bg-primary-50'
                }`}
              >

                <Icon size={18} />

                <span>
                  {tab.label}
                </span>

                <span
                  className={`badge ${
                    activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-primary-50 text-primary-500'
                  }`}
                >
                  {count}
                </span>

              </button>
            );
          })}

        </div>

        {/* ==================================================
            SAVED DESTINATIONS
        ================================================== */}
        {activeTab === 'destinations' && (
          <div>

            {savedDestData.length > 0 ? (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

                {savedDestData.map(
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

                      <div className="relative h-40">

                        <DestinationImageCarousel
                          images={dest.images || (dest.image ? [dest.image] : [])}
                          alt={dest.name}
                          height="h-40"
                          autoPlay={5000}
                          showDots={false}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

                        <div className="absolute bottom-3 left-4">

                          <h3 className="text-white font-display font-semibold text-lg">
                            {dest.name}
                          </h3>

                          <p className="text-white/70 text-sm">
                            {dest.country}
                          </p>

                        </div>

                        <button
                          onClick={() =>
                            removeDestination(
                              dest.id
                            )
                          }
                          className="absolute top-3 right-3 p-2 rounded-lg bg-white/90 hover:bg-red-50 transition-colors"
                          aria-label={`Remove ${dest.name}`}
                        >
                          <Trash2
                            size={16}
                            className="text-red-500"
                          />
                        </button>

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
                          className="btn-secondary w-full text-sm"
                        >
                          View Destination
                          <ArrowRight size={16} />
                        </Link>

                      </div>

                    </motion.div>

                  )
                )}

              </div>

            ) : (

              <EmptyState
                title="No saved destinations"
                description="Save destinations you're interested in to plan your next trip."
                icon={Heart}
                action={
                  <Link
                    to="/explore"
                    className="btn-primary"
                  >
                    Explore Destinations
                  </Link>
                }
              />

            )}

          </div>
        )}

        {/* ==================================================
            SAVED EXPERIENCES
        ================================================== */}
        {activeTab === 'experiences' && (
          <div>

            {savedExpData.length > 0 ? (

              <div className="grid sm:grid-cols-2 gap-6">

                {savedExpData.map(
                  (exp, index) => (

                    <motion.div
                      key={exp.id}
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
                      className="card p-6"
                    >

                      <div className="flex items-center justify-between mb-3">

                        <h3 className="font-display font-semibold text-dark">
                          {exp.title}
                        </h3>

                        <button
                          onClick={() =>
                            removeExperience(
                              exp.id
                            )
                          }
                          className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                          aria-label="Remove experience"
                        >
                          <Trash2
                            size={16}
                            className="text-red-500"
                          />
                        </button>

                      </div>

                      <p className="text-sm text-muted mb-4">
                        {exp.destination} ·{' '}
                        {exp.duration} · ~
                        {formatINR(exp.budget)}
                      </p>

                      <Link
                        to={`/experience/${exp.id}`}
                        className="btn-secondary w-full text-sm"
                      >
                        Read Story
                        <ArrowRight size={16} />
                      </Link>

                    </motion.div>

                  )
                )}

              </div>

            ) : (

              <EmptyState
                title="No saved experiences"
                description="Save experiences you find helpful for future reference."
                icon={Bookmark}
                action={
                  <Link
                    to="/experiences"
                    className="btn-primary"
                  >
                    Browse Experiences
                  </Link>
                }
              />

            )}

          </div>
        )}

        {/* ==================================================
            MONGODB PLANNED TRIPS
        ================================================== */}
        {activeTab === 'trips' && (
          <div>

            {/* Loading */}
            {loadingTrips && (
              <div className="card p-10 text-center">

                <div className="w-10 h-10 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />

                <h3 className="font-display font-semibold text-dark text-lg mb-2">
                  Loading your trips...
                </h3>

                <p className="text-muted">
                  Fetching your saved trips from MongoDB.
                </p>

              </div>
            )}

            {/* Error */}
            {!loadingTrips && tripError && (
              <div className="card p-8 text-center border border-red-200">

                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-500 text-xl">
                    !
                  </span>
                </div>

                <h3 className="font-display font-semibold text-dark text-lg mb-2">
                  Could not load trips
                </h3>

                <p className="text-muted mb-5">
                  {tripError}
                </p>

                <button
                  onClick={() =>
                    window.location.reload()
                  }
                  className="btn-primary"
                >
                  Try Again
                </button>

              </div>
            )}

            {/* Empty */}
            {!loadingTrips &&
              !tripError &&
              plannedTrips.length === 0 && (

                <EmptyState
                  title="No planned trips"
                  description="Start planning your next adventure and your saved trips will appear here."
                  icon={Compass}
                  action={
                    <Link
                      to="/plan"
                      className="btn-primary"
                    >
                      <Plus size={18} />
                      Plan a Trip
                    </Link>
                  }
                />

              )}

            {/* Trips */}
            {!loadingTrips &&
              !tripError &&
              plannedTrips.length > 0 && (

                <div className="grid md:grid-cols-2 gap-6">

                  {plannedTrips.map(
                    (trip, index) => {

                      const dest =
                        getDestination(
                          trip.destinationId
                        );

                      const totalTravelers =
                        getTotalTravelers(
                          trip
                        );

                      const tripStatus =
                        getTripStatus(
                          trip
                        );

                      const statusConfig =
                        getStatusConfig(
                          tripStatus
                        );

                      return (

                        <motion.div
                          key={trip._id}
                          initial={{
                            opacity: 0,
                            y: 25
                          }}
                          animate={{
                            opacity: 1,
                            y: 0
                          }}
                          transition={{
                            delay: index * 0.08
                          }}
                          className="card overflow-hidden group"
                        >

                          {/* IMAGE */}
                          <div className="relative h-44">

                            {dest?.image ? (

                              <DestinationImageCarousel
                                images={dest.images || (dest.image ? [dest.image] : [])}
                                alt={dest.name}
                                height="h-full"
                                autoPlay={5000}
                                showDots={false}
                                className="group-hover:scale-105 transition-transform duration-500"
                              />

                            ) : (

                              <div className="w-full h-full bg-primary-50 flex items-center justify-center">

                                <Compass
                                  size={48}
                                  className="text-primary-500"
                                />

                              </div>

                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                            {/* Status Selector */}
                            <div className="absolute top-4 right-4">

                              <div className="flex gap-1 bg-white/90 backdrop-blur-sm rounded-xl p-1">
                                {statusOptions.map((opt) => (
                                  <button
                                    key={opt.key}
                                    onClick={() => changeTripStatus(trip._id, opt.key)}
                                    className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                                      tripStatus === opt.key
                                        ? opt.color
                                        : 'text-gray-400 hover:text-gray-600'
                                    }`}
                                    title={`Mark as ${opt.label}`}
                                  >
                                    {opt.label}
                                  </button>
                                ))}
                              </div>

                            </div>

                            {/* Destination */}
                            <div className="absolute bottom-4 left-5">

                              <h3 className="text-white font-display font-bold text-2xl">
                                {dest?.name ||
                                  trip.destinationId}
                              </h3>

                              <p className="text-white/80 text-sm flex items-center gap-1">
                                <MapPin size={14} />

                                {dest?.country ||
                                  'India'}
                              </p>

                            </div>

                          </div>

                          {/* TRIP CONTENT */}
                          <div className="p-5">

                            {/* Starting City */}
                            <div className="flex items-center gap-2 mb-4">

                              <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">

                                <MapPin
                                  size={18}
                                  className="text-primary-500"
                                />

                              </div>

                              <div>

                                <p className="text-xs text-muted">
                                  Starting from
                                </p>

                                <p className="font-semibold text-dark">
                                  {trip.startingCity}
                                </p>

                              </div>

                            </div>

                            {/* Main Details */}
                            <div className="grid grid-cols-2 gap-3 mb-5">

                              {/* Travelers */}
                              <div className="rounded-xl bg-surface p-3">

                                <div className="flex items-center gap-2 mb-1">

                                  <Users
                                    size={16}
                                    className="text-primary-500"
                                  />

                                  <span className="text-xs text-muted">
                                    Travelers
                                  </span>

                                </div>

                                <p className="font-semibold text-dark">
                                  {totalTravelers}
                                </p>

                                <p className="text-xs text-muted">
                                  {trip.adults || 0}
                                  {' '}adults

                                  {trip.children > 0
                                    ? ` · ${trip.children} children`
                                    : ''}
                                </p>

                              </div>

                              {/* Duration */}
                              <div className="rounded-xl bg-surface p-3">

                                <div className="flex items-center gap-2 mb-1">

                                  <Clock
                                    size={16}
                                    className="text-primary-500"
                                  />

                                  <span className="text-xs text-muted">
                                    Duration
                                  </span>

                                </div>

                                <p className="font-semibold text-dark">
                                  {trip.days} days
                                </p>

                                <p className="text-xs text-muted">

                                  {Math.max(
                                    Number(
                                      trip.days || 1
                                    ) - 1,
                                    1
                                  )}

                                  {' '}nights

                                </p>

                              </div>

                              {/* Month */}
                              <div className="rounded-xl bg-surface p-3">

                                <div className="flex items-center gap-2 mb-1">

                                  <Calendar
                                    size={16}
                                    className="text-primary-500"
                                  />

                                  <span className="text-xs text-muted">
                                    Travel Month
                                  </span>

                                </div>

                                <p className="font-semibold text-dark">
                                  {trip.travelMonth ||
                                    'Not selected'}
                                </p>

                                <p className="text-xs text-muted">
                                  {formatTripDate(
                                    trip
                                  )}
                                </p>

                              </div>

                              {/* Style */}
                              <div className="rounded-xl bg-surface p-3">

                                <div className="flex items-center gap-2 mb-1">

                                  <Wallet
                                    size={16}
                                    className="text-primary-500"
                                  />

                                  <span className="text-xs text-muted">
                                    Travel Style
                                  </span>

                                </div>

                                <p className="font-semibold text-dark">
                                  {formatStyle(
                                    trip.travelStyle
                                  )}
                                </p>

                                <p className="text-xs text-muted">
                                  {formatTransport(
                                    trip.transportPreference
                                  )}
                                </p>

                              </div>

                            </div>

                            {/* Trip Summary */}
                            <div className="border-t border-gray-100 pt-4 mb-5">

                              <p className="text-sm font-semibold text-dark mb-3">
                                Trip Summary
                              </p>

                              <div className="space-y-2 text-sm">

                                <div className="flex items-center justify-between">

                                  <span className="flex items-center gap-2 text-muted">
                                    <UserRound size={15} />
                                    Starting City
                                  </span>

                                  <span className="font-medium text-dark">
                                    {trip.startingCity}
                                  </span>

                                </div>

                                <div className="flex items-center justify-between">

                                  <span className="flex items-center gap-2 text-muted">
                                    <Plane size={15} />
                                    Transport
                                  </span>

                                  <span className="font-medium text-dark">
                                    {formatTransport(
                                      trip.transportPreference
                                    )}
                                  </span>

                                </div>

                                <div className="flex items-center justify-between">

                                  <span className="flex items-center gap-2 text-muted">
                                    <Hotel size={15} />
                                    Style
                                  </span>

                                  <span className="font-medium text-dark">
                                    {formatStyle(
                                      trip.travelStyle
                                    )}
                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">

                              <Link
                                to={`/trip/${trip._id}/edit`}
                                className="btn-secondary flex-1 text-sm"
                              >
                                <Pencil size={16} />
                                Edit Trip
                              </Link>

                              {dest && (

                                <Link
                                  to={`/destination/${dest.id}`}
                                  className="btn-secondary px-4"
                                  title="View destination"
                                >
                                  <ArrowRight
                                    size={18}
                                  />
                                </Link>

                              )}

                              {/* DELETE */}
                              <button
                                onClick={() =>
                                  removeTrip(
                                    trip._id
                                  )
                                }
                                disabled={
                                  deletingTripId ===
                                  trip._id
                                }
                                className={`p-2.5 rounded-xl border-2 transition-colors ${
                                  deletingTripId ===
                                  trip._id
                                    ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
                                    : 'border-gray-200 hover:border-red-200 hover:bg-red-50'
                                }`}
                                aria-label="Remove trip"
                                title="Delete trip"
                              >

                                {deletingTripId ===
                                trip._id ? (

                                  <div className="w-[17px] h-[17px] border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />

                                ) : (

                                  <Trash2
                                    size={17}
                                    className="text-red-500"
                                  />

                                )}

                              </button>

                            </div>

                          </div>

                        </motion.div>

                      );
                    }
                  )}

                </div>

              )}

          </div>
        )}

      </div>
    </div>
  );
};

export default SavedTrips;
