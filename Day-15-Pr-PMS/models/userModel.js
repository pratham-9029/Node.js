import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

const userModel = mongoose.model('userTbl',userSchema);

export default userModel;