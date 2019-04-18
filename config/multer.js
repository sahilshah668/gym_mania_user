const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpe|jpeg|png|gif/)) {
      cb(console.log("file not suported"), false);
      return;
    }
    cb(null, true);
  },
  limits: { fileSize: 5242880 }
});
