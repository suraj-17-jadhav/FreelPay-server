const express = require("express");
const router = express.Router();

const {
  createPayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
} = require("../controllers/paymentRouteController");

const authMiddleware = require("../middlewares/authMiddleware");

// Routes with auth middleware
router.post("/payment", authMiddleware, createPayment);
router.get("/payment", authMiddleware, getAllPayments);
router.get("/payment/:id", authMiddleware, getPaymentById);
router.delete("/payment/:id", authMiddleware, deletePayment);

module.exports = router;
