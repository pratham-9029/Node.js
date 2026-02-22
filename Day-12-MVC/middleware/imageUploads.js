import multer from "multer";

const storage = multer.diskStorage({
    destination(req,file,cb){
        return cb(null, "uploads/")
    },
    filename(req,file,cb){
        return cb(null, file.originalname)
    }
})

const imageUploads = multer({storage}).single('image')

export default imageUploads;