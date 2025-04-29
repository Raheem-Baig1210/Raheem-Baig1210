const mongoose=require("mongoose")
const schema=mongoose.Schema

const studentSchema=new schema(
    {
    name: {type:String, required:true},
    studentId: {type:String, required:true,unique:true},
    attendance: [
        {
            date: Date,
            status: { type: String, enum: ["Present", "Absent"] }
        }
    ]
})

module.exports=studentSchema