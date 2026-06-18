import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    productId: { type: String, required: true },
  },
  {
    timestamps: { createdAt: false, updatedAt: true },
  },
);

wishlistSchema.index(
  {
    userId: 1,
    productId: 1,
  },
  {
    unique: true,
  },
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
