const express=require("express")
const path=require("path")
const teacher=require("../controllers/teacher")

const router=express.Router()

//add students to center
router.put("/addStudents/:centerID",teacher.addstd)
//remove student
//students of the center
router.get("/students/C/:id",teacher.showstudents)
//teacher dashboard
router.use("/students",teacher.teacherdashbord)
//mark todays attendance for students
router.put("/markattendance/:centerID",teacher.markAttendance)
//attendance page
router.use("/attendance",teacher.attendance)
//TODO
router.get("/attendaceOfAllStudents",teacher.attedanceOfAllStudents)
//temperory route to fetch attendance, GEOLOCATION  
router.use("/location",teacher.location)

// router.post("/markAttedance",isLoggedIn,teacher.MarkAttendance)


module.exports=router