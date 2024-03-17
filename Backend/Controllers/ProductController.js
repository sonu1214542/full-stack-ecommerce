import { ProductModel } from "../Models/ProductModel.js";
import fs from "fs";

export const newProduct = async (req, res, next) => {
  try {
    const { name, category, price ,stock} = req.body;
    const photo = req.file;
    if (!name || !price || !category||!stock) {
      fs.unlink(photo && photo.path, (err) => {
        if (err) {
          console.error("Error deleting photo:", err);
        } else {
          console.log("Photo deleted successfully");
        }
      });
      return res.status(400).json({
        success: false,
        message: "enter all fields",
      });
    }
    await ProductModel.create({
      category,
      //colors,
      name,
      photo:photo.path,
      price,
      stock
    });
    return res.status(200).json({
      success: true,
      message: "product created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error,
      success: false,
      message: error.message,
    });
  }
};

export const getAllCategories = async (req, res, next) => {
  try {
    const categories = await ProductModel.distinct("category");
    return res.status(200).json({
      success: true,
      message: categories,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const getSingleProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productid);
    return res.status(200).json({
      success: true,
      message: product,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productid);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "invalid productid",
      });
    }
    const { name, category, colors, price } = req.body;
    const photo = req.file;
    if (photo) {
      fs.unlink(product.photo, () => {
        console.log("old photo deleted");
      });
      product.photo = photo.path;
    }
    if (name) {
      console.log("old", name);
      product.name = name;
      console.log(name);
    }
    if (category) {
      product.category = category;
    }
    if (colors) {
      product.colors = colors;
    }
    if (price) {
      product.price = price;
    }
    await product.save();
    return res.status(201).json({
      success: true,
      message: "product updated",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const product = await ProductModel.findById(req.params.productid);
    if (!product) {
      return res.status(400).json({
        success: false,
        message: "invalid productid",
      });
    }
    if (product.photo) {
      fs.unlink(product.photo, () => {
        console.log("product photo deleted");
      });
    }
    // There seems to be a mistake here; you don't need to assign product.photo again.
    // product.photo = photo.path; // This line is unnecessary and causing the error.

    await ProductModel.deleteOne(product); // You need to specify the ID to delete
    return res.status(201).json({
      success: true,
      message: "product deleted", // Changed the message to "product deleted" for clarity
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};


export const getAllProducts = async (req, res, next) => {
  try {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const baseQuery = {};

    if (search) {
      baseQuery.name = {
        $regex: search,
        $options: "i",
      };
    }

    if (category) {
      baseQuery.category = category;
    }

    if (price) {
      baseQuery.price = price;
    }

    console.log("Base Query:", baseQuery);

    const products = await ProductModel.find(baseQuery)
      .sort(sort && { price: sort === "asc" ? 1 : -1 })
      .limit(limit)
      .skip(skip);

    console.log("Products:", products);

    const filteredProducts = await ProductModel.find(baseQuery);
    const totalPages = Math.ceil(filteredProducts.length / limit);

    return res.status(200).json({
      success: true,
      products,
      filteredProducts,
      totalPages,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};




