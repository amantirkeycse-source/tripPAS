const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Trip = require("./models/Trip");
const User = require("./models/User");

const SavedDestination = require("./models/SavedDestination");
const SavedExperience = require("./models/SavedExperience");

require("dotenv").config();

const app = express();

// ======================================================
// MIDDLEWARE
// ======================================================

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    credentials: true
  })
);

app.use(express.json({ limit: "10mb" }));

// ======================================================
// BASIC ROUTES
// ======================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TripPAS Server is running 🚀"
  });
});

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "TripPAS API is working 🚀"
  });
});

// ======================================================
// AUTH MIDDLEWARE
// ======================================================

const protect = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Please login."
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("Auth error:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token."
    });
  }
};

// ======================================================
// REGISTER
// ======================================================

app.post("/api/auth/register", async (req, res) => {
  try {
    const {
      name,
      email,
      password
    } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Name, email and password are required."
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters."
      });
    }

    // Check existing user
    const existingUser = await User.findOne({
      email: email.toLowerCase()
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      avatar: ""
    });

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(201).json({
      success: true,
      message: "Registration successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      success: false,
      message: "Registration failed."
    });
  }
});

// ======================================================
// LOGIN
// ======================================================

app.post("/api/auth/login", async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required."
      });
    }

    // Find user
    const user = await User.findOne({
      email: email.toLowerCase()
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password."
      });
    }

    // Create JWT
    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Login failed."
    });
  }
});

// ======================================================
// CURRENT USER
// ======================================================

app.get("/api/auth/me", protect, async (req, res) => {
  try {
    const user = await User.findById(
      req.userId
    ).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar
      }
    });
  } catch (error) {
    console.error("Get user error:", error);

    res.status(500).json({
      success: false,
      message: "Could not get user."
    });
  }
});

// ======================================================
// CREATE TRIP
// ======================================================

app.post("/api/trips", protect, async (req, res) => {
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

    // Basic validation
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

    // IMPORTANT:
    // userId comes from JWT, NOT from frontend
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
    console.error("Create trip error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// ======================================================
// GET ONLY CURRENT USER'S TRIPS
// ======================================================

app.get("/api/trips", protect, async (req, res) => {
  try {
    const trips = await Trip.find({
      userId: req.userId
    }).sort({
      createdAt: -1
    });

    res.json({
      success: true,
      trips
    });
  } catch (error) {
    console.error("Get trips error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// ======================================================
// GET SINGLE TRIP
// ======================================================

app.get(
  "/api/trips/:id",
  protect,
  async (req, res) => {
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

      res.json({
        success: true,
        trip
      });
    } catch (error) {
      console.error(
        "Get single trip error:",
        error
      );

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);// ======================================================
// UPDATE CURRENT USER'S TRIP
// ======================================================

app.put(
  "/api/trips/:id",
  protect,
  async (req, res) => {
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

      const updatedTrip =
        await Trip.findOneAndUpdate(
          {
            _id: req.params.id,
            userId: req.userId
          },
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
          {
            new: true,
            runValidators: true
          }
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
      console.error("Update trip error:", error);

      res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
);

// ======================================================
// UPDATE TRIP STATUS
// ======================================================

app.patch(
  "/api/trips/:id/status",
  protect,
  async (req, res) => {
    try {
      const { status } = req.body;

      const validStatuses = [
        "planned",
        "booked",
        "completed"
      ];

      if (!validStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}`
        });
      }

      const updatedTrip =
        await Trip.findOneAndUpdate(
          {
            _id: req.params.id,
            userId: req.userId
          },
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
      console.error("Update status error:", error);

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

// ======================================================
// DELETE ONLY CURRENT USER'S TRIP
// ======================================================

app.delete(
  "/api/trips/:id",
  protect,
  async (req, res) => {
    try {
      const deletedTrip =
        await Trip.findOneAndDelete({
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
      console.error("Delete trip error:", error);

      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);


// ======================================================
// SAVED DESTINATIONS
// ======================================================

app.get("/api/saved-destinations", protect, async (req, res) => {
  try {
    const savedDestinations = await SavedDestination.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      savedDestinations
    });
  } catch (error) {
    console.error("Get saved destinations error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.post("/api/saved-destinations", protect, async (req, res) => {
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

    res.status(201).json({
      success: true,
      savedDestination
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Destination already saved."
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.delete(
  "/api/saved-destinations/:destinationId",
  protect,
  async (req, res) => {
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
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);


// ======================================================
// SAVED EXPERIENCES
// ======================================================

app.get("/api/saved-experiences", protect, async (req, res) => {
  try {
    const savedExperiences = await SavedExperience.find({
      userId: req.userId
    }).sort({ createdAt: -1 });

    res.json({
      success: true,
      savedExperiences
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.post("/api/saved-experiences", protect, async (req, res) => {
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

    res.status(201).json({
      success: true,
      savedExperience
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Experience already saved."
      });
    }

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.delete(
  "/api/saved-experiences/:experienceId",
  protect,
  async (req, res) => {
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
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  }
);

// ======================================================
// UPDATE USER PROFILE
// ======================================================

app.put("/api/auth/profile", protect, async (req, res) => {
  try {
    const { name, avatar } = req.body;

    const updateFields = {};

    if (name !== undefined) {
      updateFields.name = name;
    }

    if (avatar !== undefined) {
      updateFields.avatar = avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      updateFields,
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    res.json({
      success: true,
      message: "Profile updated successfully.",
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar
      }
    });
  } catch (error) {
    console.error("Update profile error:", error);

    res.status(500).json({
      success: false,
      message: "Could not update profile."
    });
  }
});

// ======================================================
// DATABASE + SERVER
// ======================================================

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error(
        "MONGO_URI is missing in .env"
      );
    }

    if (!process.env.JWT_SECRET) {
      throw new Error(
        "JWT_SECRET is missing in .env"
      );
    }

    await mongoose.connect(
      process.env.MONGO_URI
    );

    console.log("MongoDB connected ✅");

    app.listen(PORT, () => {
      console.log(
        `TripPAS server running on port ${PORT} 🚀`
      );
    });
  } catch (error) {
    console.error(
      "Server startup failed:",
      error.message
    );
  }
}

startServer();