import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: Number,
  },
  {
    timestamps: true,
  }
);

export const Item = mongoose.model("Item", itemSchema);
