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
  centerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: function() { return this.role === 1; }
  },
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






const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  address: String,
  city: String,
  number: Number,
  contactperson: String,
  images: [String],
  tutors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User' // Only users with role = 1 (Tutor)
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Center', centerSchema);





const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true
  },
  attendance: [{
    date: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['Present', 'Absent'],
      required: true
    }
  }],
  centerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Center',
    required: true
  },
  tutorID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Only users with role = 1 (Tutor)
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', studentSchema);