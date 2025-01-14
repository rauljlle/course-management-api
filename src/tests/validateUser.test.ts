import request from "supertest";
import app from "../app";

describe("Input Validation Middleware", () => {
  it("should pass validation with valid inputs", async () => {
    const response = await request(app).post("/login/register").send({
      username: "validuser",
      name: "Valid Name",
      email: "valid@example.com",
      password: "securepassword123",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("token");
  });

  it("should fail validation if username is missing", async () => {
    const response = await request(app).post("/login/register").send({
      name: "Valid Name",
      email: "valid@example.com",
      password: "securepassword123",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "username",
          msg: "Username is required.",
        }),
      ]),
    );
  });

  it("should fail validation if username is too short", async () => {
    const response = await request(app).post("/login/register").send({
      username: "ab",
      name: "Valid Name",
      email: "valid@example.com",
      password: "securepassword123",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "username",
          msg: "Username must be between 3 and 20 characters.",
        }),
      ]),
    );
  });

  it("should fail validation if name is missing", async () => {
    const response = await request(app).post("/login/register").send({
      username: "validuser",
      email: "valid@example.com",
      password: "securepassword123",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "name", msg: "Name is required." }),
      ]),
    );
  });

  it("should fail validation if email is invalid", async () => {
    const response = await request(app).post("/login/register").send({
      username: "validuser",
      name: "Valid Name",
      email: "invalid-email",
      password: "securepassword123",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "email",
          msg: "Email must be a valid email address.",
        }),
      ]),
    );
  });

  it("should fail validation if password is too short", async () => {
    const response = await request(app).post("/login/register").send({
      username: "validuser",
      name: "Valid Name",
      email: "valid@example.com",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "password",
          msg: "Password must be at least 4 characters long.",
        }),
      ]),
    );
  });

  it("should fail validation if multiple fields are invalid", async () => {
    const response = await request(app).post("/login/register").send({
      username: "",
      name: "",
      email: "not-an-email",
      password: "123",
    });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "username",
          msg: "Username is required.",
        }),
        expect.objectContaining({
          path: "username",
          msg: "Username must be between 3 and 20 characters.",
        }),
      ]),
    );
  });
});
