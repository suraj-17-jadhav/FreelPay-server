const express = require("express");
const router = express.Router();

const { addClient, editClient, deleteClient} = require("../controllers/clientRouteController");

const authMiddleware = require("../middlewares/authMiddleware");

// Routes with middleware
router.post("/client", authMiddleware, addClient);
router.put("/client/:id", authMiddleware, editClient);
router.delete("/client/:id", authMiddleware, deleteClient);

module.exports = router;
