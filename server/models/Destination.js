const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    cost: { type: Number, required: true },
    duration: { type: String },
    description: { type: String },
    image: { type: String }
  },
  { _id: false }
);

const budgetTierSchema = new mongoose.Schema(
  {
    price: { type: Number, required: true },
    accommodation: { type: String },
    transport: { type: String },
    food: { type: String },
    activities: { type: String },
    benefits: [{ type: String }]
  },
  { _id: false }
);

const destinationSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      trim: true
    },
    region: {
      type: String,
      trim: true
    },
    description: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    images: [{ type: String }],
    tags: [{ type: String }],
    bestTime: { type: String },
    idealDuration: { type: String },
    avgTemp: { type: String },
    popularity: { type: Number, default: 85 },
    startingBudget: { type: Number, required: true },
    budgetTiers: {
      budget: budgetTierSchema,
      comfort: budgetTierSchema,
      premium: budgetTierSchema,
      luxury: budgetTierSchema
    },
    travelCost: { type: Number, default: 0 },
    accommodationCost: { type: Number, default: 0 },
    foodCost: { type: Number, default: 0 },
    localTransportCost: { type: Number, default: 0 },
    activityCost: { type: Number, default: 0 },
    miscellaneousCost: { type: Number, default: 0 },
    travelStyle: [{ type: String }],
    activities: [activitySchema]
  },
  {
    timestamps: true
  }
);

destinationSchema.index({ name: "text", country: "text", state: "text" });
destinationSchema.index({ country: 1 });
destinationSchema.index({ tags: 1 });

module.exports = mongoose.model(
  "Destination",
  destinationSchema
);
