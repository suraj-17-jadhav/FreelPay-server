const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  invoice: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Client",
    required: true
  },
  amountPaid: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  paymentMethod: {
    type: String,
    enum: ["bank", "paypal", "upi", "stripe", "cash", "other"],
    required: true
  },
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  notes: {
    type: String
  },
  status: {
    type: String,
    enum: ["success", "failed", "pending"],
    default: "success"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Payment", paymentSchema);
