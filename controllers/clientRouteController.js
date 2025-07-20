const Client = require("../models/Client");

// Add client
const addClient = async (req, res) => {
  try {
    const { name, email, mobile, country, state, pincode } = req.body;

    if (!name || !email || !mobile || !country || !state || !pincode) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const clientExists = await Client.findOne({ email });
    if (clientExists) {
      return res.status(400).json({ error: "Client with this email already exists" });
    }

    const newClient = await Client.create({
      name, email, mobile, country, state, pincode,
    });

    res.status(201).json({ message: "Client added successfully", client: newClient });
  } catch (error) {
    console.error("Add client error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Edit client
const editClient = async (req, res) => {
  try {
    const clientId = req.params.id;
    const updates = req.body;

    const updatedClient = await Client.findByIdAndUpdate(clientId, updates, { new: true });

    if (!updatedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client updated", client: updatedClient });
  } catch (error) {
    console.error("Edit client error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete client
const deleteClient = async (req, res) => {
  try {
    const clientId = req.params.id;

    const deletedClient = await Client.findByIdAndDelete(clientId);

    if (!deletedClient) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    console.error("Delete client error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addClient,
  editClient,
  deleteClient,
};
