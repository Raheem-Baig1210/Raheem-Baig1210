const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: Number,
    required: true,
    enum: [0, 1, 2], // 0: Normal User, 1: Tutor, 2: Admin
    default: 0
  },
  // Tutor-specific fields
  number: {
    type: String,
    required: function() { return this.role === 1; }
  },
  specialisation: {
    type: String,
    required: function() { return this.role === 1; }
  },
  qualification: {
    type: String,
    required: function() { return this.role === 1; }
  },
  centerID: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    // required: function() { return this.role === 1; }
  }],
  experience: {
    type: String,
    required: function() { return this.role === 1; }
  },
  resume: {
    type: String,
    required: function() { return this.role === 1; }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);






// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     role:{type:Number, default:0},//2: admin , 1: tutors+
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("user", userSchema);

// module.exports = User;