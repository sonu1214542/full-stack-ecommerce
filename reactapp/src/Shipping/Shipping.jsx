import React, { useState } from "react";
import "./Shipping.css";
import { useNewOrderMutation } from "../Redux/Api/OrderApi";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingInfo } from "../Redux/reducer/cartReducer";
import { usePaymentMutation } from "../Redux/Api/PAymentApi";
import axios from "axios";

const Shipping = () => {
  console.log(window);
  const [NewOrder] = useNewOrderMutation();
  const [Payment] = usePaymentMutation();
  const { user } = useSelector((state) => state.userReducer);
  const {
    cartItems: orderItems,
    subtotal,
    shippingCharges,
    discount,
    total,
  } = useSelector((state) => state.cartReducer);
  const selectedItems = orderItems.map((item) => {
    // Assuming you want to include productId and quantity
    return {
      productId: item.productId,
      name: item.name,
      photo: item.photo,
      price: item.price,
      quantity: item.quantity,
      //color:JSON.stringify(item.color.name),
      //size:JSON.stringify(item.color.sizes),
      category: item.category,
    };
    // Add more properties if needed
  });
  console.log("select", selectedItems);
  const dispatch = useDispatch();
  const [shippingInfo, setShippingInfo] = useState({
    address: null,
    city: null,
    state: null,
    pincode: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const orderNowHandler = async (e) => {
    e.preventDefault();
    const orderData = {
      shippingInfo: shippingInfo,
      user: user._id,
      orderItems: selectedItems,
      subtotal: subtotal,
      shippingcharge: shippingCharges,
      discount: discount,
      total: total,
      razorpay_payment_id: "",
      razorpay_order_id: "",
      razorpay_signature: "",
    };
    console.log(shippingInfo);
    if (
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.pincode ||
      !shippingInfo.state ||
      !orderItems.length
    ) {
      alert(
        "Shipping address is required and there should be items in the cart."
      );
      return;
    }
    try {
      const amount = orderData.total;
      const {
        data: { key },
      } = await axios.get("http://localhost:4000/api/getkey");
      console.log("key", key);
      const { data } = await Payment({ amount });
      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: data.order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Acme Corp",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response) {
          orderData.razorpay_payment_id = response.razorpay_payment_id;
          orderData.razorpay_order_id = response.razorpay_order_id;
          orderData.razorpay_signature = response.razorpay_signature;
          alert("payid", response.razorpay_payment_id);
          alert("ordid", response.razorpay_order_id);
          alert("razsign", response.razorpay_signature);
          const body = { ...response };
          console.log("body", body);
          const validateresponse = await axios.post(
            "http://localhost:4000/api/v1/payment/paymentverification",
            {
              method: "POST",
              body: JSON.stringify(body),
              headers: { "Content-Type": "application/json" },
            }
          );
          const jsonRes = await validateresponse.data;
          console.log("jsonres", jsonRes);
          dispatch(saveShippingInfo(shippingInfo));

          console.log("orderData", orderData);
          await NewOrder(orderData);
          //await NewOrder(...orderData,razorpay_payment_id = response.razorpay_payment_id,razorpay_order_id = response.razorpay_order_id,razorpay_signature = response.razorpay_signature);
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();

      console.log(data);
    } catch (error) {
      console.log("error in payment", error);
      return;
    }
  };

  // const orderNowHandler = async (e) => {
  //   e.preventDefault();
  //   const orderData = {
  //     shippingInfo: shippingInfo,
  //     user: user._id,
  //     orderItems: selectedItems,
  //     subtotal: subtotal,
  //     shippingcharge: shippingCharges,
  //     discount: discount,
  //     total: total,
  //   };
  //   try {
  //     const amount = orderData.total;
  //     const {
  //       data: { key },
  //     } = await axios.get("http://localhost:4000/api/getkey");
  //     console.log("key", key);
  //     const { data } = await Payment({ amount });
  //     console.log("data",data)
  //     console.log("id",data.order.id)
  //     console.log(data.order.amount)
  //     console.log("amt",data.order.amount)
  //     const options = {
  //       key,
  //       amount: data.order.amount,
  //       currency: "INR",
  //       name: "6 Pack Programmer",
  //       description: "Tutorial of RazorPay",
  //       image: "https://avatars.githubusercontent.com/u/25058652?v=4",
  //       order_id: data.order.id,
  //       callback_url: "http://localhost:4000/api/v1/payment/paymentverification",
  //       prefill: {
  //           name: "Gaurav Kumar",
  //           email: "gaurav.kumar@example.com",
  //           contact: "9999999999"
  //       },
  //       notes: {
  //           "address": "Razorpay Corporate Office"
  //       },
  //       theme: {
  //           "color": "#121212"
  //       }
  //   };
  //     var rzp1 = new window.Razorpay(options);

  //     rzp1.open();

  //     console.log(data);
  //   } catch (error) {
  //     console.log("error in payment", error);
  //     return
  //   }

  //   dispatch(saveShippingInfo(shippingInfo));

  //   console.log("orderData", orderData);
  //   await NewOrder(orderData);
  // };

  return (
    <div>
      <form style={{ marginTop: "50px" }} onSubmit={orderNowHandler}>
        <h1>Shipping Info</h1>
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={shippingInfo.address}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={shippingInfo.city}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={shippingInfo.state}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="pincode"
          placeholder="Pincode"
          value={shippingInfo.pincode}
          onChange={handleInputChange}
        />
        <button type="submit">pay</button>
      </form>
    </div>
  );
};

export default Shipping;
