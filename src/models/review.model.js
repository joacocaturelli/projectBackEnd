import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    movieId: { type: String, required: true },
    userId: { type: String, required: true },
    rating: { type: Number, min: 1, max: 10, required: true },
    comment: { type: String },
  },
  { timestamps: true },
);

export const Review = mongoose.model("Review", reviewSchema);
