import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      max: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    img: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);



//AiContentModel.js
const AiContentSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, default: "" },
    imageUrl: { type: String, required: true },
    link: { type: String, required: true },
    type: { type: String, required: true },
    priceType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    rating: { 
        type: Number, 
        default: 0, 
        min: 0, 
        max: 5
    },
    review: { type: String, default: "" }
});

export const AiContent = mongoose.models.AiContent || mongoose.model("AiContent", AiContentSchema);

export const User = mongoose.models.User || mongoose.model("User", userSchema);
