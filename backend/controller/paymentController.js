require("dotenv").config();

const Razorpay = require("razorpay");
const crypto = require("crypto");

exports.rzpOrder = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req);
    const instance = new Razorpay({
      key_id: "rzp_test_GW44ia4GVRuZ9F",
      key_secret: "UqNSM9lFp0mkksqgIloGsFuS",
    });

    const options = {
      amount: req.body.amount, // amount in smallest currency unit
      currency: "INR",
    };
    console.log("hello", options);
    const order = await instance.orders.create(options);
    console.log(order);

    if (!order) return res.status(500).send("Some error occured");

    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.rzpSuccess = async (req, res) => {
  try {
    // getting the details back from our font-end
    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = req.body;

    // Creating our own digest
    // The format should be like this:
    // digest = hmac_sha256(orderCreationId + "|" + razorpayPaymentId, secret);
    const shasum = crypto.createHmac("sha256", "UqNSM9lFp0mkksqgIloGsFuS");

    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

    const digest = shasum.digest("hex");

    // comaparing our digest with the actual signature
    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: "Transaction not legit!" });

    // THE PAYMENT IS LEGIT & VERIFIED
    // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

    res.json({
      msg: "success",
      orderId: razorpayOrderId,
      paymentId: razorpayPaymentId,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};
