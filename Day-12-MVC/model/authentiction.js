import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    confirm_password: String
})

const authModel = mongoose.model('auths', authSchema);

export default authModel;
