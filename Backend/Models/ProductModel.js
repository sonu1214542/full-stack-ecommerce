import mongoose from "mongoose";

export const SizeStockSchema = new mongoose.Schema(
  {
    size: {
      type: String,
      // required: [true, "Please provide the size"],
    },
    stock: {
      type: Number,
      required: [true, "Please provide the stock for this size"],
      default: 0, // You can set a default stock value if needed
    },
  },
  { _id: false }
);

export const ColorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // required: [true, "Please provide the color name"],
    },
    sizes: [SizeStockSchema], // Array of objects representing sizes and respective stock for this color
  },
  { _id: false }
);

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name"],
    },
    photo: {
      type: String,
      required: [true, "Please add photo"],
    },
    price: {
      type: Number,
      required: [true, "Please enter price"],
    },
    //colors:[ColorSchema],
    stock:{
      type:Number,
      required:true
    },
    category:{
        type:String,
        required:[true,"pls enter category"]
    }
  },
  { timestamps: true }
);

export const ProductModel = mongoose.model("Product", Schema);
