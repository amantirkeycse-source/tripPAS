import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

import {
  MapPin,
  Users,
  Calendar,
  Check,
  ArrowUp,
  Sparkles,
  TrendingUp
} from 'lucide-react';

import {
  calculateTripCost,
  getTierFromBudget
} from '../utils/calculateTripCost';

import { formatINR } from '../utils/format';

import BudgetSlider from '../components/BudgetSlider';
import BudgetBreakdown from '../components/BudgetBreakdown';
import EmptyState from '../components/EmptyState';


const BudgetAnalyzer = () => {

  const location = useLocation();
  const navigate = useNavigate();

  /*
  |--------------------------------------------------------------------------
  | Trip data received from Trip Planner
  |--------------------------------------------------------------------------
  */

  const tripData = location.state || {};

  const destination = tripData.destination;


  /*
  |--------------------------------------------------------------------------
  | Normalize trip values
  |--------------------------------------------------------------------------
  */

  const adults = Number(tripData.adults || 2);

  const children = Number(
    tripData.children || 0
  );

  const days = Number(
    tripData.days || 3
  );

  const travelMonth =
    tripData.travelMonth || 'October';

  const travelStyle =
    tripData.travelStyle || 'budget';

  const transportPreference =
    tripData.transportPreference || 'mixed';


  /*
  |--------------------------------------------------------------------------
  | Total travelers
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  | calculateTripCost expects TOTAL travelers.
  |
  */

  const totalTravelers =
    adults + children;


  /*
  |--------------------------------------------------------------------------
  | Budget state
  |--------------------------------------------------------------------------
  */

  const [budget, setBudget] = useState(
    destination?.startingBudget || 12500
  );


  /*
  |--------------------------------------------------------------------------
  | Calculate trip cost
  |--------------------------------------------------------------------------
  */

  const cost = useMemo(() => {

    if (!destination) {
      return null;
    }

    return calculateTripCost({

      destination,

      travelers: totalTravelers,

      children,

      days,

      travelMonth,

      travelStyle,

      transportPreference

    });

  }, [
    destination,
    totalTravelers,
    children,
    days,
    travelMonth,
    travelStyle,
    transportPreference
  ]);


  /*
  |--------------------------------------------------------------------------
  | Budget tiers
  |--------------------------------------------------------------------------
  */

  const tierInfo = useMemo(() => {

    if (!destination?.budgetTiers) {
      return null;
    }

    return getTierFromBudget(
      destination.budgetTiers,
      budget
    );

  }, [
    destination,
    budget
  ]);


  /*
  |--------------------------------------------------------------------------
  | No trip data
  |--------------------------------------------------------------------------
  */

  if (!destination || !cost) {

    return (
      <div className="container-tp pt-28 pb-20">

        <EmptyState
          title="No trip data found"
          description="Plan a trip first to see your budget analysis."
          action={
            <button
              onClick={() => navigate('/plan')}
              className="btn-primary"
            >
              Plan My Trip
            </button>
          }
        />

      </div>
    );
  }


  /*
  |--------------------------------------------------------------------------
  | Budget slider
  |--------------------------------------------------------------------------
  */

  const maxBudget = Math.max(
    destination.budgetTiers?.luxury?.price || 40000,
    50000
  );

  const minBudget =
    destination.startingBudget;


  /*
  |--------------------------------------------------------------------------
  | Chart data
  |--------------------------------------------------------------------------
  */

  const chartData =
    cost.breakdown.map((item) => ({
      name: item.label,
      value: item.amount,
      color: item.color
    }));


  /*
  |--------------------------------------------------------------------------
  | Extra budget
  |--------------------------------------------------------------------------
  */

  const extraAmount =
    Math.max(
      budget - minBudget,
      0
    );


  /*
  |--------------------------------------------------------------------------
  | Compare destinations
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  | We send ALL current trip data to Compare page.
  |
  */

  const handleCompare = () => {

    navigate('/compare', {

      state: {

        ...tripData,

        destination,

        adults,

        children,

        days,

        travelMonth,

        travelStyle,

        transportPreference,

        travelers: totalTravelers

      }

    });

  };


  return (

    <div className="
      min-h-screen
      bg-surface
      pt-28
      pb-12
    ">

      <div className="container-tp">


        {/* ============================================================
            HEADER
        ============================================================ */}

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
            Your Trip Budget
          </h1>


          <div className="
            flex
            flex-wrap
            items-center
            justify-center
            gap-4
            text-sm
            text-muted
          ">

            {/* Destination */}

            <span className="
              flex
              items-center
              gap-1
            ">

              <MapPin
                size={16}
                className="text-primary-500"
              />

              {destination.name},{' '}
              {destination.country}

            </span>


            {/* Days */}

            <span className="
              flex
              items-center
              gap-1
            ">

              <Calendar
                size={16}
                className="text-primary-500"
              />

              {days} days

            </span>


            {/* Travelers */}

            <span className="
              flex
              items-center
              gap-1
            ">

              <Users
                size={16}
                className="text-primary-500"
              />

              {totalTravelers} travelers

            </span>

          </div>

        </div>



        {/* ============================================================
            MAIN SECTION
        ============================================================ */}

        <div className="
          grid
          lg:grid-cols-2
          gap-8
          mb-12
        ">


          {/* ==========================================================
              COST BREAKDOWN
          ========================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5
            }}
            className="card p-6"
          >

            <h2 className="
              text-xl
              font-display
              font-semibold
              text-dark
              mb-4
            ">
              Cost Breakdown
            </h2>


            {/* Donut */}

            <div className="h-64">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >

                    {chartData.map(
                      (entry, index) => (

                        <Cell
                          key={`cell-${index}`}
                          fill={entry.color}
                        />

                      )
                    )}

                  </Pie>


                  <Tooltip
                    formatter={(value) =>
                      formatINR(value)
                    }
                    contentStyle={{
                      borderRadius: '12px',
                      border:
                        '1px solid #E2E8F0'
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>


            {/* Breakdown */}

            <div className="mt-4">

              <BudgetBreakdown
                breakdown={cost.breakdown}
                total={cost.total}
              />

            </div>

          </motion.div>



          {/* ==========================================================
              BUDGET SLIDER
          ========================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.1
            }}
            className="card p-6"
          >

            <h2 className="
              text-xl
              font-display
              font-semibold
              text-dark
              mb-2
            ">
              Adjust Your Budget
            </h2>


            <p className="
              text-sm
              text-muted
              mb-6
            ">
              See what your budget unlocks
              at different levels.
            </p>


            {/* Minimum cost */}

            <div className="
              text-center
              mb-8
            ">

              <p className="
                text-sm
                text-muted
                mb-1
              ">
                Estimated Minimum Trip Cost
              </p>


              <motion.p
                key={budget}
                initial={{
                  scale: 1.05
                }}
                animate={{
                  scale: 1
                }}
                className="
                  text-5xl
                  font-display
                  font-bold
                  text-primary-500
                "
              >

                {formatINR(budget)}

              </motion.p>

            </div>


            {/* Slider */}

            <BudgetSlider
              value={budget}
              min={minBudget}
              max={maxBudget}
              onChange={setBudget}
              label="Your trip budget"
            />


            {/* ========================================================
                CURRENT / NEXT TIER
            ======================================================== */}

            {tierInfo && (

              <div className="mt-8">

                <AnimatePresence
                  mode="wait"
                >

                  {/* CURRENT TIER */}

                  <motion.div
                    key={
                      tierInfo.current?.key
                    }
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    exit={{
                      opacity: 0,
                      y: -10
                    }}
                    transition={{
                      duration: 0.3
                    }}
                    className="
                      p-4
                      rounded-xl
                      bg-primary-50
                      border
                      border-primary-100
                    "
                  >

                    <div className="
                      flex
                      items-center
                      justify-between
                      mb-2
                    ">

                      <span className="
                        text-sm
                        font-semibold
                        text-primary-500
                      ">
                        Current Tier
                      </span>


                      <span className="
                        badge
                        bg-primary-500
                        text-white
                      ">
                        {tierInfo.current?.name}
                      </span>

                    </div>


                    <p className="
                      text-2xl
                      font-display
                      font-bold
                      text-dark
                      mb-3
                    ">
                      {formatINR(
                        tierInfo.current?.price
                      )}
                    </p>


                    <ul className="
                      space-y-1.5
                    ">

                      {(
                        tierInfo.current
                          ?.benefits || []
                      ).map(
                        (benefit) => (

                          <li
                            key={benefit}
                            className="
                              flex
                              items-start
                              gap-2
                              text-sm
                              text-text
                            "
                          >

                            <Check
                              size={14}
                              className="
                                text-primary-500
                                mt-0.5
                                shrink-0
                              "
                            />

                            {benefit}

                          </li>

                        )
                      )}

                    </ul>

                  </motion.div>

                </AnimatePresence>



                {/* NEXT TIER */}

                {tierInfo.next && (

                  <div className="
                    mt-4
                    p-4
                    rounded-xl
                    bg-amber-50
                    border
                    border-amber-100
                  ">

                    <div className="
                      flex
                      items-center
                      justify-between
                      mb-2
                    ">

                      <span className="
                        text-sm
                        font-semibold
                        text-accent
                      ">
                        Next Tier
                      </span>


                      <span className="
                        badge
                        bg-accent
                        text-white
                      ">
                        {tierInfo.next.name}
                      </span>

                    </div>


                    <p className="
                      text-2xl
                      font-display
                      font-bold
                      text-dark
                      mb-2
                    ">
                      {formatINR(
                        tierInfo.next.price
                      )}
                    </p>


                    <p className="
                      text-sm
                      text-text
                      flex
                      items-start
                      gap-2
                    ">

                      <ArrowUp
                        size={16}
                        className="
                          text-accent
                          mt-0.5
                          shrink-0
                        "
                      />

                      Add{' '}
                      {formatINR(
                        tierInfo.additionalRequired
                      )}{' '}
                      to unlock better
                      accommodation,
                      improved transportation
                      and additional activities.

                    </p>

                  </div>

                )}

              </div>

            )}

          </motion.div>

        </div>



        {/* ============================================================
            EXTRA MONEY
        ============================================================ */}

        {extraAmount > 0 && (

          <motion.section
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.5,
              delay: 0.2
            }}
            className="
              card
              p-8
              mb-12
            "
          >

            <div className="
              flex
              items-center
              gap-3
              mb-6
            ">

              <div className="
                w-12
                h-12
                rounded-xl
                bg-primary-50
                flex
                items-center
                justify-center
              ">

                <TrendingUp
                  size={24}
                  className="text-primary-500"
                />

              </div>


              <div>

                <h2 className="
                  text-2xl
                  font-display
                  font-bold
                  text-dark
                ">
                  What your extra{' '}
                  {formatINR(extraAmount)}
                  {' '}
                  gets you
                </h2>


                <p className="
                  text-sm
                  text-muted
                ">
                  Compared to the minimum
                  budget of{' '}
                  {formatINR(minBudget)}
                </p>

              </div>

            </div>



            <div className="
              grid
              sm:grid-cols-3
              gap-4
            ">

              {[
                {
                  icon: Sparkles,
                  title: 'Better Stay',
                  desc:
                    tierInfo?.current
                      ?.accommodation ||
                    'Upgraded accommodation'
                },

                {
                  icon: TrendingUp,
                  title: 'Better Transport',
                  desc:
                    tierInfo?.current
                      ?.transport ||
                    'Improved transport options'
                },

                {
                  icon: Check,
                  title: 'More Activities',
                  desc:
                    tierInfo?.current
                      ?.activities ||
                    'Additional experiences'
                }

              ].map(
                (item, index) => (

                  <motion.div
                    key={item.title}
                    initial={{
                      opacity: 0,
                      y: 10
                    }}
                    animate={{
                      opacity: 1,
                      y: 0
                    }}
                    transition={{
                      delay:
                        index * 0.1
                    }}
                    className="
                      p-4
                      rounded-xl
                      bg-gray-50
                    "
                  >

                    <item.icon
                      size={20}
                      className="
                        text-primary-500
                        mb-2
                      "
                    />


                    <h3 className="
                      font-semibold
                      text-dark
                      mb-1
                    ">
                      {item.title}
                    </h3>


                    <p className="
                      text-sm
                      text-muted
                    ">
                      {item.desc}
                    </p>

                  </motion.div>

                )
              )}

            </div>

          </motion.section>

        )}



        {/* ============================================================
            COMPARE BUTTON
        ============================================================ */}

        <div className="
          text-center
        ">

          <button
            type="button"
            onClick={handleCompare}
            className="btn-primary"
          >

            Compare with Other Destinations

          </button>

        </div>


      </div>

    </div>

  );
};


export default BudgetAnalyzer;