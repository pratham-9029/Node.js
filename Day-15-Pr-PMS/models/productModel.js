import mongoose from "mongoose";

const productScema = new mongoose.Schema({
    name:String,
    description:String,
    image:String,
    price:Number,
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categoryTbl'
    },
    subcategory : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'subCategoryTbl'
    }
},{
    timestamps:true
})

const productModel = mongoose.model('productTbl', productScema)

export default productModel;