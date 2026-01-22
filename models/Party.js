const mongoose = require("mongoose");

const partySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please provide party name"],
    unique: true,
    trim: true,
  },
  Symbol: {
    type: String,
    required: [true, "please provide party symbol"],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  votes: {
    type: number,
    default: 0,
  },
  color: {
    type: String,
    default: "#000000",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Party", partySchema);
