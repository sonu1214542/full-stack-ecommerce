import { OrderModel } from "../Models/OrderModel.js";
import { ProductModel } from "../Models/ProductModel.js";
import { WishlistModel } from "../Models/Wishlist.js";

export const newOrder = async (req, res, next) => {
  try {
    const {
      shippingInfo,
      orderItems,
      user,
      subtotal,
      shippingcharge,
      discount,
      total,
      status,
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    } = req.body;

    console.log("body", req.body);

    // Validate if orderItems exist and is an array
    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid order items",
      });
    }

    //Reduce stock for each product in the order
    for (let i = 0; i < orderItems.length; i++) {
      const order = orderItems[i];
      const product = await ProductModel.findById(order.productId);

      // Validate if product exists
      if (!product) {
        return res.status(400).json({
          success: false,
          message: "Product not found",
        });
      } else {
        console.log("product found");
      }

      // Find the selected color and size within the product
      // const selectedColor = product.colors.find((c) => (c.name = order.color));
      // if (!selectedColor) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Selected color not found in product",
      //   });
      // }

      // const selectedSize = selectedColor.sizes.find(
      //   (s) => (s.size = order.size)
      // );
      // if (!selectedSize) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Selected size not found in selected color",
      //   });
      // }

      // Reduce stock for the selected color and size
      product.stock -= order.quantity;

      // Save the product with updated stock
      await product.save();
    }

    // Create new order
    const newOrder = await OrderModel.create({
      shippingInfo,
      orderItems,
      user,
      subtotal,
      shippingcharge,
      discount,
      total,
      status,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.status(201).json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const myOrders = async (req, res, next) => {
  try {
    const { id: user } = req.query;
    let orders = [];
    orders = await OrderModel.find({ user });
    return res.status(201).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error,
    });
  }
};

export const allOrders = async (req, res, next) => {
  try {
    const {  category, status, fromdate, todate } = req.query;
    let baseQuery = {};

    // If category parameter is provided, add it to the base query
    if (category) {
      baseQuery["orderItems.category"] = { $regex: category };
    }
    if (status) {
      baseQuery.status = { $regex: status };
    }
    if (fromdate && todate) {
      const fromDate = new Date(fromdate);
      const toDate = new Date(todate);

      if (!isNaN(fromDate.getTime()) && !isNaN(toDate.getTime())) {
        baseQuery.createdAt = {
          $gte: new Date(
            fromDate.getFullYear(),
            fromDate.getMonth(),
            fromDate.getDate()
          ),
          $lt: new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate() + 1
          ),
        };
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Invalid date format. Please provide valid dates in YYYY-MM-DD format.",
        });
      }
    } else if (fromdate && !todate) {
      const fromDate = new Date(fromdate);

      if (!isNaN(fromDate.getTime())) {
        baseQuery.createdAt = {
          $gte: new Date(
            fromDate.getFullYear(),
            fromDate.getMonth(),
            fromDate.getDate()
          ),
        };
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Invalid date format. Please provide valid dates in YYYY-MM-DD format.",
        });
      }
    } else if (!fromdate && todate) {
      const toDate = new Date(todate);

      if (!isNaN(toDate.getTime())) {
        baseQuery.createdAt = {
          $gte: new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate()
          ),
          $lt: new Date(
            toDate.getFullYear(),
            toDate.getMonth(),
            toDate.getDate() + 1
          ),
        };
      } else {
        return res.status(400).json({
          success: false,
          message:
            "Invalid date format. Please provide valid dates in YYYY-MM-DD format.",
        });
      }
    }

    const allOrders = await OrderModel.find(baseQuery).populate("user", "name");
    const totalProducts = allOrders.length;

    return res.status(200).json({
      success: true,
      message: { allOrders, totalProducts },
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// export const allOrders = async (req, res, next) => {
//   try {
//     const { date, category, status} = req.query;
//     let baseQuery = {};

//     // If category parameter is provided, add it to the base query
//     if (category) {
//       baseQuery["orderItems.category"] = { $regex: category };
//     }
//     if (status) {
//       baseQuery.status={$regex:status}
//     }
//     if (date) {
//       // Parse the date string into a Date object
//       const parsedDate = new Date(date);

//       // Check if the parsedDate is a valid Date object and if it matches the expected format
//       if (!isNaN(parsedDate.getTime()) && /^\d{4}-\d{2}-\d{2}$/.test(date)) {
//         // If parsedDate is valid, set the baseQuery to filter orders by createdAt field
//         // You might need to adjust this based on your actual schema
//         baseQuery.createdAt = {
//           $gte: new Date(
//             parsedDate.getFullYear(),
//             parsedDate.getMonth(),
//             parsedDate.getDate()
//           ),
//           $lt: new Date(
//             parsedDate.getFullYear(),
//             parsedDate.getMonth(),
//             parsedDate.getDate() + 1
//           ),
//         };
//       } else {
//         // Handle invalid date format
//         return res.status(400).json({
//           success: false,
//           message:
//             "Invalid date format. Please provide a valid date in YYYY-MM-DD format.",
//         });
//       }
//     }

//     const allOrders = await OrderModel.find(baseQuery).populate("user", "name");
//     const totalProducts= allOrders.length;

//     return res.status(200).json({
//       success: true,
//       message: {allOrders,totalProducts}
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

export const addToWishlist = async (req, res, next) => {
  try {
    const { wishlistItems, user } = req.body;
    const existingWishlist = await WishlistModel.findOne({ user });

    const existingItems = () => {
      for (const newItem of wishlistItems) {
        for (const existingItem of existingWishlist.wishlistItems) {
          console.log(existingItem.productId, newItem.productId);
          if (existingItem.productId == newItem.productId) {
            return true;
          }
        }
      }
      return false;
    };

    if (existingWishlist) {
      if (existingItems()) {
        return res.status(400).json({
          success: false,
          mesage: "product already added to wishlist",
        });
      }
      wishlistItems.forEach((item) => {
        existingWishlist.wishlistItems.push(item);
      });

      await existingWishlist.save();

      return res.status(200).json({
        success: true,
        message: "Items added to existing wishlist successfully",
      });
    }
    await WishlistModel.create({
      user,
      wishlistItems,
    });
    return res.status(200).json({
      success: true,
      wishlistItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const myWishlist = async (req, res, next) => {
  try {
    const { user } = req.query;
    let userWishlistItems = [];
    userWishlistItems = await WishlistModel.find({ user });
    return res.status(200).json({
      success: true,
      message: userWishlistItems,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;

    const order = await OrderModel.findById(id);

    if (!order)
      return res.status(401).json({
        success: false,
        message: "no order",
      });

    switch (order.status) {
      case "processing":
        order.status = "shipped";
        break;
      case "Shipped":
        order.status = "delievired";
        break;
      default:
        order.status = "delievired";
        break;
    }

    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order Processed Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};
