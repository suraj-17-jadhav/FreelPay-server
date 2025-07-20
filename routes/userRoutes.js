const express = require('express');
const router = express.Router();
const {registerUser, verifyEmail, loginUser} = require('../controllers/userRouteController');

//routes
router.post('/register', registerUser);
router.get("/verify-email", verifyEmail);
router.get('/login', loginUser);

module.exports = router;