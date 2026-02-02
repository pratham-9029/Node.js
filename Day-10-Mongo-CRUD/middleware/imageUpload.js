import multer from 'multer';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    return cb(null, file.fieldname + '-' + Date.now())
  }
})
const imageUpload = multer({ storage: storage }).single('image');

export default imageUpload;
