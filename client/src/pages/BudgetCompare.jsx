import { useMemo, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight, BarChart3 } from 'lucide-react';

import { getDestinations } from '../services/api';
import ComparisonTable from '../components/ComparisonTable';
import { formatINR } from '../utils/format';
import calculateTripCost from '../utils/calculateTripCost';

const BudgetCompare = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);

      const res = await getDestinations();

      console.log('BudgetCompare destinations response:', res);

      const destinationList =
        Array.isArray(res)
          ? res
          : Array.isArray(res?.destinations)
            ? res.destinations
            : Array.isArray(res?.data?.destinations)
              ? res.data.destinations
              : Array.isArray(res?.data)
                ? res.data
                : [];

      setDestinations(destinationList);

      console.log(
        'BudgetCompare loaded destinations:',
        destinationList
      );

    } catch (error) {
      console.error(
        'Failed to load destinations:',
        error
      );

      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);

  /*
  |--------------------------------------------------------------------------
  | Get current trip data
  |--------------------------------------------------------------------------
  */

  const tripParams = location.state || {};

  /*
  |--------------------------------------------------------------------------
  | Get saved trip from sessionStorage
  |--------------------------------------------------------------------------
  */

  let savedTrip = {};

  try {
    const storedTrip = sessionStorage.getItem(
      'tripPAS_current_trip'
    );

    if (storedTrip) {
      savedTrip = JSON.parse(storedTrip);
    }
  } catch (error) {
    console.error(
      'Could not read saved trip:',
      error
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Combine current navigation state + saved trip
  |--------------------------------------------------------------------------
  */

  const currentTrip = {
    ...savedTrip,
    ...tripParams
  };

  /*
  |--------------------------------------------------------------------------
  | Selected destinations
  |--------------------------------------------------------------------------
  */

  const [defaultOne, defaultTwo, defaultThree] =
    destinations;

  const selectedIds =
  currentTrip.compareDestinationIds?.length
    ? currentTrip.compareDestinationIds.slice(0, 3)
    : [
        defaultOne?.id,
        defaultTwo?.id,
        defaultThree?.id
      ].filter(Boolean);
  /*
  |--------------------------------------------------------------------------
  | Selected destination objects
  |--------------------------------------------------------------------------
  */

  const selectedDestinations = useMemo(() => {
    return selectedIds
      .map((id) =>
        destinations.find(
          (destination) =>
            destination.id === id
        )
      )
      .filter(Boolean);
  }, [selectedIds, destinations]);

  /*
  |--------------------------------------------------------------------------
  | REAL-TIME COST CALCULATION
  |--------------------------------------------------------------------------
  */

  const calculatedDestinations = useMemo(() => {

    return selectedDestinations.map(
      (destination) => {

        const result =
          calculateTripCost({
            destination,

            /*
            | Actual planner values
            */
            travelers:
              Number(
                currentTrip.adults || 2
              ) +
              Number(
                currentTrip.children || 0
              ),

            children:
              Number(
                currentTrip.children || 0
              ),

            days:
              Number(
                currentTrip.days || 3
              ),

            travelMonth:
              currentTrip.travelMonth ||
              'October',

            travelStyle:
              currentTrip.travelStyle ||
              'budget',

            transportPreference:
              currentTrip.transportPreference ||
              'mixed'
          });

        /*
        |--------------------------------------------------------------------------
        | Add calculated values to destination
        |--------------------------------------------------------------------------
        */

        return {
          ...destination,

          estimatedTotal:
            result.total,

          estimatedPerPerson:
            result.perPerson,

          accommodationCost:
            result.accommodation,

          travelCost:
            result.travel,

          foodCost:
            result.food,

          localTransportCost:
            result.localTransport,

          activitiesCost:
            result.activities,

          miscellaneousCost:
            result.miscellaneous
        };
      }
    );

  }, [
    selectedDestinations,

    currentTrip.adults,
    currentTrip.children,
    currentTrip.days,
    currentTrip.travelMonth,
    currentTrip.travelStyle,
    currentTrip.transportPreference
  ]);

  /*
  |--------------------------------------------------------------------------
  | Best destination
  |--------------------------------------------------------------------------
  */

  const bestDestination =
    calculatedDestinations.length > 0
      ? calculatedDestinations.reduce(
          (best, destination) =>
            destination.estimatedTotal <
            best.estimatedTotal
              ? destination
              : best
        )
      : null;

  /*
  |--------------------------------------------------------------------------
  | Change destination
  |--------------------------------------------------------------------------
  */

  const handleDestinationChange = (destinationId) => {
  let newIds;

  if (selectedIds.includes(destinationId)) {
    // Remove selected destination
    newIds = selectedIds.filter(
      (id) => id !== destinationId
    );
  } else {
    // Maximum 3 destinations
    if (selectedIds.length >= 3) {
      return;
    }

    newIds = [...selectedIds, destinationId];
  }

  navigate('/compare', {
    state: {
      ...currentTrip,
      compareDestinationIds: newIds
    },
    replace: true
  });
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface pt-28 pb-12">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading destinations...</p>
        </div>
      </div>
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="min-h-screen bg-surface pt-28 pb-12">

      <div className="container-tp">

        {/* HEADER with decorative glows */}
        <div className="relative text-center mb-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-primary-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
          <div className="absolute -top-6 -left-16 w-[180px] h-[180px] bg-primary-400/8 rounded-full blur-3xl -z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-50 border border-primary-100 mb-5">
              <BarChart3 size={32} className="text-primary-500" />
            </div>
            <h1 className="text-4xl font-display font-bold text-dark mb-3">
              Budget Comparison
            </h1>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Compare destinations using your
              actual trip preferences and
              estimated costs.
            </p>
          </motion.div>
        </div>

        {/* CURRENT TRIP SUMMARY */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="card rounded-3xl overflow-hidden mb-8"
        >
          <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
          <div className="p-5">
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <span className="font-bold text-dark">
                Your Trip:
              </span>
              <span className="badge-primary">
                {currentTrip.adults || 2} Adults
              </span>
              {Number(currentTrip.children || 0) > 0 && (
                <span className="badge-primary">
                  {currentTrip.children} Children
                </span>
              )}
              <span className="badge-primary">
                {currentTrip.days || 3} Days
              </span>
              <span className="badge-primary capitalize">
                {currentTrip.travelStyle || 'Budget'}
              </span>
              <span className="badge-primary">
                {currentTrip.travelMonth || 'October'}
              </span>
              <span className="badge-primary capitalize">
                {currentTrip.transportPreference || 'Mixed'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* DESTINATION SELECTOR */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card rounded-3xl overflow-hidden mb-8"
        >
          <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
          <div className="p-6">
            <h2 className="text-lg font-display font-bold text-dark mb-5">
              Select destinations to compare
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">

              {destinations.map(
                (destination) => {

                  const isSelected =
                    selectedIds.includes(
                      destination.id
                    );

                  return (
                    <button
                      key={
                        destination.id
                      }
                      type="button"
                      onClick={() =>
                        handleDestinationChange(
                          destination.id
                        )
                      }
                      className={`
                        relative
                        rounded-2xl
                        overflow-hidden
                        border-2
                        transition-all
                        shadow-sm
                        hover:shadow-md
                        ${
                          isSelected
                            ? 'border-primary-500 ring-2 ring-primary-200 shadow-lg'
                            : 'border-gray-200 hover:border-primary-200'
                        }
                      `}
                    >

                      <img
                        src={
                          destination.image
                        }
                        alt={
                          destination.name
                        }
                        className="
                          w-full
                          h-24
                          object-cover
                        "
                      />

                      <div className="
                        absolute
                        inset-0
                        bg-gradient-to-t
                        from-black/70
                        to-transparent
                      " />

                      <div className="
                        absolute
                        bottom-2
                        left-2
                        right-2
                      ">

                        <p className="
                          text-white
                          text-xs
                          font-bold
                        ">
                          {
                            destination.name
                          }
                        </p>

                        <p className="
                          text-white/80
                          text-[10px]
                        ">
                          From{' '}
                          {formatINR(
                            destination.startingBudget
                          )}
                        </p>

                      </div>

                      {isSelected && (
                        <div className="
                          absolute
                          top-2
                          right-2
                          w-6
                          h-6
                          rounded-full
                          bg-primary-500
                          flex
                          items-center
                          justify-center
                          shadow-md
                        ">
                          <span className="
                            text-white
                            text-xs
                            font-bold
                          ">
                            ✓
                          </span>
                        </div>
                      )}

                    </button>
                  );
                }
              )}

            </div>
          </div>
        </motion.div>

        {/* BEST DESTINATION */}
        {bestDestination && (
          <motion.div
            key={
              bestDestination.id
            }
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="card rounded-3xl overflow-hidden mb-8"
          >
            <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
            <div className="p-6 bg-gradient-to-r from-primary-50 to-teal-50">

              <div className="flex items-center gap-4">

                <div className="
                  w-14
                  h-14
                  rounded-2xl
                  bg-primary-500
                  flex
                  items-center
                  justify-center
                  shrink-0
                  shadow-lg
                ">
                  <Trophy
                    size={28}
                    className="text-white"
                  />
                </div>

                <div className="flex-1">
                  <h2 className="
                    text-xl
                    font-display
                    font-bold
                    text-dark
                  ">
                    Best destination for
                    your trip:{' '}
                    {bestDestination.name}
                  </h2>
                  <p className="
                    text-sm
                    text-muted
                    mt-1
                  ">
                    Estimated total:{' '}
                    <span className="
                      font-bold
                      text-primary-600
                      text-base
                    ">
                      {formatINR(
                        bestDestination.estimatedTotal
                      )}
                    </span>
                  </p>
                </div>

                <a
                  href={`/destination/${bestDestination.id}`}
                  className="
                    btn-primary
                    hidden
                    sm:inline-flex
                  "
                >
                  Explore
                  <ArrowRight
                    size={18}
                  />
                </a>

              </div>

            </div>
          </motion.div>
        )}

        {/* COMPARISON */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card rounded-3xl overflow-hidden"
        >
          <div className="h-1 bg-gradient-to-r from-primary-500 to-primary-600" />
          <div className="p-6">

            <h2 className="
              text-xl
              font-display
              font-bold
              text-dark
              mb-6
            ">
              Side by Side Comparison
            </h2>

            <ComparisonTable
              destinations={
                calculatedDestinations
              }
              tripParams={{
                travelers:
                  Number(
                    currentTrip.adults || 2
                  ) +
                  Number(
                    currentTrip.children || 0
                  ),

                children:
                  Number(
                    currentTrip.children || 0
                  ),

                days:
                  Number(
                    currentTrip.days || 3
                  ),

                travelMonth:
                  currentTrip.travelMonth ||
                  'October',

                travelStyle:
                  currentTrip.travelStyle ||
                  'budget',

                transportPreference:
                  currentTrip.transportPreference ||
                  'mixed'
              }}
            />

          </div>
        </motion.div>

      </div>

    </div>
  );
};

export default BudgetCompare;
