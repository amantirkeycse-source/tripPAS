const mongoose = require("mongoose");

const experienceUserSchema = new mongoose.Schema(
  {
    id: { type: String },
    name: { type: String, required: true },
    avatar: { type: String, default: "" },
    verified: { type: Boolean, default: false }
  },
  { _id: false }
);

const experienceSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    user: experienceUserSchema,
    destinationId: {
      type: String,
      required: true,
      trim: true
    },
    title: {
      type: String,
      required: true,
      trim: true
    },
    destination: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      default: ""
    },
    date: { type: String },
    duration: { type: String },
    budget: { type: Number, default: 0 },
    travelers: { type: Number, default: 1 },
    rating: { type: Number, min: 0, max: 5 },
    travelStyle: { type: String },
    storyPreview: { type: String },
    story: { type: String },
    whatILoved: { type: String },
    whatToAvoid: { type: String },
    whatIRecommend: { type: String },
    bestBudgetTip: { type: String },
    hiddenPlaces: { type: String },
    hidden: { type: String },
    likes: { type: Number, default: 0 },
    saves: { type: Number, default: 0 },
    anonymous: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

experienceSchema.index({ destinationId: 1 });
experienceSchema.index({ rating: -1 });
experienceSchema.index({ createdAt: -1 });

module.exports = mongoose.model(
  "Experience",
  experienceSchema
);
