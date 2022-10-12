const multer = require("multer");
const mime = require("mime-types");
var generator = require("generate-password");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },

  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "user-" + uniqueSuffix + "." + mime.extension(file.mimetype));
  },
});

const generatePassword = () =>
  generator.generate({
    length: 10,
    numbers: true,
    lowercase: true,
    uppercase: true,
    symbols: true,
    excludeSimilarCharacters: true,
    strict: true,
  });

const upload = multer({ storage: storage });

module.exports = { upload, generatePassword };
