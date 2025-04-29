const path=require("path")

exports.

home=(req,res)=>{
    console.log("main js running")
    res.sendFile(path.join(__dirname,'../','views','dashbord.html'))
}
exports.homeregister=(req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','register.html'))
}

exports.login=async (req,res)=>{
    res.sendFile(path.join(__dirname,'../','views','login.html'))
}
