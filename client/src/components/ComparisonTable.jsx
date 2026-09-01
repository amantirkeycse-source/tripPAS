import { motion } from 'framer-motion';
import {
  IndianRupee,
  Hotel,
  Plane,
  Utensils,
  Sparkles,
  Car,
  User,
  Wallet,
  CalendarDays,
  Sun,
  Trophy,
  TrendingDown,
  Zap
} from 'lucide-react';

import { formatINR } from '../utils/format';

const ComparisonTable = ({ destinations, tripParams }) => {
  if (!destinations?.length) return null;

  const rows = [
    {
      key: 'estimatedTotal',
      label: 'Estimated Total',
      icon: Wallet,
      format: (value) => formatINR(value || 0),
      highlight: true,
      category: 'summary'
    },
    {
      key: 'estimatedPerPerson',
      label: 'Per Person',
      icon: User,
      format: (value) => formatINR(value || 0),
      category: 'summary'
    },
    {
      key: 'accommodationCost',
      label: 'Accommodation',
      icon: Hotel,
      format: (value) => formatINR(value || 0),
      category: 'costs'
    },
    {
      key: 'travelCost',
      label: 'Travel',
      icon: Plane,
      format: (value) => formatINR(value || 0),
      category: 'costs'
    },
    {
      key: 'foodCost',
      label: 'Food',
      icon: Utensils,
      format: (value) => formatINR(value || 0),
      category: 'costs'
    },
    {
      key: 'localTransportCost',
      label: 'Local Transport',
      icon: Car,
      format: (value) => formatINR(value || 0),
      category: 'costs'
    },
    {
      key: 'activitiesCost',
      label: 'Activities',
      icon: Sparkles,
      format: (value) => formatINR(value || 0),
      category: 'costs'
    },
    {
      key: 'miscellaneousCost',
      label: 'Miscellaneous',
      icon: IndianRupee,
      format: (value) => formatINR(value || 0),
      category: 'costs'
    },
    {
      key: 'idealDuration',
      label: 'Ideal Duration',
      icon: CalendarDays,
      format: (value) => value || '—',
      category: 'details'
    },
    {
      key: 'bestTime',
      label: 'Best Season',
      icon: Sun,
      format: (value) => value || '—',
      category: 'details'
    }
  ];

  const cheapestDestination = destinations.reduce(
    (cheapest, destination) => {
      if (!cheapest) return destination;

      return (destination.estimatedTotal || Infinity) <
        (cheapest.estimatedTotal || Infinity)
        ? destination
        : cheapest;
    },
    null
  );

  const maxCost = Math.max(
    ...destinations.map((d) => d.estimatedTotal || 0)
  );

  return (
    <div className="space-y-4">

      {/* =========================
          DESTINATION HEADER CARDS - HORIZONTAL SCROLL
      ========================= */}

      <div>
        <div className="mb-3">
          <h2 className="text-2xl font-display font-bold text-dark">
            Budget Comparison
          </h2>
          <p className="text-sm text-text mt-1">
            Compare costs across {destinations.length} destinations
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory">

          {destinations.map((dest, index) => {
            const isCheapest =
              cheapestDestination?.id === dest.id;
            
            const savingsPercent = isCheapest 
              ? 0 
              : Math.round(
                  ((dest.estimatedTotal - cheapestDestination.estimatedTotal) / 
                   cheapestDestination.estimatedTotal) * 100
                );

            return (
              <motion.div
                key={dest.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }}
                className={`
                  group relative flex-shrink-0 w-80
                  rounded-2xl
                  bg-white
                  border-2
                  transition-all
                  duration-300
                  hover:shadow-lg
                  snap-start
                  ${
                    isCheapest
                      ? 'border-primary-400 ring-2 ring-primary-200 shadow-md'
                      : 'border-gray-200 shadow-sm hover:border-primary-300'
                  }
                `}
              >

                {/* BEST VALUE BADGE */}
                {isCheapest && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="
                      absolute
                      top-3
                      right-3
                      z-10
                      flex
                      items-center
                      gap-1
                      px-3
                      py-1.5
                      rounded-full
                      bg-gradient-to-r
                      from-primary-500
                      to-primary-600
                      text-white
                      text-xs
                      font-bold
                      shadow-md
                    "
                  >
                    <Trophy size={12} />
                    Best Value
                  </motion.div>
                )}

                {/* SAVINGS BADGE */}
                {!isCheapest && savingsPercent > 0 && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="
                      absolute
                      top-3
                      right-3
                      z-10
                      flex
                      items-center
                      gap-1
                      px-2.5
                      py-1
                      rounded-full
                      bg-orange-100
                      text-orange-700
                      text-xs
                      font-bold
                    "
                  >
                    <TrendingDown size={12} />
                    +{savingsPercent}%
                  </motion.div>
                )}

                {/* IMAGE */}
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">

                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="
                      w-full
                      h-full
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-110
                    "
                  />

                  <div className="
                    absolute
                    inset-0
                    bg-gradient-to-t
                    from-black/70
                    via-black/20
                    to-transparent
                  " />

                  <div className="
                    absolute
                    bottom-0
                    left-0
                    right-0
                    p-3
                  ">
                    <h3 className="
                      text-lg
                      font-display
                      font-bold
                      text-white
                    ">
                      {dest.name}
                    </h3>
                  </div>

                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-3">

                  {/* TOTAL COST */}
                  <div>
                    <p className="text-xs text-muted uppercase tracking-wide font-bold">
                      Budget
                    </p>
                    <p className={`
                      text-2xl
                      font-display
                      font-bold
                      ${isCheapest ? 'text-primary-600' : 'text-dark'}
                    `}>
                      {formatINR(dest.estimatedTotal || 0)}
                    </p>
                  </div>

                  {/* PER PERSON */}
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-xs text-muted uppercase font-semibold mb-0.5">
                      Per Person
                    </p>
                    <p className="text-sm font-bold text-dark">
                      {formatINR(dest.estimatedPerPerson || 0)}
                    </p>
                  </div>

                </div>

              </motion.div>
            );
          })}
        </div>
      </div>

      {/* =========================
          COMPACT COST BREAKDOWN TABLE
      ========================= */}

      <div className="
        bg-white
        rounded-2xl
        border-2
        border-gray-200
        shadow-md
        overflow-hidden
      ">

        <div className="
          px-6
          py-4
          border-b-2
          border-gray-100
          bg-gradient-to-r
          from-gray-50
          to-white
        ">
          <div className="flex items-center justify-between">
            <h3 className="
              text-lg
              font-display
              font-bold
              text-dark
            ">
              Cost Breakdown
            </h3>
            
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
              <Zap size={14} />
              {destinations.length} Destinations
            </div>
          </div>
        </div>

        {/* MOBILE CARD VIEW + DESKTOP TABLE */}
        <div className="overflow-x-auto">
          
          <table className="w-full min-w-[900px]">

            <thead>
              <tr className="border-b-2 border-gray-100 bg-gray-50/50">

                <th className="
                  w-[220px]
                  text-left
                  px-6
                  py-4
                  text-xs
                  uppercase
                  tracking-widest
                  font-bold
                  text-muted
                ">
                  Category
                </th>

                {destinations.map((dest, index) => {
                  const isCheapest = cheapestDestination?.id === dest.id;
                  
                  return (
                    <th
                      key={dest.id}
                      className={`
                        px-5
                        py-4
                        text-left
                        border-l
                        border-gray-100
                        ${isCheapest ? 'bg-primary-50/40' : 'bg-white'}
                      `}
                    >
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -4
                        }}
                        animate={{
                          opacity: 1,
                          y: 0
                        }}
                        transition={{
                          delay: index * 0.08
                        }}
                        className="space-y-1"
                      >
                        <p className="
                          font-bold
                          text-dark
                          text-sm
                        ">
                          {dest.name}
                        </p>

                        {isCheapest && (
                          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-600 text-white text-[9px] font-bold">
                            <Trophy size={10} />
                            Best
                          </div>
                        )}
                      </motion.div>
                    </th>
                  );
                })}

              </tr>
            </thead>

            <tbody>

              {rows.slice(0, 8).map((row, rowIndex) => {

                const Icon = row.icon;

                return (
                  <motion.tr
                    key={row.key}
                    initial={{
                      opacity: 0,
                      x: -4
                    }}
                    animate={{
                      opacity: 1,
                      x: 0
                    }}
                    transition={{
                      delay: rowIndex * 0.03
                    }}
                    className={`
                      border-b
                      border-gray-100
                      last:border-0
                      transition-colors
                      hover:bg-gray-50
                      ${
                        row.highlight
                          ? 'bg-gradient-to-r from-primary-50/60 via-primary-50/30 to-transparent'
                          : ''
                      }
                    `}
                  >

                    {/* LABEL */}
                    <td className="px-6 py-3.5">

                      <div className="flex items-center gap-2">

                        {Icon && (
                          <div className="
                            w-7
                            h-7
                            rounded-lg
                            bg-primary-100
                            flex
                            items-center
                            justify-center
                            flex-shrink-0
                          ">
                            <Icon
                              size={15}
                              className="text-primary-600"
                            />
                          </div>
                        )}

                        <span
                          className={`
                            text-sm
                            whitespace-nowrap
                            ${
                              row.highlight
                                ? 'font-bold text-dark'
                                : 'font-semibold text-text'
                            }
                          `}
                        >
                          {row.label}
                        </span>

                      </div>

                    </td>

                    {/* VALUES */}
                    {destinations.map((dest) => {

                      const value = dest[row.key];

                      const isCheapest =
                        row.key === 'estimatedTotal' &&
                        destinations.length > 1 &&
                        value ===
                          Math.min(
                            ...destinations.map(
                              (d) =>
                                d.estimatedTotal ||
                                Infinity
                            )
                          );

                      const isBestDestination = cheapestDestination?.id === dest.id;
                      const isHighlightRow = row.highlight;

                      return (
                        <td
                          key={dest.id}
                          className={`
                            px-5
                            py-3.5
                            border-l
                            border-gray-100
                            text-right
                            ${isBestDestination && isHighlightRow ? 'bg-primary-50/40' : ''}
                          `}
                        >

                          <motion.div
                            className="flex items-center justify-end gap-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                          >

                            <span
                              className={`
                                font-semibold
                                transition-colors
                                text-sm
                                ${
                                  isHighlightRow
                                    ? 'text-primary-600 font-bold'
                                    : 'text-text'
                                }
                              `}
                            >
                              {row.format(value)}
                            </span>

                            {isCheapest && (
                              <motion.span
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                className="
                                  inline-flex
                                  items-center
                                  gap-0.5
                                  px-1.5
                                  py-0.5
                                  rounded-full
                                  bg-primary-600
                                  text-white
                                  text-[8px]
                                  font-bold
                                  whitespace-nowrap
                                "
                              >
                                <Zap size={9} />
                                Best
                              </motion.span>
                            )}

                          </motion.div>

                        </td>
                      );
                    })}

                  </motion.tr>
                );
              })}

            </tbody>

          </table>

        </div>

        {/* TRIP PARAMETERS - COMPACT */}
        {tripParams && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="
              px-6
              py-3
              border-t-2
              border-gray-100
              bg-gradient-to-r
              from-gray-50
              to-white
            "
          >

            <div className="flex flex-wrap items-center gap-3 text-xs">

              <span className="text-muted font-semibold">Calculated for:</span>

              <div className="flex items-center gap-4">
                <span className="text-dark font-bold">{tripParams.travelers} travelers</span>
                <span className="text-gray-300">·</span>
                <span className="text-dark font-bold">{tripParams.days} days</span>
                <span className="text-gray-300">·</span>
                <span className="text-dark font-bold capitalize">{tripParams.travelStyle}</span>
                <span className="text-gray-300">·</span>
                <span className="text-dark font-bold">{tripParams.travelMonth}</span>
              </div>

            </div>

          </motion.div>
        )}

      </div>

    </div>
  );
};

export default ComparisonTable;