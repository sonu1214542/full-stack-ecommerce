// import { instance } from "../app.js";
// import crypto from "crypto";

// export const checkout = async (req, res) => {
//   const options = {
//     amount: Number(req.body.amount * 100), // amount in the smallest currency unit
//     currency: "INR",
//   };
//   const order = await instance.orders.create(options);
//   console.log(order);
//   return res.status(200).json({
//     success: true,
//     order,
//   });
// };

// export const PaymentVerification = async (req, res, next) => {
//   console.log("body",req.body);
//   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
//     req.body;
//   const body = razorpay_order_id + "|" + razorpay_payment_id;
//   const expectedSignature = crypto
//     .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
//     .update(body.toString())
//     .digest("hex");
//   console.log(razorpay_signature, expectedSignature);
//   return res.status(200).json({
//     success: true,
//   });
// };



import crypto from "crypto";
import { instance } from "../app.js";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };
  const order = await instance.orders.create(options);

  res.status(200).json({
    success: true,
    order,
  });
};

export const paymentVerification = async (req, res,next) => {
  console.log("hihihihiihihihihhihhihihihhihihhihiiihhhihihhihihh")
  console.log(req.body)
  const { body } = req.body; // Destructure the 'body' property from req.body
const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = JSON.parse(body); 
    console.log("rzppayid",razorpay_payment_id);
        console.log("razsig",razorpay_signature);
    

  const sha = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(sha.toString())
    .digest("hex");
    console.log("exp",expectedSignature);

    

    const isAuthentic = expectedSignature === razorpay_signature;

   if (isAuthentic) {
    //create new order

    res.json({
      message:"success",
      orderId:razorpay_order_id,
      paymentId:razorpay_payment_id
    })
      
    // res.redirect(
    //   `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    // );
  } else {
    res.status(400).json({
      success: false,
    });
  }
};
