const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/vacations-app",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      directConnection: true,
    }
  )
  .then(() => console.log("Database connected"))
  .catch((e) => console.error("Database not connected:", e));

const db = mongoose.connection;

module.exports = db;
