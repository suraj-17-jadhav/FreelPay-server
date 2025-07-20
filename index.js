// index.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/DbConnect'); // DB connection

// All routes
const userRoutes = require('./routes/userRoutes'); 
const clientRoutes = require('./routes/clientRoutes')      

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api',clientRoutes);

// Start server after DB connection
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to DB:', err);
});
