import axios from 'axios';

// Helper function to get a fresh token
const getAzamPayToken = async () => {
  try {
    const authResponse = await axios.post(
      'https://sandbox.azampay.co.tz',
      {
        appName: process.env.AZAMPAY_APP_NAME, // Found in your AzamPay dashboard
        clientId: process.env.AZAMPAY_CLIENT_ID,
        clientSecret: process.env.AZAMPAY_CLIENT_SECRET
      }
    );
    return authResponse.data.data.accessToken;
  } catch (error) {
    console.error("Token Generation Error:", error.response?.data || error.message);
    throw new Error("Failed to authenticate with AzamPay");
  }
};

export const initiateAzamPay = async (req, res) => {
  const { amount, accountNumber } = req.body;

  try {
    // 1. Get a fresh token
    const token = await getAzamPayToken();

    // 2. Prepare Payload
    const formattedPhone = accountNumber.startsWith('0') 
      ? `255${accountNumber.slice(1)}` 
      : accountNumber;

    const azamPayPayload = {
      accountNumber: formattedPhone,
      amount: amount.toString(),
      currency: "TZS",
      externalId: `D-${Date.now().toString().slice(-10)}`,
      provider: "Halopesa", // Fixed for HaloPesa
      additionalProperties: {}
    };

    // 3. Make the Payment Request
    const response = await axios.post(
      'https://sandbox.azampay.co.tz', // THE FULL PATH
      azamPayPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Client-ID': process.env.AZAMPAY_CLIENT_ID
        }
      }
    );

    return res.status(200).json(response.data);

  } catch (error) {
    console.error("--- AZAMPAY DEBUG ---");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data || error.message);
    
    return res.status(500).json({ 
      message: "Payment request failed", 
      error: error.response?.data || error.message 
    });
  }
};


export const azamPayCallback = async (req, res) => {
  try {
    const callbackData = req.body;
    console.log("AzamPay Callback Received:", callbackData);

    // IMPORTANT: AzamPay expects a success response to stop retrying the webhook
    res.status(200).json({ message: "Callback received successfully" });
  } catch (error) {
    console.error("Callback Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
