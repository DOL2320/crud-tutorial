const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    // directConnection: true,
  })
  .then(() => console.log("Database connected"))
  .catch((e) => console.error("Database not connected:", e));

const db = mongoose.connection;

module.exports = db;
