import axios from 'axios';

/**
 * HaloPesa Controller (ES Module)
 */
export const initiateHaloPesa = async (req, res) => {
    const { amount, phone, email } = req.body;

    // Validation: Phone must be 255 format
    if (!amount || !phone || !phone.startsWith('255')) {
        return res.status(400).json({ 
            error: "Amount and Phone Number (starting with 255) are required" 
        });
    }

    try {
        // STEP 1: Generate Bearer Token
        const authResponse = await axios.post('https://api.clickpesa.com', {}, {
            headers: {
                'api-key': 'SKgnw10tGMcWP5ggERtcsQFDz1nIs4fI0xPgzMZQ7U',
                'client-id': 'ID4kgXs2Wq6IGTgAzJc7ZI41UDoPc3Rb'
            }
        });

        const bearerToken = authResponse.data.token;

        // STEP 2: Trigger HaloPesa USSD-Push
        const paymentResponse = await axios.post('https://api.clickpesa.com', {
            amount: amount,
            currency: "TZS",
            customerEmail: email || "athumanimfaume1995@gmail.com",
            phoneNumber: phone, 
            channelId: "07722744-1736-47c1-905e-f00000000003", // Sandbox HaloPesa ID
            externalReference: `MERN_HALO_${Date.now()}`
        }, {
            headers: { 
                'Authorization': `Bearer ${bearerToken}`,
                'Content-Type': 'application/json'
            }
        });

        // STEP 3: Success Response
        res.status(200).json({
            success: true,
            message: "USSD Push Sent. Enter PIN on your phone.",
            paymentId: paymentResponse.data.paymentId 
        });

    } catch (error) {
        const errorData = error.response?.data || error.message;
        console.error("HaloPesa Integration Error:", errorData);
        res.status(500).json({ success: false, error: errorData });
    }
};
