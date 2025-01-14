import request from "supertest";
import app from "../app";

describe("Course Input Validation Middleware", () => {
  let token: string;

  beforeAll(async () => {
    const authResponse = await request(app).post("/login/register").send({
      email: "test@test.com",
      name: "test",
      username: "test",
      password: "test",
    });
    token = authResponse.body.token;
  });

  it("should pass validation with valid inputs", async () => {
    const response = await request(app)
      .post("/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Introduction to Node.js",
        description:
          "Learn the basics of Node.js and how to build a server-side application",
        duration: 120,
        instructor: "John Doe",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
  });

  it("should fail validation if title is missing", async () => {
    const response = await request(app)
      .post("/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        description:
          "Learn the basics of Node.js and how to build a server-side application",
        duration: 120,
        instructor: "John Doe",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: "title", msg: "Title is required" }),
      ]),
    );
  });

  it("should fail validation if title is too short", async () => {
    const response = await request(app)
      .post("/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "JS",
        description:
          "Learn the basics of Node.js and how to build a server-side application",
        duration: 120,
        instructor: "John Doe",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "title",
          msg: "Title must be at least 3 characters long",
        }),
      ]),
    );
  });

  it("should fail validation if description is missing", async () => {
    const response = await request(app)
      .post("/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Introduction to Node.js",
        duration: 120,
        instructor: "John Doe",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "description",
          msg: "Description must be at least 10 characters long",
        }),
      ]),
    );
  });

  it("should fail validation if duration is not a positive number", async () => {
    const response = await request(app)
      .post("/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Introduction to Node.js",
        description:
          "Learn the basics of Node.js and how to build a server-side application",
        duration: -10,
        instructor: "John Doe",
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "duration",
          msg: "Duration must be a positive number",
        }),
      ]),
    );
  });

  it("should fail validation if instructor is missing", async () => {
    const response = await request(app)
      .post("/courses")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "Introduction to Node.js",
        description:
          "Learn the basics of Node.js and how to build a server-side application",
        duration: 120,
      });

    expect(response.status).toBe(400);
    expect(response.body.errors).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: "instructor",
          msg: "Instructor is required",
        }),
      ]),
    );
  });
});
