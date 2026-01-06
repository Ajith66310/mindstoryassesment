import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  images: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model("Product", ProductSchema);
export default Product;