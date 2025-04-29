const centers=require("../models/centers")
const User=require("../models/user")
const {setuser,getuser}=require("../service/auth")
const { v4: uuidv4 } = require('uuid')

exports.dashbord=async (req,res)=>{
    // console.log("In the admin dashbord")
    // console.log(req.url)
    // let data=req.body
    // const center=new centers(data)
    // await center.save();
    // console.log("data created")
    // res.send("dashbord")
    res.send("ADMIN DASHBORD")
}

exports.addCenter = async (req, res) => {
    try {
        const { name,centerID,location,city,number, contactperson,  tutors, students } = req.body;

        if (!centerID ||!name) {
            return res.status(400).send("Center Id or name missingMissing required fields");
        }

        const existing = await centers.findOne({ centerID });
        if (existing) {
            return res.status(409).send("Center with this ID already exists");
        }

        const newCenter = new centers({
            name,
            centerID,
            location,
            number,
            contactperson,
            city,
            location,
            tutors: tutors || [],
            students: students || []
        });

        await newCenter.save();
        res.status(201).send("Center added successfully");
    } catch (err) {
        console.error("Error adding center:", err);
        res.status(500).send("Internal server error");
    }
};

exports.newteacher = async (req, res) => {
    const centerID = req.params.centerID;
    let { name, email, password,number,specialisation,qualification,experience,resume } = req.body;
    const role = 1; // 1 means Tutor
    password=password||"teacher123"
    
    try {
        if (!name || !email) {
            return res.status(400).send("Missing required fields");
        }
        const existing=await User.findOne({email})
        if(!existing){
            const newTutor = new User({
            name,
            email,
            password,
            role,
            number,
            specialisation,
            qualification,
            experience,
            resume
        });
        const savedTutor = await newTutor.save();
        if(centerID!="0"){
            const result = await centers.updateOne(
            { centerID: centerID },
            { $push: { tutors: savedTutor._id } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).send("Center not found or no update made");
        }
        }
        
        }
        else{
            const result = await centers.updateOne(
            { centerID: centerID },
            { $push: { tutors: existing._id } }
        );
        if (result.modifiedCount === 0) {
            return res.status(404).send("Center not found or no update made");
        }
        }
        
        res.send("Teacher added successfully");
    } catch (err) {
        console.error("Error adding teacher:", err);
        res.status(500).send("Internal server error");
    }
}


exports.removeCenter = async (req, res) => {
    const { centerID } = req.params;
        const result = await centers.deleteOne({ centerID });

        if (result.deletedCount === 0) {
            return res.status(404).send("Center not found");
        }

        res.send("Center removed successfully");
    } 

    exports.removeTeacher = async (req, res) => {
        try {
            const centerID = req.params.cId;
            const { email } = req.body;
            console.log(email,centerID)
            if (!centerID || !email) {
                return res.status(400).send("Missing centerID or teacher email");
            }
            const existing = await User.findOne(
                { email },
            );
            if(!existing){
                return res.status(404).send("Teacher not found")
            }
            const result = await centers.updateOne(
                { centerID },
                { $pull: { tutors: existing._id } }
            );
            const result2= await User.deleteOne({ email});

            if (result.modifiedCount === 0 && result2.deletedCount===0) {
                return res.status(404).send("Teacher not found or already removed");
            }
    
            res.send("Teacher removed successfully");
        } catch (err) {
            console.error("Error removing teacher:", err);
            res.status(500).send("Internal server error");
        }
    };
    
    

    exports.seecenters=async (req, res) => {
        console.log("see centers")
        try {
          const Centers = await centers.find(); // fetch all centers with full data
          res.json(Centers);
        } catch (err) {
          res.status(500).send("Server Error");
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
    
      