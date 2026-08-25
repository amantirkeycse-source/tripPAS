// TripPAS Cost Calculation Utility

const RATES = {
  travel: {
    budget: 1500,
    comfort: 2500,
    premium: 4000,
    luxury: 6000
  },

  accommodation: {
    budget: 800,
    comfort: 1500,
    premium: 3000,
    luxury: 5500
  },

  food: {
    budget: 600,
    comfort: 900,
    premium: 1400,
    luxury: 2200
  },

  localTransport: {
    budget: 300,
    comfort: 600,
    premium: 1000,
    luxury: 1800
  },

  activities: {
    budget: 400,
    comfort: 800,
    premium: 1500,
    luxury: 2500
  },

  miscellaneous: {
    budget: 200,
    comfort: 350,
    premium: 600,
    luxury: 1000
  }
};

const TRANSPORT_MULTIPLIERS = {
  bus: 0.8,
  train: 0.9,
  flight: 1.8,
  car: 1.4,
  mixed: 1.1
};

const MONTH_PEAK_MULTIPLIERS = {
  October: 1.15,
  November: 1.1,
  December: 1.2,
  January: 1.15,
  February: 1.05,
  March: 1.1,
  April: 1.0,
  May: 0.95,
  June: 0.9,
  July: 0.85,
  August: 0.85,
  September: 0.9
};

const CHILD_FOOD_DISCOUNT = 0.5;
const CHILD_ACTIVITY_DISCOUNT = 0.6;

export const calculateTripCost = ({
  destination,
  travelers = 2,
  children = 0,
  days = 3,
  travelMonth = "October",
  travelStyle = "budget",
  transportPreference = "mixed"
}) => {

  // Normalize travel style
  const styleMap = {
    Budget: "budget",
    Comfort: "comfort",
    Premium: "premium",
    Luxury: "luxury",

    budget: "budget",
    comfort: "comfort",
    premium: "premium",
    luxury: "luxury"
  };

  const style =
    styleMap[String(travelStyle).trim()] || "budget";

  // IMPORTANT:
  // RATES is category -> style
  // So we select the style from every category.
  const rates = {
    travel: RATES.travel[style],
    accommodation: RATES.accommodation[style],
    food: RATES.food[style],
    localTransport: RATES.localTransport[style],
    activities: RATES.activities[style],
    miscellaneous: RATES.miscellaneous[style]
  };

  const adults = Math.max(travelers - children, 1);
  const nights = Math.max(days - 1, 1);

  // Destination-specific adjustment
  const destBase = destination?.startingBudget || 15000;
  const destAdjustment = destBase / 15000;

  // Month multiplier
  const monthMultiplier =
    MONTH_PEAK_MULTIPLIERS[travelMonth] || 1.0;

  // Transport multiplier
  const transportMult =
    TRANSPORT_MULTIPLIERS[transportPreference] || 1.1;

  // Round to nearest ₹10
  const round = (n) =>
    Math.max(Math.round(n / 10) * 10, 100);

  // -------------------------
  // COST CALCULATIONS
  // -------------------------

  const accommodation = round(
    rates.accommodation *
    adults *
    destAdjustment *
    nights
  );

  const travel = round(
    rates.travel *
    2 *
    destAdjustment *
    transportMult
  );

  const food = round(
    (
      rates.food * adults +
      rates.food * CHILD_FOOD_DISCOUNT * children
    ) *
    days *
    monthMultiplier *
    destAdjustment
  );

  const localTransport = round(
    rates.localTransport *
    adults *
    days *
    monthMultiplier *
    destAdjustment
  );

  const activities = round(
    (
      rates.activities * adults +
      rates.activities * CHILD_ACTIVITY_DISCOUNT * children
    ) *
    monthMultiplier *
    destAdjustment
  );

  const miscellaneous = round(
    rates.miscellaneous *
    adults *
    days *
    monthMultiplier *
    destAdjustment
  );

  const total =
    travel +
    accommodation +
    food +
    localTransport +
    activities +
    miscellaneous;

  return {
    travel,
    accommodation,
    food,
    localTransport,
    activities,
    miscellaneous,

    total,

    breakdown: [
      {
        label: "Travel",
        amount: travel,
        color: "#0F766E"
      },
      {
        label: "Accommodation",
        amount: accommodation,
        color: "#14B8A6"
      },
      {
        label: "Food",
        amount: food,
        color: "#F59E0B"
      },
      {
        label: "Local Transport",
        amount: localTransport,
        color: "#3B82F6"
      },
      {
        label: "Activities",
        amount: activities,
        color: "#8B5CF6"
      },
      {
        label: "Miscellaneous",
        amount: miscellaneous,
        color: "#94A3B8"
      }
    ],

    perPerson: round(
      total / Math.max(travelers, 1)
    ),

    currency: "₹",

    isEstimate: true
  };
};

export const getTierFromBudget = (
  budgetTiers,
  totalBudget
) => {

  const tiers = [
    {
      key: "budget",
      name: "Budget",
      ...budgetTiers?.budget
    },
    {
      key: "comfort",
      name: "Comfort",
      ...budgetTiers?.comfort
    },
    {
      key: "premium",
      name: "Premium",
      ...budgetTiers?.premium
    },
    {
      key: "luxury",
      name: "Luxury",
      ...budgetTiers?.luxury
    }
  ].filter(t => t.price);

  const current = tiers.reduce(
    (acc, tier) =>
      totalBudget >= tier.price
        ? tier
        : acc,
    tiers[0]
  );

  const next =
    tiers.find(t => t.price > totalBudget) || null;

  return {
    current,
    next,
    additionalRequired: next
      ? next.price - totalBudget
      : 0
  };
};

export default calculateTripCost;