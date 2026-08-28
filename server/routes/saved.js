const express = require("express");
const SavedDestination = require("../models/SavedDestination");
const SavedExperience = require("../models/SavedExperience");
const { protect } = require("../middleware/auth");

const router = express.Router();

// --- Saved Destinations ---

router.get("/destinations", protect, async (req, res, next) => {
  try {
    const savedDestinations = await SavedDestination.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json({ success: true, savedDestinations });
  } catch (error) {
    next(error);
  }
});

router.post("/destinations", protect, async (req, res, next) => {
  try {
    const { destinationId } = req.body;

    if (!destinationId) {
      return res.status(400).json({
        success: false,
        message: "Destination ID is required."
      });
    }

    const savedDestination = await SavedDestination.create({
      userId: req.userId,
      destinationId
    });

    res.status(201).json({ success: true, savedDestination });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Destination already saved."
      });
    }
    next(error);
  }
});

router.delete(
  "/destinations/:destinationId",
  protect,
  async (req, res, next) => {
    try {
      const deleted = await SavedDestination.findOneAndDelete({
        userId: req.userId,
        destinationId: req.params.destinationId
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Saved destination not found."
        });
      }

      res.json({
        success: true,
        message: "Destination removed successfully."
      });
    } catch (error) {
      next(error);
    }
  }
);

// --- Saved Experiences ---

router.get("/experiences", protect, async (req, res, next) => {
  try {
    const savedExperiences = await SavedExperience.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json({ success: true, savedExperiences });
  } catch (error) {
    next(error);
  }
});

router.post("/experiences", protect, async (req, res, next) => {
  try {
    const { experienceId } = req.body;

    if (!experienceId) {
      return res.status(400).json({
        success: false,
        message: "Experience ID is required."
      });
    }

    const savedExperience = await SavedExperience.create({
      userId: req.userId,
      experienceId
    });

    res.status(201).json({ success: true, savedExperience });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Experience already saved."
      });
    }
    next(error);
  }
});

router.delete(
  "/experiences/:experienceId",
  protect,
  async (req, res, next) => {
    try {
      const deleted = await SavedExperience.findOneAndDelete({
        userId: req.userId,
        experienceId: req.params.experienceId
      });

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: "Saved experience not found."
        });
      }

      res.json({
        success: true,
        message: "Experience removed successfully."
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
