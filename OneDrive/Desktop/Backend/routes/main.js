const express=require("express")
const path=require("path")
const homepage=require("../controllers/home")
const user=require("../controllers/user")

const router=express.Router()

router.get("",homepage.home)
router.post("/user",user.signup)
router.get("/signup",homepage.homeregister)
router.get("/login",homepage.login)
router.post("/login",user.login)


module.exports=router