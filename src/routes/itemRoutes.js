import Router from "koa-router";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  healthCheck,
} from "../controllers/itemController.js";

const router = new Router();

router.get("/_healthz", healthCheck);
router.get("/items", getAllItems);
router.get("/items/:id", getItemById);
router.post("/items", createItem);
router.put("/items/:id", updateItem);
router.delete("/items/:id", deleteItem);

export default router;
