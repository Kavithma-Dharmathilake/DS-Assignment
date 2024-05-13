const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController.js');

router.post("/payment", paymentController.processPayment);
router.post("/getPayments", paymentController.getPayments);
router.post("/singlePayment", paymentController.processSinglePayment);

module.exports = router;
