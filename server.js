const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const donorRoutes = require("./routes/donorRoutes");
const requestBloodRoutes = require("./routes/requestBloodRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express(); // ✅ MUST BE FIRST

// Middleware (ONLY ONCE)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/donors", donorRoutes);
app.use("/api/request-blood", requestBloodRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("RedHope API Running...");
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    

    app.listen(PORT, () => {
      console.log(`Server Running on Port ${PORT}`);
    });
  } catch (err) {
    console.error(err);
  }
};

startServer();