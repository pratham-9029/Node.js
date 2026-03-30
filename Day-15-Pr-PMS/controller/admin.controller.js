import categoryModel from "../models/categoryModel.js";
import subCategoryModel from "../models/subCategoryModel.js";
import extraCategoryModel from "../models/extraCategoryModel.js";

export const dashboard = (req, res) => {
    res.render("index");
};

export const addProductPage = async (req, res) => {
    const category = await categoryModel.find();
    const subCategory = await subCategoryModel.find();
    const extraCategory = await extraCategoryModel.find();

    res.render("pages/product/add-product", {
        category,
        subCategory,
        extraCategory
    });
};
export const addProduct = async (req, res) => {
    const { name,category,subCategory,extraCategory } = req.body;
    const data = { name,category,subCategory,extraCategory };
    if (req.file) {
        data.image = req.file.path;
    }
    await productModel.create(data);
    res.redirect("/add-product");
};



export const addCategoryPage = async (req, res) => {
    res.render("pages/category/category");
};
export const addCategory = async (req, res) => {
    const { name } = req.body;
    const data = { name };
    if (req.file) {
        data.image = req.file.path;
    }
    await categoryModel.create(data);
    res.redirect("/add-category");
};

export const viewCategoryPage = async (req, res) => {
    const category = await categoryModel.find();
    res.render("pages/category/view-category", { category });
};



export const addSubCategoryPage = (req, res) => {
    res.render("pages/sub-category/sub-category");
};
export const addSubCategory = async (req, res) => {
    const { name } = req.body;
    const data = { name };
    if (req.file) {
        data.image = req.file.path;
    }
    await subCategoryModel.create(data);
    res.redirect("/add-sub-category");
};
export const viewSubCategoryPage = async (req, res) => {
    const subCategory = await subCategoryModel.find();
    res.render("pages/sub-category/view-sub-category", { subCategory });
};




export const addExtraCategoryPage = (req, res) => {
    res.render("pages/extra-category/extra-category");
};
export const addExtraCategory = async (req, res) => {
    const { name } = req.body;
    const data = { name };
    if (req.file) {
        data.image = req.file.path;
    }
    await extraCategoryModel.create(data);
    res.redirect("/add-extra-category");
};

export const viewExtraCategoryPage = async (req, res) => {
    const extraCategory = await extraCategoryModel.find();
    res.render("pages/extra-category/view-extra-category", { extraCategory });
};
