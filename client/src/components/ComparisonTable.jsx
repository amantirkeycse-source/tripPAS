import { motion } from 'framer-motion';
import {
  IndianRupee,
  Hotel,
  Plane,
  Utensils,
  Sparkles,
  Car,
  User,
  Wallet
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
      highlight: true
    },
    {
      key: 'estimatedPerPerson',
      label: 'Per Person',
      icon: User,
      format: (value) => formatINR(value || 0)
    },
    {
      key: 'accommodationCost',
      label: 'Accommodation',
      icon: Hotel,
      format: (value) => formatINR(value || 0)
    },
    {
      key: 'travelCost',
      label: 'Travel',
      icon: Plane,
      format: (value) => formatINR(value || 0)
    },
    {
      key: 'foodCost',
      label: 'Food',
      icon: Utensils,
      format: (value) => formatINR(value || 0)
    },
    {
      key: 'localTransportCost',
      label: 'Local Transport',
      icon: Car,
      format: (value) => formatINR(value || 0)
    },
    {
      key: 'activitiesCost',
      label: 'Activities',
      icon: Sparkles,
      format: (value) => formatINR(value || 0)
    },
    {
      key: 'miscellaneousCost',
      label: 'Miscellaneous',
      icon: IndianRupee,
      format: (value) => formatINR(value || 0)
    },
    {
      key: 'idealDuration',
      label: 'Ideal Duration',
      format: (value) => value || '—'
    },
    {
      key: 'bestTime',
      label: 'Best Season',
      format: (value) => value || '—'
    }
  ];

  return (
    <div className="overflow-x-auto">

      <table className="w-full min-w-[750px]">

        {/* HEADER */}
        <thead>
          <tr className="border-b-2 border-gray-200">

            <th className="text-left py-5 px-4 text-sm font-semibold text-muted">
              Compare
            </th>

            {destinations.map((dest, index) => (
              <th
                key={dest.id}
                className="text-left py-5 px-4"
              >

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-3"
                >

                  <img
                    src={dest.image}
                    alt={dest.name}
                    className="w-12 h-12 rounded-xl object-cover"
                  />

                  <div>
                    <p className="font-semibold text-dark">
                      {dest.name}
                    </p>

                    <p className="text-xs text-muted">
                      {dest.country}
                    </p>
                  </div>

                </motion.div>

              </th>
            ))}

          </tr>
        </thead>

        {/* BODY */}
        <tbody>

          {rows.map((row, index) => {

            const Icon = row.icon;

            return (
              <motion.tr
                key={row.key}

                initial={{
                  opacity: 0,
                  y: 8
                }}

                animate={{
                  opacity: 1,
                  y: 0
                }}

                transition={{
                  delay: index * 0.05
                }}

                className={`
                  border-b border-gray-100
                  transition-colors
                  hover:bg-gray-50
                  ${
                    row.highlight
                      ? 'bg-primary-50/40'
                      : ''
                  }
                `}
              >

                {/* ROW NAME */}
                <td
                  className={`
                    py-4 px-4
                    text-sm
                    ${
                      row.highlight
                        ? 'font-bold text-dark'
                        : 'font-medium text-muted'
                    }
                  `}
                >

                  <div className="flex items-center gap-2">

                    {Icon && (
                      <Icon
                        size={16}
                        className="text-primary-500"
                      />
                    )}

                    {row.label}

                  </div>

                </td>

                {/* DESTINATION VALUES */}
                {destinations.map((dest) => {

                  const value = dest[row.key];

                  /*
                   * Highlight cheapest calculated destination
                   */
                  const isCheapest =
                    row.key === 'estimatedTotal' &&
                    destinations.length > 1 &&
                    value ===
                      Math.min(
                        ...destinations.map(
                          (d) => d.estimatedTotal || Infinity
                        )
                      );

                  return (
                    <td
                      key={dest.id}
                      className={`
                        py-4 px-4 text-sm
                        ${
                          row.highlight
                            ? 'font-bold text-primary-600 text-base'
                            : 'font-semibold text-text'
                        }
                      `}
                    >

                      <div className="flex items-center gap-2">

                        {row.format(value)}

                        {isCheapest && (
                          <span
                            className="
                              text-[10px]
                              px-2
                              py-1
                              rounded-full
                              bg-primary-100
                              text-primary-700
                              font-semibold
                            "
                          >
                            Best
                          </span>
                        )}

                      </div>

                    </td>
                  );
                })}

              </motion.tr>
            );
          })}

        </tbody>

      </table>

      {/* CURRENT TRIP INFO */}
      {tripParams && (
        <div className="mt-6 pt-5 border-t border-gray-100">

          <p className="text-xs text-muted text-center">

            Comparison calculated for{' '}

            <span className="font-semibold text-dark">
              {tripParams.travelers} traveler
              {tripParams.travelers !== 1 ? 's' : ''}
            </span>

            {' · '}

            <span className="font-semibold text-dark">
              {tripParams.days} days
            </span>

            {' · '}

            <span className="font-semibold text-dark capitalize">
              {tripParams.travelStyle}
            </span>

            {' · '}

            <span className="font-semibold text-dark">
              {tripParams.travelMonth}
            </span>

            {' · '}

            <span className="font-semibold text-dark capitalize">
              {tripParams.transportPreference}
            </span>

          </p>

        </div>
      )}

    </div>
  );
};

export default ComparisonTable;