require("dotenv").config();
const mongoose = require("mongoose");

const Destination = require("../models/Destination");
const Experience = require("../models/Experience");

async function seed() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing in .env");
    }

    const { destinations } = await import("../../client/src/data/destinations.js");
    const { default: experiences } = await import("../../client/src/data/experiences.js");

    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    const destArray = Array.isArray(destinations) ? destinations : [];
    await Destination.deleteMany({});
    console.log("Cleared existing destinations");

    if (destArray.length > 0) {
      const cleaned = destArray.map((d) => {
        const { _id, __v, ...rest } = d;
        return rest;
      });
      await Destination.insertMany(cleaned);
      console.log(`Seeded ${cleaned.length} destinations`);
    }

    const expArray = Array.isArray(experiences) ? experiences : [];
    await Experience.deleteMany({});
    console.log("Cleared existing experiences");

    if (expArray.length > 0) {
      const cleaned = expArray.map((e) => {
        const { _id, __v, ...rest } = e;
        return rest;
      });
      await Experience.insertMany(cleaned);
      console.log(`Seeded ${cleaned.length} experiences`);
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
}

seed();
