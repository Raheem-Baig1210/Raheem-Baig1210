const jwt = require('jsonwebtoken');
const secret_key="S3cR3IkEv"

function setuser(user){
    return jwt.sign({
        id:user._id,
        email:user.email,
        role:user.role
    },secret_key)
}

function getuser(token){
    if(!token) return null
    return jwt.verify(token,secret_key)
}

module.exports={
    setuser,getuser
}