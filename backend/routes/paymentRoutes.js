import express from "express";
import {
  initiateHaloPesa,
  initiateAzamPay,
  azamPayCallback,
  initiateMpesa,
  mpesaCallback,
} from "../controllers/paymentController.js";

const router = express.Router();

router.post("/donate/halopesa", initiateHaloPesa);
router.post("/donate/azampay", initiateAzamPay);
router.post("/donate/mpesa", initiateMpesa);

router.post("/callback/azam", azamPayCallback);
router.post("/callback/mpesa", mpesaCallback);

export default router;



