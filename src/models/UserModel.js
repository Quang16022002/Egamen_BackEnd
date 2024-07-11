const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    nickname: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    gender: { type: String, enum: ["Nam", "Nữ", "Khác"], required: true },
    phone: { type: Number },
    address: { type: String },
    avatar: { type: String },
    city: { type: String },
    dob: { type: String }, 
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
