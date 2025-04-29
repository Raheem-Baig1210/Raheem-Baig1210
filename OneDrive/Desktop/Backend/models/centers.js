const mongoose = require('mongoose');

const centerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  centerID: {
    type: String,
    required: true,
    unique: true
  },
  location: String,
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




// const mongoose = require("mongoose")
// const tutorSchema = require("./teacher")
// const studentSchema = require("./student")

// const schema=mongoose.Schema
// const centerSchema = new schema(
//     {

//         name: { type: String, required: true },
//         code: { type: String, required: true, unique: true },
//         location: { type: String, required: true },
//         city: { type: String, required: true },
//         contactperson: { type: String },
//         number: { type: Number, required: true },
//         images: { type: [String], required: true },
//         tutors: [tutorSchema],
//         students: [studentSchema]

//     }
// )
// const Centers = mongoose.model("centers", centerSchema);

// module.exports = Centers;