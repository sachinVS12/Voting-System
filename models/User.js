const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    lowercase: true,
    trim: true,
  },
  hasVoted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enu: ["voter", "admin"],
    default: "voter",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//pre-save hashpassword to before save database
UserSchema.pre("save", async function (next) {
  if (!this.isMatch("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await hash.bcrypt(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
