const path=require("path")
// const moment = require('moment');

const students=require("../models/student")
const centers=require("../models/centers")

exports.teacherdashbord=async (req,res)=>{
    console.log("req.originalUrl:", req.originalUrl);
    // data=req.body
    // const stds=new students(data)
    // await stds.save()
    res.send("Welcome teacher")
}

exports.addstd = async (req, res) => {
    try {
        const centerId = req.params.centerID;
        const students = req.body;  // Assuming req.body contains an array of students.

        if (!centerId || !Array.isArray(students) || students.length === 0) {
            return res.status(400).send("Missing required student data or centerID");
        }

        // Iterate through each student and ensure only the required fields are included
        const validatedStudents = students.map(student => {
            // Ensure that each student has name and studentId
            if (!student.name || !student.studentId) {
                throw new Error("Missing required student fields (name or studentId)");
            }
            // Initialize attendance as an empty array
            student.attendance = [];
            return student;
        });

        const result = await centers.updateOne(
            { centerID: centerId },
            { $push: { students: { $each: validatedStudents } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send("Center not found or no update made");
        }

        res.send("Students added successfully");
    } catch (err) {
        console.error("Error adding student:", err);
        res.status(500).send("Internal server error");
    }
}


exports.removestd = async (req, res) => {
    try {
        const centerId = req.params.centerID;
        const { studentIds } = req.body; // array of studentId

        if (!centerId || !Array.isArray(studentIds) || studentIds.length === 0) {
            return res.status(400).send("Missing or invalid centerID or studentIds");
        }

        const result = await centers.updateOne(
            { centerID: centerId },
            { $pull: { students: { studentId: { $in: studentIds } } } }
        );

        if (result.modifiedCount === 0) {
            return res.status(404).send("No students removed");
        }

        res.send("Students removed successfully");
    } catch (err) {
        console.error("Error removing students:", err);
        res.status(500).send("Internal server error");
    }
};



 exports.showstudents=async (req, res) => {
    try {
        const center = await centers.findOne({ centerID: req.params.id }, 'students');
        if (!center) return res.status(404).send("Center not found");
        res.json(center.students);
      } catch (err) {
        res.status(500).send('Server Error');
      }
};
exports.markAttendance = async (req, res) => {
    try {
        const centerId = req.params.centerID;
        const presentStudentIds = req.body.presentStudents; // array of studentId
        const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format

        const center = await centers.findOne({ centerID: centerId });
        if (!center) return res.status(404).send("Center not found");

        for (let student of center.students) {
            const isPresent = presentStudentIds.includes(student.studentId);
            const alreadyMarked = student.attendance.some(a =>
                a.date.toISOString().split("T")[0] === today
            );
            if (!alreadyMarked) {
                student.attendance.push({
                    date: new Date(),
                    status: isPresent ? "Present" : "Absent"
                });
            }
        }

        await center.save();
        res.send("Attendance marked successfully");
    } catch (err) {
        console.error("Attendance marking error:", err);
        res.status(500).send("Internal server error");
    }
};

exports.attendance=async (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','loc.html'))
}

exports.attedanceOfAllStudents=async (req,res)=>{

}

exports.location=async (req,res)=>{
    const { latitude, longitude, center } = req.body;
    console.log('Received location:', latitude, longitude, center);
    if(!latitude) res.send("Unable to fetch Location")
    const centerlocation = await centers.findOne({ centerID: center }, { location: 1, _id: 0 });
    // centerlocation.location=`${latitude} ${longitude}`
    const newLat = parseFloat(parseFloat(latitude).toFixed(3));
    const newLon = parseFloat(parseFloat(longitude).toFixed(3))
    try{
        const {location}=centerlocation
        console.log(centerlocation, newLat, newLon, typeof location)
        console.log(Object.keys(centerlocation))
        console.log(JSON.stringify(centerlocation))
    if(`${newLat} ${newLon}`==centerlocation.location){
        console.log("attendance succesfull")
        res.send("Attendance success")
    }
    else{
        res.send("attendance fail")
        console.log("Fail")
    }
    }
    catch(err){
        res.send(err.message)
        console.log(err.message)
    }
}