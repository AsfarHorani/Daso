
const multer = require("multer");


const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error("Only .png, .jpg and ,jpeg formats are allowed!!"))
    }
  }


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    },
    fileFilter: fileFilter
});


const upload = multer({ storage: fileStorageEngine })

module.exports = upload;