const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendWelcomeEmail = require("../services/welcomeEmail")


// Register User Controller
const registerUser = async (req, res) => {
  try {
    const { name, email, countryCode, mobile, password } = req.body;
    // 1. Basic validation
    if (!name || !email || !countryCode || !mobile || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // 3. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User already exists with this email" });
    }
    // 4. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // 5. create the token
    const token = crypto.randomBytes(32).toString("hex");
    // 6. Create new user
    const newUser = new User({
      name,
      email,
      countryCode,
      mobile,
      password: hashedPassword,
      isVerified: false,
      verificationToken: token,
    });
    await newUser.save();
    // Send email
    const verificationLink = `http://localhost:5000/api/verify-email?token=${token}`;
    sendWelcomeEmail(email,name,verificationLink);
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

// user email verification
const verifyEmail = async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });
  if (!user) {
    return res.status(400).json({ error: "Invalid or expired token" });
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  res.status(200).json({ message: "Email verified successfully!" });
};

// login User Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // 1. Check for required fields
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    // 2. Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.isVerified) {
      return res
        .status(401)
        .json({ error: "Please verify your email before logging in." });
    }
    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }
    // 4. Generate JWT token
    const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          name: user.name,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // or "7d"
    );
    // 5. Login successful (you can generate JWT here if needed)
    return res.status(200).json({ message: "Login successful",token, user });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyEmail,
};
