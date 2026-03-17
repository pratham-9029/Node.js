import mongoose from "mongoose";

const productScema = new mongoose.Schema({
    name:String,
    description:String,
    image:String,
    price:Number
})

const productModel = mongoose.model('productTbl', productScema)

export default productModel;