const multer = require("multer")



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb) => {
        const name = Date.now() + "_" + file.originalname;
        req.body.filename = name
        cb(null, name)
    }
})

const upload = multer({ storage })

module.exports=upload