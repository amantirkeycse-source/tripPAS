const request = require("supertest");
const mongoose = require("mongoose");
const { app } = require("../server");

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(process.env.MONGO_URI);
  }
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /", () => {
  it("should return server status", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe("GET /api/test", () => {
  it("should confirm API is working", async () => {
    const res = await request(app).get("/api/test");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
  });
});

describe("GET /api/destinations", () => {
  it("should return destinations array", async () => {
    const res = await request(app).get("/api/destinations");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.destinations)).toBe(true);
  });
});

describe("GET /api/experiences", () => {
  it("should return experiences array", async () => {
    const res = await request(app).get("/api/experiences");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.experiences)).toBe(true);
  });
});

describe("POST /api/auth/register", () => {
  it("should reject missing fields", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "Test" });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("POST /api/auth/login", () => {
  it("should reject missing fields", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({});
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
  });
});

describe("GET /api/trips", () => {
  it("should require authentication", async () => {
    const res = await request(app).get("/api/trips");
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
