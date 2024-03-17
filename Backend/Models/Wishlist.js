import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    wishlistItems: [
        {
            _id:false,
          name: String,
          photo: String,
          price: Number,
          productId: {
            type: mongoose.Types.ObjectId,
            ref: "Product",
          },
          category:String
        },
      ]
  },
  { timestamps: true },
);

export const WishlistModel = mongoose.model("Wishlist", Schema);
