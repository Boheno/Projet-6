const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp'
};

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, callback) => {
    if (MIME_TYPES[file.mimetype]) {
      callback(null, true);
    } else {
      callback(new Error("Seules les images JPG, JPEG, PNG et WebP sont autorisées"), false);
    }
  }
});

const processImage = (req, res, next) => {
  if (!req.file) {
    return next();
  }

  const name = req.file.originalname.split(' ').join('_').split('.')[0];
  const filename = `${name}_${Date.now()}.webp`;
  const outputPath = path.join(__dirname, '../images/', filename);

  sharp(req.file.buffer)
    .resize(206, 260, { fit: 'fill' })
    .toFormat('webp')
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      req.file.filename = filename;
      req.file.path = outputPath;
      req.file.mimetype = "image/webp";
      next();
    })
    .catch(error => {
      console.error("Erreur Sharp:", error);
      res.status(500).json({ error: "Erreur lors du traitement de l'image" });
    });
};

module.exports = { upload: upload.single('image'), processImage };
