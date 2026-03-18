import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
    name: String,
    image: String
},
{
    timestamps:true
})

const subCategoryModel = mongoose.model('subCategoryTbl', subCategorySchema)

export default subCategoryModel;