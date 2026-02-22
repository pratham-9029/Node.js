import mongoose from "mongoose";

const shoeSchema = new mongoose.Schema({
    image: String,
    name: String,
    rating: String,
    price: Number
})

const shoeModel = mongoose.model('shoes', shoeSchema);

export default shoeModel;
