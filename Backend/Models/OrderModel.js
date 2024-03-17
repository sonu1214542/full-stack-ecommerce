import mongoose from "mongoose";
import { ColorSchema, SizeStockSchema } from "./ProductModel.js";

const Schema = new mongoose.Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pincode: {
        type: Number,
        required: true,
      },
    },
    user: {
      type: String,
      ref: "User",
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    shippingcharge: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["processing", "shipped", "delievired"],
      default: "processing",
    },
    orderItems: [
      {
        name: String,
        photo: String,
        price: Number,
        // color:{
        //   type:String,
        //   required:true
        // },
        // size:{
        //   type:String,
        //   required:true
        // },
        quantity: Number,
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
        },
        category: String,
      },
    ],

    razorpay_payment_id: {
      type: String,
    },
    razorpay_order_id: {
      type: String,
    },
    razorpay_signature: {
      type: String,
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("OrderModel", Schema);
