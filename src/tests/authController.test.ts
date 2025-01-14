import request from "supertest";
import app from "../app";

describe("Authentication Endpoints", () => {
  it("should create a user and return a token", async () => {
    const response = await request(app).post("/login/register").send({
      email: "test@test.com",
      name: "test",
      username: "test",
      password: "test",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should authenticate a user and return a token", async () => {
    const response = await request(app).post("/login").send({
      email: "test@test.com",
      password: "test",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should fail authentication with incorrect credentials", async () => {
    const response = await request(app).post("/login").send({
      email: "wrong@wrong.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Invalid email or password");
  });
});
