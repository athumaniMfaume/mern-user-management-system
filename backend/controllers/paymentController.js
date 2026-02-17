import axios from "axios";
import moment from "moment";
import base64 from "base-64";

/**
 * HALOPESA (CLICKPESA)
 * POST /api/payment/donate/halopesa
 */
export const initiateHaloPesa = async (req, res) => {
  const { amount, phone, email } = req.body;

  try {
    console.log("🚀 STARTING HALOPESA INITIATION");

    if (process.env.USE_MOCK_HALO === "true") {
      console.log("🟢 MOCK HALOPESA MODE ACTIVE");

      const mockResponse = {
        paymentId: `MOCK_${Date.now()}`,
        status: "PENDING",
        message: "USSD push simulated (no actual money sent)",
        phoneNumber: phone,
        amount: amount,
        currency: "TZS",
        externalReference: `DONATE_${Date.now()}`,
      };

      console.log("✅ MOCK PAYMENT RESPONSE:", mockResponse);

      return res.status(200).json({
        success: true,
        message: "USSD Push Sent (Simulated). Enter PIN on your phone.",
        data: mockResponse,
      });
    }

    console.log("BASE URL:", process.env.CLICKPESA_BASE_URL);

    // 1️⃣ GENERATE TOKEN
    const authResponse = await axios.post(
      `${process.env.CLICKPESA_BASE_URL}/third-parties/generate-token`,
      {},
      {
        headers: {
          "api-key": process.env.CLICKPESA_API_KEY,
          "client-id": process.env.CLICKPESA_CLIENT_ID,
        },
      }
    );

    const token = authResponse.data.token;
    console.log("✅ TOKEN GENERATED");

    // 2️⃣ INITIATE USSD PUSH
    const paymentResponse = await axios.post(
      `${process.env.CLICKPESA_BASE_URL}/payments/initiate-ussd-push-request`,
      {
        amount: Number(amount),
        currency: "TZS",
        customerEmail: email || "athumanimfaume1995@gmail.com",
        phoneNumber: phone,
        channelId: process.env.CLICKPESA_CHANNEL_ID,
        externalReference: `DONATE_${Date.now()}`,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ PAYMENT RESPONSE:", paymentResponse.data);

    res.status(200).json({
      success: true,
      message: "USSD Push Sent. Enter PIN on your phone.",
      data: paymentResponse.data,
    });
  } catch (error) {
    console.error("❌ HALOPESA ERROR");
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      message: "HaloPesa initiation failed",
      error: error.response?.data || error.message,
    });
  }
};

/**
 * AZAMPAY (placeholder)
 */
export const initiateAzamPay = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "AzamPay initiated",
  });
};

/**
 * M-PESA STK PUSH (Daraja Sandbox)
 * POST /api/payment/donate/mpesa
 */
export const initiateMpesa = async (req, res) => {
  const { amount, phone } = req.body;

  try {
    const auth = base64.encode(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`);
    const tokenRes = await axios.get(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      { headers: { Authorization: `Basic ${auth}` } }
    );
    const token = tokenRes.data.access_token;

    const timestamp = moment().format("YYYYMMDDHHmmss");
    const password = base64.encode(process.env.MPESA_SHORTCODE + process.env.MPESA_PASSKEY + timestamp);

    const stkRes = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        BusinessShortCode: process.env.MPESA_SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: Number(amount),
        PartyA: phone, // must start with 254
        PartyB: process.env.MPESA_SHORTCODE,
        PhoneNumber: phone,
        CallBackURL: `${process.env.SERVER_URL}/api/payment/mpesa/callback`, // your callback endpoint
        AccountReference: "MERNDonation",
        TransactionDesc: "Donation Test",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    console.log("✅ MPESA STK PUSH RESPONSE:", stkRes.data);

    res.status(200).json({
      success: true,
      message: "STK Push sent! Enter PIN on your phone.",
      data: stkRes.data,
    });
  } catch (error) {
    console.error("❌ MPESA ERROR:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "M-Pesa STK Push failed",
      error: error.response?.data || error.message,
    });
  }
};

/**
 * M-PESA CALLBACK
 */
export const mpesaCallback = (req, res) => {
  console.log("🔔 M-PESA CALLBACK RECEIVED:", req.body);
  res.status(200).send("OK");
};

/**
 * WEBHOOK CALLBACK
 */
export const azamPayCallback = async (req, res) => {
  try {
    console.log("🔔 AZAMPAY CALLBACK RECEIVED:", req.body);
    res.status(200).send("OK");
  } catch (error) {
    console.error("Webhook Error:", error);
    res.status(500).send("Error");
  }
};
