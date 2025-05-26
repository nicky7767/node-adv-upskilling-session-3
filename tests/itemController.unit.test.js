import sinon from "sinon";
import { expect } from "chai";
import { Item } from "../src/models/itemModel.js";
import * as itemController from "../src/controllers/itemController.js";

describe("Item Controller Unit Tests", () => {
  let ctx;

  beforeEach(() => {
    ctx = {
      status: null,
      body: null,
      params: {},
      request: { body: {} },
      throw: function (status, message) {
        const err = new Error(message);
        err.status = status;
        throw err;
      },
    };
  });

  afterEach(() => {
    sinon.restore(); // restore all stubs after each test
  });

  it("healthCheck should set status 200 and proper body", async () => {
    await itemController.healthCheck(ctx);
    expect(ctx.status).to.equal(200);
    expect(ctx.body).to.deep.equal({ status: "Ok", message: "Ok" });
  });

  it("getAllItems should set body with all items", async () => {
    const fakeItems = [{ name: "item1" }, { name: "item2" }];
    sinon.stub(Item, "find").resolves(fakeItems);

    await itemController.getAllItems(ctx);
    expect(ctx.body).to.equal(fakeItems);
  });

  it("getItemById should set body when item found", async () => {
    const fakeItem = { _id: "123", name: "item1" };
    sinon.stub(Item, "findById").resolves(fakeItem);

    ctx.params.id = "123";
    await itemController.getItemById(ctx);
    expect(ctx.body).to.equal(fakeItem);
  });

  it("getItemById should throw 404 when item not found", async () => {
    sinon.stub(Item, "findById").resolves(null);
    ctx.params.id = "123";

    try {
      await itemController.getItemById(ctx);
      throw new Error("Expected to throw 404 but did not");
    } catch (err) {
      expect(err.status).to.equal(404);
      expect(err.message).to.equal("Item not found");
    }
  });

  it("createItem should save and set body/status", async () => {
    const fakeItem = { name: "item1", save: sinon.stub().resolvesThis() };
    sinon.stub(Item.prototype, "save").resolves(fakeItem);

    ctx.request.body = { name: "item1" };
    await itemController.createItem(ctx);
    expect(ctx.body).to.equal(fakeItem);
    expect(ctx.status).to.equal(201);
  });

  it("updateItem should update and set body when found", async () => {
    const fakeUpdatedItem = { _id: "123", name: "updated" };
    sinon.stub(Item, "findByIdAndUpdate").resolves(fakeUpdatedItem);

    ctx.params.id = "123";
    ctx.request.body = { name: "updated" };
    await itemController.updateItem(ctx);

    expect(ctx.body).to.equal(fakeUpdatedItem);
  });

  it("updateItem should throw 404 when not found", async () => {
    sinon.stub(Item, "findByIdAndUpdate").resolves(null);

    ctx.params.id = "123";
    ctx.request.body = { name: "updated" };

    try {
      await itemController.updateItem(ctx);
      throw new Error("Expected to throw 404 but did not");
    } catch (err) {
      expect(err.status).to.equal(404);
      expect(err.message).to.equal("Item not found");
    }
  });

  it("deleteItem should set status 204 when deleted", async () => {
    sinon.stub(Item, "findByIdAndDelete").resolves({ _id: "123" });

    ctx.params.id = "123";
    await itemController.deleteItem(ctx);
    expect(ctx.status).to.equal(204);
  });

  it("deleteItem should throw 404 when not found", async () => {
    sinon.stub(Item, "findByIdAndDelete").resolves(null);

    ctx.params.id = "123";
    try {
      await itemController.deleteItem(ctx);
      throw new Error("Expected to throw 404 but did not");
    } catch (err) {
      expect(err.status).to.equal(404);
      expect(err.message).to.equal("Item not found");
    }
  });
});
