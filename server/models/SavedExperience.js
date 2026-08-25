const mongoose = require("mongoose");

const savedExperienceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    experienceId: {
      type: String,
      required: true,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

// Same experience ko same user dobara save nahi kar sakta
savedExperienceSchema.index(
  { userId: 1, experienceId: 1 },
  { unique: true }
);

module.exports = mongoose.model(
  "SavedExperience",
  savedExperienceSchema
);