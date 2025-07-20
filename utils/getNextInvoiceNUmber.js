// utils/getNextInvoiceNumber.js
const Counter = require("../models/Counter");

const getNextInvoiceNumber = async () => {
  const counter = await Counter.findOneAndUpdate(
    { name: "invoice" },
    { $inc: { value: 1 } },
    { new: true, upsert: true }
  );

  const paddedNumber = String(counter.value).padStart(4, "0");
  return `INV-${paddedNumber}`;
};

module.exports = getNextInvoiceNumber;
