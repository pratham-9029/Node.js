
import fs from "fs";
import categoryModel from "../../models/categoryModel.js";

export const createCategory = async (req, res) => {
    try {
        if (req.file) {
            req.body.image = req.file.path;
        }
        const product = await categoryModel.create(req.body);
        return res.json(product);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

export const getAllCategory = async (req, res) => {
    try {
        const products = await categoryModel.find({});
        return res.json(products);
    } catch (error) {
        return res.json({ error: error.message });
    }
}

// export const deleteCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const dltProduct = await categoryModel.findByIdAndDelete(id);
//         return res.json(dltProduct);
//     } catch (error) {
//         return res.json({ error: error.message });
//     }
// }

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;

        if (req.file) {
            req.body.image = req.file.path;
        }

        const update = await categoryModel.findByIdAndUpdate(id, req.body);
        fs.unlinkSync(update.image);

        return res.json({ message: "success" });
    } catch (error) {
        return res.json({ error: error.message })
    }
}