import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("Quick test", () => {
    expect(1).toBe(1);
  });

  it("should respond with 200 status code when user entered a cityName", async () => {
    const response = await request.post("/weather").send({
      cityName: "London",
    });
    expect(response.statusCode).toBe(200);
  });

  it("should send 'Please enter a city name' when user didn't enter a cityName", async () => {
    const response = await request.post("/weather").send({
      cityName: "",
    });
    expect(response.text).toMatch("Please enter a city name");
  });

  it("should send 'City is not found!' when user entered incorrect cityName", async () => {
    const response = await request.post("/weather").send({
      cityName: "Londooon",
    });
    expect(response.text).toMatch("City is not found!");
  });

  it("should specify text/html as the content type in the http header", async () => {
    const response = await request.post("/weather").send({
      cityName: "London",
    });
    expect(response.headers["content-type"]).toBe("text/html; charset=utf-8");
  });
});

describe("GET /weather", () => {
  it("should respond with 200 status code", async () => {
    const response = await request.get("/weather");
    expect(response.statusCode).toBe(200);
  });

  it("should specify text/html as the content type in the http header", async () => {
    const response = await request.get("/weather");
    expect(response.headers["content-type"]).toBe("text/html; charset=utf-8");
  });
});

describe("GET /", () => {
  it("should send 'hello from backend to frontend!'", async () => {
    const response = await request.get("/");
    expect(response.text).toBe("hello from backend to frontend!");
  });

  it("should specify json as the content type in the http header", async () => {
    const response = await request.get("/");
    expect(response.headers["content-type"]).toBe("text/html; charset=utf-8");
  });
});
