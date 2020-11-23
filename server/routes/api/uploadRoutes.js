const router = require("express").Router();
const path = require("path");
const multer = require("multer");
const uploadController = require("../../controllers/uploadController");
const { protect, admin } = require("../../middleware/authMiddleware");

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// Check File Type
function checkFileType(file, cb) {
  const fileTypes = /jpg|jpeg|png/;
  // Check if file extension matches a fileType
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimeType = fileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    cb("Only accepts .jpg .jpeg and/or .png images.");
  }
}

// Middleware
const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// Route
router
  .route("/")
  .post(protect, admin, upload.single("image"), uploadController.uploadImage);

module.exports = router;
