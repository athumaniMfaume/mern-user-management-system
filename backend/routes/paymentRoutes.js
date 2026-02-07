import express from 'express';
import { initiateAzamPay, azamPayCallback } from '../controllers/paymentController.js';
// verifyToken is no longer needed here if we want everyone to donate
// import { verifyToken } from '../middleware/authMiddleware.js'; 

const router = express.Router();

/**
 * @route   POST /api/payment/donate
 * @desc    Initiate donation (Public - Accessible to all)
 */
// ✅ REMOVED verifyToken to allow Guest + Authenticated users to donate
router.post('/donate', initiateAzamPay);

/**
 * @route   POST /api/payment/callback
 * @desc    Azampay Webhook to confirm payment status (Public)
 */
router.post('/callback', azamPayCallback);

export default router;



