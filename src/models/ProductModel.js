const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: [{ type: String, required: true }], // Sử dụng mảng để lưu trữ nhiều ảnh
    type: { type: String, required: true },
    price: { type: String, required: true },
    countInStock: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String },
    original_price: { type: String, required: true },
    size: [{ type: String, required: true }],
    color: [{ type: String, required: true }],
    isFeatured: { type: Boolean, default: false }, 
    isFavorite: { type: Boolean, default: false }, 
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
