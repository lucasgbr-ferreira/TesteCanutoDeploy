import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 
  },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Tipo de arquivo não suportado"), false);
    }

    cb(null, true);
  }
});

export default upload;
