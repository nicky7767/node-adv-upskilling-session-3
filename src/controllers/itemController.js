import { Item } from '../models/itemModel.js';

export const getAllItems = async (ctx) => {
  ctx.body = await Item.find();
};

export const getItemById = async (ctx) => {
  const item = await Item.findById(ctx.params.id);
  if (!item) {
    ctx.throw(404, 'Item not found');
  }
  ctx.body = item;
};

export const createItem = async (ctx) => {
  const newItem = new Item(ctx.request.body);
  ctx.body = await newItem.save();
  ctx.status = 201;
};

export const updateItem = async (ctx) => {
  const updatedItem = await Item.findByIdAndUpdate(ctx.params.id, ctx.request.body, { new: true });
  if (!updatedItem) {
    ctx.throw(404, 'Item not found');
  }
  ctx.body = updatedItem;
};

export const deleteItem = async (ctx) => {
  const deletedItem = await Item.findByIdAndDelete(ctx.params.id);
  if (!deletedItem) {
    ctx.throw(404, 'Item not found');
  }
  ctx.status = 204;
};
