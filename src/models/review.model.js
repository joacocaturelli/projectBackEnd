import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String },
  },
  {
    timestamps: true,
  },
);

reviewSchema.index(
  {
    productId: 1,
    userId: 1,
  },
  {
    unique: true,
  },
);

export const Review = mongoose.model("Review", reviewSchema);
