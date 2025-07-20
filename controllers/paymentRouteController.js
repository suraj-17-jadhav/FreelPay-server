const Payment = require("../models/Payment");
const Invoice = require("../models/Invoice");

// Create a payment
const createPayment = async (req, res) => {
  try {
    const {
      invoice,
      freelancer,
      client,
      amountPaid,
      paymentMethod,
      transactionId,
      notes
    } = req.body;

    const newPayment = new Payment({
      invoice,
      freelancer,
      client,
      amountPaid,
      paymentMethod,
      transactionId,
      notes,
      status: "success"
    });

    await newPayment.save();

    // Optionally update invoice status if fully paid
    const relatedInvoice = await Invoice.findById(invoice);
    if (relatedInvoice) {
      if (amountPaid >= relatedInvoice.totalAmount) {
        relatedInvoice.status = "paid";
        relatedInvoice.paymentDate = new Date();
        relatedInvoice.paymentMethod = paymentMethod;
        await relatedInvoice.save();
      }
    }

    res.status(201).json({ message: "Payment recorded", payment: newPayment });
  } catch (error) {
    console.error("Create payment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("invoice")
      .populate("freelancer")
      .populate("client");

    res.status(200).json(payments);
  } catch (error) {
    console.error("Fetch payments error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("invoice")
      .populate("freelancer")
      .populate("client");

    if (!payment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.error("Fetch payment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete payment
const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await Payment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ error: "Payment not found" });
    }

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Delete payment error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  deletePayment
};