const request = require("supertest");
const app = require("../app");

describe("User Registration", () => {
  it("should register a new user", async () => {
    const res = await request(app)
      .post("/register")
      .send({ login: "testuser", password: "testpassword" });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("user");
  });
});
