const request = require("supertest");
const app = require("../../app");

describe("Test GET /launches", () => {
  it("should respond with 200 status", async () => {
    const response = await request(app)
      .get("/launches")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});

describe("Test POST /launches", () => {
  const body = {
    mission: "Big mission",
    rocket: "new rocket",
    target: "Kepler-186 f",
    launchDate: "July 1, 2030",
  };
  const bodyNoDate = {
    mission: "Big mission",
    rocket: "new rocket",
    target: "Kepler-186 f",
  };

  const bodyInvalidDate = {
    mission: "Big mission",
    rocket: "new rocket",
    target: "Kepler-186 f",
    launchDate: "String",
  };

  it("should respond with 201 created", async () => {
    const response = await request(app)
      .post("/launches")
      .send(body)
      .expect("Content-Type", /json/)
      .expect(201);

    const requestDate = new Date(body.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(responseDate).toBe(requestDate);
    expect(response.body).toMatchObject(bodyNoDate);
  });

  it("should catch missing required properties", async () => {
    const response = await request(app)
      .post("/launches")
      .send(bodyNoDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Missing required launch property",
    });
  });

  it("should catch invalid date formats", async () => {
    const response = await request(app)
      .post("/launches")
      .send(bodyInvalidDate)
      .expect("Content-Type", /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: "Invalid launch date format",
    });
  });
});
