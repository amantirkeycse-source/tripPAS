const express = require("express");
const Experience = require("../models/Experience");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { destination, style, minRating, minBudget, maxBudget } =
      req.query;
    const filter = {};

    if (destination) {
      filter.destination = { $regex: destination, $options: "i" };
    }

    if (style) {
      filter.travelStyle = style;
    }

    if (minRating) {
      filter.rating = { $gte: Number(minRating) };
    }

    if (minBudget || maxBudget) {
      filter.budget = {};
      if (minBudget) filter.budget.$gte = Number(minBudget);
      if (maxBudget) filter.budget.$lte = Number(maxBudget);
    }

    const experiences = await Experience.find(filter).sort({
      createdAt: -1
    });

    res.json({ success: true, experiences });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const experience = await Experience.findOne({
      id: req.params.id
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found."
      });
    }

    res.json({ success: true, experience });
  } catch (error) {
    next(error);
  }
});

router.get("/:id/related", async (req, res, next) => {
  try {
    const experience = await Experience.findOne({
      id: req.params.id
    });

    if (!experience) {
      return res.status(404).json({
        success: false,
        message: "Experience not found."
      });
    }

    const related = await Experience.find({
      id: { $ne: req.params.id },
      destinationId: experience.destinationId
    })
      .limit(3)
      .sort({ rating: -1 });

    const fallback =
      related.length < 3
        ? await Experience.find({
            id: { $ne: req.params.id },
            destinationId: { $ne: experience.destinationId }
          })
            .limit(3 - related.length)
            .sort({ rating: -1 })
        : [];

    res.json({
      success: true,
      experiences: [...related, ...fallback]
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", protect, async (req, res, next) => {
  try {
    const {
      destinationId,
      title,
      destination,
      country,
      date,
      duration,
      budget,
      travelers,
      rating,
      travelStyle,
      story,
      whatILoved,
      whatToAvoid,
      whatIRecommend,
      bestBudgetTip,
      hiddenPlaces
    } = req.body;

    if (!destinationId || !title || !destination) {
      return res.status(400).json({
        success: false,
        message: "destinationId, title, and destination are required."
      });
    }

    const id = "exp-" + Date.now();

    const experience = await Experience.create({
      id,
      userId: req.userId,
      user: { name: req.body.userName || "Anonymous", avatar: "" },
      destinationId,
      title,
      destination,
      country: country || "",
      date: date || "",
      duration: duration || "",
      budget: budget || 0,
      travelers: travelers || 1,
      rating: rating || 0,
      travelStyle: travelStyle || "",
      story: story || "",
      whatILoved: whatILoved || "",
      whatToAvoid: whatToAvoid || "",
      whatIRecommend: whatIRecommend || "",
      bestBudgetTip: bestBudgetTip || "",
      hiddenPlaces: hiddenPlaces || "",
      likes: 0,
      saves: 0
    });

    res.status(201).json({ success: true, experience });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
