const {getuser}=require("../service/auth")

async function restricttologin(req,res,next){
    const userUid = req.cookies?.uid;
    // console.log(req)
    console.log(req.cookies?.uid)
    if (!userUid) return res.redirect("/login");
    const user =await getuser(userUid);
    if (!user) return res.redirect("/login");
  
    req.user = user;
    // console.log(req.user)
    next();
  }
  
  async function checkAuth(req, res, next) {
    const userUid = req.cookies?.uid;
  
    const user = getuser(userUid);
  
    req.user = user;
    next();
  }
  
function adminonly(req,res,next){
  if(req.user.role===3) next()
   else res.status(403).send("Unauthorised") 
}

function teacheronly(req,res,next){
  if(req.user.role===2 || req.user.role===3) next()
    else res.status(403).send("Unauthorised")
}

  module.exports = {
    restricttologin,
    checkAuth,
    adminonly,
    teacheronly
  };