import { app } from "../src/index";

describe("Basic API Tests", () => {
  it("should return 200 for health check endpoint", async () => {
    const response = await fetch("http://localhost:5001/");
    expect(response.status).toBe(200);
  });

  it("should have app instance", () => {
    expect(app).toBeDefined();
  });
});
