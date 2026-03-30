
import fs from "fs";
import extraCategoryModel from "../../models/extraCategoryModel.js";

export const createExtraCategory = async (req, res) => {
    try {
        req.body.image = req.file.path;
        const product = await extraCategoryModel.create(req.body);
        return res.json(product);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const getAllExtraCategory = async (req, res) => {
    try {
        const products = await extraCategoryModel.find({});
        return res.json(products);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// export const deleteExtraCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const dltProduct = await extraCategoryModel.findByIdAndDelete(id);
//         return res.json(dltProduct);
//     } catch (error) {
//         return res.json({ error: error.message });
//     }
// }

export const updateExtraCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.file) {
            req.body.image = req.file.path;
        }

        const update = await extraCategoryModel.findByIdAndUpdate(id, req.body);
        fs.unlinkSync(update.image);

        return res.json({ message: "success" });
    } catch (error) {
        return res.json({ error: error.message })
    }
}