const express=require("express")
const path=require("path")
const admin=require("../controllers/admin")


const router=express.Router()

//add tutor to a center
router.use("/:centerID/addtutor",admin.newteacher)
//add new center
router.post("/addCenter",admin.addCenter)
//remove center
router.delete("/removeCenter:id",admin.removeCenter)
//remove tutor from center
router.use("/removeTutor/:cId",admin.removeTeacher)
//see all centers
router.get("/Centers",admin.seecenters)
//dashboard
router.use("/",admin.dashbord)
//remove students
router.delete("/:centerID/removeSt",admin.removestd)


module.exports=router