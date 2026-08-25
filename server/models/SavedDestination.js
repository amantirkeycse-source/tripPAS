const mongoose = require("mongoose");

const savedDestinationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    destinationId: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Same destination ko same user dobara save nahi kar sakta
savedDestinationSchema.index(
  { userId: 1, destinationId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "SavedDestination",
  savedDestinationSchema
);