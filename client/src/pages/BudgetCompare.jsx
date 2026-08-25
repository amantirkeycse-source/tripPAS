import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Trophy, ArrowRight } from 'lucide-react';

import destinations from '../data/destinations';
import ComparisonTable from '../components/ComparisonTable';
import { formatINR } from '../utils/format';
import calculateTripCost from '../utils/calculateTripCost';

const BudgetCompare = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
    currentTrip.compareDestinationIds?.length === 3
      ? currentTrip.compareDestinationIds
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
  }, [selectedIds]);

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

  const handleDestinationChange = (
    destinationId
  ) => {

    const alreadySelected =
      selectedIds.includes(
        destinationId
      );

    if (alreadySelected) {
      return;
    }

    const newIds = [
      ...selectedIds.slice(0, 2),
      destinationId
    ];

    navigate('/compare', {
      state: {
        ...currentTrip,
        compareDestinationIds:
          newIds
      },
      replace: true
    });
  };

  /*
  |--------------------------------------------------------------------------
  | Render
  |--------------------------------------------------------------------------
  */

  return (
    <div className="
      min-h-screen
      bg-surface
      py-12
    ">

      <div className="container-tp">

        {/* HEADER */}

        <div className="
          text-center
          mb-10
        ">

          <h1 className="
            text-4xl
            font-display
            font-bold
            text-dark
            mb-3
          ">
            Budget Comparison
          </h1>

          <p className="
            text-lg
            text-muted
            max-w-2xl
            mx-auto
          ">
            Compare destinations using your
            actual trip preferences and
            estimated costs.
          </p>

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
          className="
            card
            p-5
            mb-8
            bg-primary-50
            border
            border-primary-100
          "
        >

          <div className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-3
            text-sm
          ">

            <span className="
              font-semibold
              text-dark
            ">
              Your Trip:
            </span>

            <span className="
              px-3
              py-1
              rounded-full
              bg-white
              text-muted
            ">
              {currentTrip.adults || 2}
              {' '}
              Adults
            </span>

            {Number(
              currentTrip.children || 0
            ) > 0 && (
              <span className="
                px-3
                py-1
                rounded-full
                bg-white
                text-muted
              ">
                {currentTrip.children}
                {' '}
                Children
              </span>
            )}

            <span className="
              px-3
              py-1
              rounded-full
              bg-white
              text-muted
            ">
              {currentTrip.days || 3}
              {' '}
              Days
            </span>

            <span className="
              px-3
              py-1
              rounded-full
              bg-white
              text-muted
              capitalize
            ">
              {currentTrip.travelStyle ||
                'Budget'}
            </span>

            <span className="
              px-3
              py-1
              rounded-full
              bg-white
              text-muted
            ">
              {currentTrip.travelMonth ||
                'October'}
            </span>

            <span className="
              px-3
              py-1
              rounded-full
              bg-white
              text-muted
              capitalize
            ">
              {currentTrip.transportPreference ||
                'Mixed'}
            </span>

          </div>

        </motion.div>

        {/* DESTINATION SELECTOR */}

        <div className="
          card
          p-6
          mb-8
        ">

          <h2 className="
            text-lg
            font-display
            font-semibold
            text-dark
            mb-4
          ">
            Select destinations to compare
          </h2>

          <div className="
            grid
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-6
            gap-3
          ">

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
                      rounded-xl
                      overflow-hidden
                      border-2
                      transition-all
                      ${
                        isSelected
                          ? 'border-primary-500 ring-2 ring-primary-200'
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
                        h-20
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
                        font-semibold
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
                        w-5
                        h-5
                        rounded-full
                        bg-primary-500
                        flex
                        items-center
                        justify-center
                      ">
                        <span className="
                          text-white
                          text-xs
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
            className="
              card
              p-6
              mb-8
              bg-gradient-to-r
              from-primary-50
              to-teal-50
              border-primary-200
            "
          >

            <div className="
              flex
              items-center
              gap-4
            ">

              <div className="
                w-12
                h-12
                rounded-xl
                bg-primary-500
                flex
                items-center
                justify-center
                shrink-0
              ">

                <Trophy
                  size={24}
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
                ">
                  Estimated total:{' '}
                  <span className="
                    font-bold
                    text-primary-600
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

          </motion.div>
        )}

        {/* COMPARISON */}

        <div className="
          card
          p-6
        ">

          <h2 className="
            text-xl
            font-display
            font-semibold
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

      </div>

    </div>
  );
};

export default BudgetCompare;