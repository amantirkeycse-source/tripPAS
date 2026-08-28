const express = require("express");
const Trip = require("../models/Trip");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, async (req, res, next) => {
  try {
    const {
      startingCity,
      destinationId,
      adults,
      children,
      days,
      travelMonth,
      travelStyle,
      transportPreference
    } = req.body;

    if (
      !startingCity ||
      !destinationId ||
      !adults ||
      !days ||
      !travelMonth ||
      !travelStyle ||
      !transportPreference
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all trip details."
      });
    }

    const trip = await Trip.create({
      userId: req.userId,
      startingCity,
      destinationId,
      adults,
      children: children || 0,
      days,
      travelMonth,
      travelStyle,
      transportPreference
    });

    res.status(201).json({
      success: true,
      message: "Trip saved successfully.",
      trip
    });
  } catch (error) {
    next(error);
  }
});

router.get("/", protect, async (req, res, next) => {
  try {
    const trips = await Trip.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json({ success: true, trips });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", protect, async (req, res, next) => {
  try {
    const trip = await Trip.findOne({
      _id: req.params.id,
      userId: req.userId
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found."
      });
    }

    res.json({ success: true, trip });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", protect, async (req, res, next) => {
  try {
    const {
      startingCity,
      destinationId,
      adults,
      children,
      days,
      travelMonth,
      travelStyle,
      transportPreference
    } = req.body;

    const updatedTrip = await Trip.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      {
        startingCity,
        destinationId,
        adults,
        children,
        days,
        travelMonth,
        travelStyle,
        transportPreference
      },
      { new: true, runValidators: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found."
      });
    }

    res.json({
      success: true,
      message: "Trip updated successfully.",
      trip: updatedTrip
    });
  } catch (error) {
    next(error);
  }
});

router.patch(
  "/:id/status",
  protect,
  async (req, res, next) => {
    try {
      const { status } = req.body;
      const validStatuses = ["planned", "booked", "completed"];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
        });
      }

      const updatedTrip = await Trip.findOneAndUpdate(
        { _id: req.params.id, userId: req.userId },
        { status },
        { new: true }
      );

      if (!updatedTrip) {
        return res.status(404).json({
          success: false,
          message: "Trip not found."
        });
      }

      res.json({
        success: true,
        message: "Trip status updated.",
        trip: updatedTrip
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", protect, async (req, res, next) => {
  try {
    const deletedTrip = await Trip.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!deletedTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip not found."
      });
    }

    res.json({
      success: true,
      message: "Trip deleted successfully.",
      trip: deletedTrip
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
