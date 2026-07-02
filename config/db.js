const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000,
    });

    console.log("✅ MongoDB Connected");
    console.log("Host:", conn.connection.host);
    console.log("Database:", conn.connection.name);
    console.log("Ready State:", mongoose.connection.readyState);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;