const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://lando:W5XY6HMFpEV3nieA@cluster0.bgsgsrd.mongodb.net/?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      // directConnection: true,
    }
  )
  .then(() => console.log("Database connected"))
  .catch((e) => console.error("Database not connected:", e));

const db = mongoose.connection;

module.exports = db;
