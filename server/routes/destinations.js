const express = require("express");
const Destination = require("../models/Destination");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { search, country, tag, minBudget, maxBudget } = req.query;
    const filter = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { state: { $regex: search, $options: "i" } }
      ];
    }

    if (country) {
      filter.country = { $regex: country, $options: "i" };
    }

    if (tag) {
      filter.tags = { $in: Array.isArray(tag) ? tag : [tag] };
    }

    if (minBudget || maxBudget) {
      filter.startingBudget = {};
      if (minBudget) filter.startingBudget.$gte = Number(minBudget);
      if (maxBudget) filter.startingBudget.$lte = Number(maxBudget);
    }

    const destinations = await Destination.find(filter).sort({
      popularity: -1
    });

    res.json({ success: true, destinations });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const destination = await Destination.findOne({
      id: req.params.id
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found."
      });
    }

    res.json({ success: true, destination });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/similar", async (req, res, next) => {
  try {
    const destination = await Destination.findOne({
      id: req.params.id
    });

    if (!destination) {
      return res.status(404).json({
        success: false,
        message: "Destination not found."
      });
    }

    const similar = await Destination.find({
      id: { $ne: req.params.id },
      tags: { $in: destination.tags || [] }
    })
      .limit(3)
      .sort({ popularity: -1 });

    res.json({ success: true, destinations: similar });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
