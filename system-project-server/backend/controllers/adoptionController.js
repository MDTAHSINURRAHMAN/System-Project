const AdoptionRequest = require("../models/AdoptionRequest");
const SSLCommerzPayment = require("sslcommerz-lts");
const dotenv = require("dotenv");
dotenv.config();

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;

// Payment Initialization
const createAdoptionRequest = async (req, res) => {
  const { name, phoneNumber, address, postCode, amount, petId } = req.body;

  // Payment Data
  const data = {
    total_amount: amount,
    currency: "BDT",
    tran_id: `tran_${Date.now()}`,
    success_url: "http://localhost:5000/api/adoptions/payment-success",
    fail_url: "http://localhost:5000/api/adoptions/payment-fail",
    cancel_url: "http://localhost:5000/api/adoptions/payment-cancel",
    ipn_url: "http://localhost:5000/api/adoptions/ipn",
    shipping_method: "NO",
    product_name: "Pet Adoption",
    product_category: "Pet",
    product_profile: "general",
    cus_name: name,
    cus_email: "customer@example.com",
    cus_add1: address,
    cus_add2: address,
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: postCode,
    cus_country: "Bangladesh",
    cus_phone: phoneNumber,
    cus_fax: phoneNumber,
  };

  try {
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    const apiResponse = await sslcz.init(data);
    console.log("SSLCommerz Response:", apiResponse);

    // Save Adoption Request in Database
    const adoptionRequest = new AdoptionRequest({
      petId,
      name,
      phoneNumber,
      address,
      postCode,
      status: "Pending",
      tran_id: data.tran_id, // Save transaction ID
    });
    await adoptionRequest.save();

    // Redirect to Payment Gateway
    return res.status(200).json(apiResponse.GatewayPageURL);
  } catch (error) {
    console.error("Payment initiation failed:", error);
    return res.status(500).json({ error: "Payment initiation failed" });
  }
};

// Payment Success Handler
const paymentSuccess = async (req, res) => {
  console.log("Payment Success Data:", req.query);

  // Redirect to success page
  res.redirect("http://localhost:5173/success");
};

// Payment Failure Handler
const paymentFail = async (req, res) => {
  console.log("Payment Failed Data:", req.query);

  // Redirect to failure page
  res.redirect("http://localhost:5173/failure");
};

// IPN Handler
const handleIPN = async (req, res) => {
  console.log("IPN Response:", req.body);
  const { tran_id, status } = req.body;

  if (status === "VALID") {
    await AdoptionRequest.findOneAndUpdate({ tran_id }, { status: "Approved" });
  } else {
    await AdoptionRequest.findOneAndUpdate({ tran_id }, { status: "Rejected" });
  }
  res.sendStatus(200); // Acknowledge receipt
};

module.exports = {
  createAdoptionRequest,
  paymentSuccess,
  paymentFail,
  handleIPN,
};
