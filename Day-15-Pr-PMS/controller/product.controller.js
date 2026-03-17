import productModel from "../models/productModel.js"

export const creatProduct = async (req, res) => {
    try {
        // req.body.image = req.file.path;
        const product = await productModel.create(req.body);
        return res.json(product);
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
}

export const getAllProduct = async (req,res)=>{
    try {
        const products = await productModel.find({});
        return res.json(products);
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
}

export const deleteProduct = async (req,res)=>{
    try {
        const {id} = req.params;
        const dltProduct = await productModel.findByIdAndDelete(id);
        return res.json(dltProduct);
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message });
    }
}