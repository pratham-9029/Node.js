import mongoose from "mongoose";

const extraCategorySchema = new mongoose.Schema({
    name: String,
    image: String,
},
{
    timestamps:true
})

const extraCategoryModel = mongoose.model('extraCategoryTbl', extraCategorySchema)

export default extraCategoryModel;
