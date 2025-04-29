const User=require("../models/user")
const {setuser,getuser}=require("../service/auth")
const { v4: uuidv4 } = require('uuid');

exports.signup=async (req,res)=>{
    const { name, email, password, role } = req.body;
    try {
  await User.create({
    name,
    email,
    password,
    role
  });
  console.log(__dirname,"user signed up")
} catch (err) {
  console.log(err, "err in signup");
  if (err.errorResponse.errmsg.includes("duplicate key")) {
    res.status(400).json({ message: "Email Already Exists!", success: false });
  } else {
    res.status(500).json({ message: "Internal Server Error!", success: false });
  }
  res.redirect("/");
}
}
exports.login = async (req, res) => {
  try {
      const { email, password, role } = req.body;

      if (!email || !password) {
          return res.status(400).send("Missing email, password, or role");
      }

      const user = await User.findOne({ email, password});

      if (!user) {
          return res.status(401).send("Email, password, or role is incorrect");
      }

      const token = setuser(user);
      res.cookie("uid", token, { httpOnly: true, secure: true });
      res.redirect("/");
  } catch (err) {
      console.error("Login error:", err);
      res.status(500).send("Internal server error");
  }
};