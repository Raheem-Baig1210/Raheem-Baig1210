const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{type:Number, default:0},//2: admin , 1: tutors+
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

module.exports = User;