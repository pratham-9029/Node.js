import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:String,
    image:String
},{
    timestamps:true
})

const categoryModel = mongoose.model('categoryTbl', categorySchema)

export default categoryModel;