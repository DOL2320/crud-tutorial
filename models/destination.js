// const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DestinationSchema = new Schema({
  name: String,
  location: String,
  photoURL: String,
  description: String,
});

module.exports = mongoose.model("Destination", DestinationSchema);
