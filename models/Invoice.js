const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client", // assuming you already have a Client model
    required: true,
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
  items: [
    {
      description: { type: String, required: true },
      quantity: { type: Number, required: true, default: 1 },
      amount: { type: Number, required: true },
    },
  ],
  currency: {
    type: String,
    default: "INR", // or "USD", etc.
  },
  taxPercentage: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["unpaid", "paid", "overdue"],
    default: "unpaid",
  },
  notes: {
    type: String,
  },
  paymentDate: {
    type: Date,
  },
  paymentMethod: {
    type: String, // e.g. 'bank', 'paypal', 'upi'
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);