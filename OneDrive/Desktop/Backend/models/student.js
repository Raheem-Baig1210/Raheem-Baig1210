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



// const mongoose=require("mongoose")
// const schema=mongoose.Schema

// const studentSchema=new schema(
//     {
//     name: {type:String, required:true},
//     studentId: {type:String, required:true,unique:true},
//     attendance: [
//         {
//             date: Date,
//             status: { type: String, enum: ["Present", "Absent"] }
//         }
//     ]
// })

// module.exports=studentSchema