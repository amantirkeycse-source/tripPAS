const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    startingCity: {
      type: String,
      required: true,
      trim: true
    },

    destinationId: {
      type: String,
      required: true
    },

    adults: {
      type: Number,
      required: true,
      min: 1
    },

    children: {
      type: Number,
      default: 0,
      min: 0
    },

    days: {
      type: Number,
      required: true,
      min: 1
    },

    travelMonth: {
      type: String,
      required: true
    },

    travelStyle: {
      type: String,
      required: true
    },

    transportPreference: {
      type: String,
      required: true
    },

    status: {
      type: String,
      enum: ["planned", "booked", "completed"],
      default: "planned"
    },

    notes: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Trip", tripSchema);