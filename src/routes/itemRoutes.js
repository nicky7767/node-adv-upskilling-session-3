import Router from 'koa-router';
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} from '../controllers/itemController.js';

import { validateBody } from '../middlewares/validate.js';
import { itemSchema } from '../validation/itemValidation.js';

const router = new Router();

router.get('/items', getAllItems);
router.get('/items/:id', getItemById);
router.post('/items', validateBody(itemSchema), createItem);
router.put('/items/:id', validateBody(itemSchema), updateItem);
router.delete('/items/:id', deleteItem);

export default router;
