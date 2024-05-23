const request = require("supertest");
const app = require("../server");
const sequelize = require("../config/database");
const User = require("../models/user");

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

describe("Auth Endpoints", () => {
  it("should register a new user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      role: "cliente",
    });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("user");
  });

  it("should not register a user with an existing email", async () => {
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      role: "cliente",
    });
    const res = await request(app).post("/api/auth/register").send({
      username: "testuser2",
      email: "testuser@example.com",
      password: "password123",
      role: "cliente",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Error registering user");
  });

  it("should login an existing user", async () => {
    await request(app).post("/api/auth/register").send({
      username: "testuser",
      email: "testuser@example.com",
      password: "password123",
      role: "cliente",
    });
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should not login with wrong credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty("message", "Invalid credentials");
  });
});
