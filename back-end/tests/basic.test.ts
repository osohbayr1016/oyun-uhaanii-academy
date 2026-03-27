import { app } from "../src/index";

describe("Basic API Tests", () => {
  it("should return 200 for root endpoint", async () => {
    const response = await app.request("http://localhost/");
    expect(response.status).toBe(200);
  });

  it("should have app instance", () => {
    expect(app).toBeDefined();
  });
});
