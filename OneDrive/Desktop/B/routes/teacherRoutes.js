const express=require("express")
const path=require("path")
const teacher=require("../controllers/teacher")

const router=express.Router()

//add students to center
router.put("/:centerID/addStudents",teacher.addstd)
//remove student
router.delete("/:centerID/removeSt",teacher.removestd)
//students of the center
router.get("/students/C/:id",teacher.showstudents)
//teacher dashboard
router.use("/students",teacher.teacherdashbord)
//mark todays attendance for students
router.put("/:centerID/markattendance",teacher.markAttendance)
//attendance page
router.use("/attendance",teacher.attendance)
//TODO
router.get("/attendaceOfAllStudents",teacher.attedanceOfAllStudents)
//temperory route to fetch attendance, GEOLOCATION  
router.use("/location",teacher.location)

// router.post("/markAttedance",isLoggedIn,teacher.MarkAttendance)


module.exports=router