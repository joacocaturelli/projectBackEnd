import { Wishlist } from "../models/wishlist.model.js";
import { getAllProducts } from "./products.service.js";

export const getWishlistByUser = async (userId) => {
  try {
    const result = await Wishlist.find({ userId }, { productId: true, _id: false });

    const { content } = await getAllProducts(result.map(({ productId }) => Number(productId)));

    return {
      ok: true,
      content,
    };
  } catch (error) {
    console.log("Error showing all wishlist", error.message);
    return {
      ok: false,
      content: [],
    };
  }
};

export const addToWishlist = async (userId, productId) => {
  try {
    await Wishlist.create({ userId, productId });

    return {
      ok: true,
    };
  } catch (error) {
    console.log("Error saving into wishlist", error.message);
    return {
      ok: false,
    };
  }
};

export const removeFromWishlist = async (userId, productId) => {
  try {
    const result = await Wishlist.findOneAndDelete({ userId, productId });

    if (!result) throw new Error("Not found");

    return {
      ok: true,
      content: result,
    };
  } catch (error) {
    console.log("Error deleting into wishlist", error.message);
    return {
      ok: false,
    };
  }
};
