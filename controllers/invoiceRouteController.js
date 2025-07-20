const Invoice = require("../models/Invoice");

// Create Invoice
const createInvoice = async (req, res) => {
  try {
    const {
      client,
      freelancer,
      invoiceNumber,
      issueDate,
      dueDate,
      items,
      currency,
      taxPercentage,
      discount,
      notes,
    } = req.body;

    // Calculate totalAmount
    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const tax = subtotal * (taxPercentage / 100);
    const total = subtotal + tax - discount;

    const newInvoice = new Invoice({
      client,
      freelancer,
      invoiceNumber,
      issueDate,
      dueDate,
      items,
      currency,
      taxPercentage,
      discount,
      totalAmount: total,
      notes,
    });

    await newInvoice.save();
    res.status(201).json({ message: "Invoice created", invoice: newInvoice });
  } catch (error) {
    console.error("Create invoice error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get all invoices
const getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("client").populate("freelancer");
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Fetch invoices error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get invoice by ID
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("client").populate("freelancer");
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json(invoice);
  } catch (error) {
    console.error("Fetch invoice error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Update invoice
const updateInvoice = async (req, res) => {
  try {
    const updates = req.body;

    if (updates.items) {
      const subtotal = updates.items.reduce((sum, item) => sum + item.amount, 0);
      const tax = subtotal * (updates.taxPercentage || 0) / 100;
      updates.totalAmount = subtotal + tax - (updates.discount || 0);
    }

    const invoice = await Invoice.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice updated", invoice });
  } catch (error) {
    console.error("Update invoice error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete invoice
const deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }
    res.status(200).json({ message: "Invoice deleted" });
  } catch (error) {
    console.error("Delete invoice error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  createInvoice,
  getAllInvoices,
  getInvoiceById,
  updateInvoice,
  deleteInvoice,
};