const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
} = require("../controllers/invoiceRouteController");

const authMiddleware = require("../middlewares/authMiddleware"); // if you want protected routes

// Invoice routes with auth middleware
router.post("/invoice", authMiddleware, createInvoice);
router.get("/invoice", authMiddleware, getAllInvoices);
router.get("/invoice/:id", authMiddleware, getInvoiceById);
router.put("/invoice/:id", authMiddleware, updateInvoice);
router.delete("/invoice/:id", authMiddleware, deleteInvoice);

module.exports = router;