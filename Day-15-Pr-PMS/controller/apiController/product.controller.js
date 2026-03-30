import productModel from "../../models/productModel.js"
import fs from "fs";

export const creatProduct = async (req, res) => {
    try {
        req.body.image = req.file.path;
        const product = await productModel.create(req.body);
        return res.json(product);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const products = await productModel.find({}).populate("category").populate("subCategory").populate("extraCategory");
        return res.json(products);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const dltProduct = await productModel.findByIdAndDelete(id);
        return res.json(dltProduct);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.file) {
            req.body.image = req.file.path;
        }

        const update = await productModel.findByIdAndUpdate(id, req.body);
        fs.unlinkSync(update.image);

        return res.json({ message: "success" });
    } catch (error) {
        return res.json({ error: error.message })
    }
}