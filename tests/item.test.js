import { expect } from "chai";
import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";

describe("Item API Integration Tests", () => {
  // Optional: Clear the items collection before each test
  beforeEach(async () => {
    await mongoose.connection.db.dropCollection("items").catch(() => {});
  });

  it("GET /_healthz → should return status 200", async () => {
    const res = await request(app.callback()).get("/_healthz");
    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({ status: "Ok", message: "Ok" });
  });

  it("POST /items → should create an item", async () => {
    const res = await request(app.callback())
      .post("/items")
      .send({ name: "Test Item" });

    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
    expect(res.body.name).to.equal("Test Item");
  });

  it("GET /items → should return an array of items", async () => {
    await request(app.callback()).post("/items").send({ name: "Item 1" });
    await request(app.callback()).post("/items").send({ name: "Item 2" });

    const res = await request(app.callback()).get("/items");

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
    expect(res.body.length).to.equal(2);
  });

  it("GET /items/:id → should return a specific item", async () => {
    const createRes = await request(app.callback())
      .post("/items")
      .send({ name: "Integration Test Item" });

    const itemId = createRes.body._id;

    const res = await request(app.callback()).get(`/items/${itemId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("_id", itemId);
    expect(res.body.name).to.equal("Integration Test Item");
  });

  it("GET /items/:id → should return 404 for non-existing item", async () => {
    const res = await request(app.callback()).get(
      `/items/666666666666666666666666`
    );
    expect(res.status).to.equal(404);
  });

  it("PUT /items/:id → should update the item", async () => {
    const createRes = await request(app.callback())
      .post("/items")
      .send({ name: "Old Name" });

    const itemId = createRes.body._id;

    const res = await request(app.callback())
      .put(`/items/${itemId}`)
      .send({ name: "Updated Name" });

    expect(res.status).to.equal(200);
    expect(res.body.name).to.equal("Updated Name");
  });

  it("DELETE /items/:id → should delete the item", async () => {
    const createRes = await request(app.callback())
      .post("/items")
      .send({ name: "To be deleted" });

    const itemId = createRes.body._id;

    const res = await request(app.callback()).delete(`/items/${itemId}`);
    expect(res.status).to.equal(204);
  });

  // ✅ Close DB connection after all tests
  after(async () => {
    await mongoose.connection.close();
  });
});
