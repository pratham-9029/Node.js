import categoryModel from "../models/categoryModel.js";
import subCategoryModel from "../models/subCategoryModel.js";
import extraCategoryModel from "../models/extraCategoryModel.js";
import productModel from "../models/productModel.js";

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
    const { name,price,description,category,subCategory,extraCategory } = req.body;
    const data = { name,price,description,category,subCategory,extraCategory };
    if (req.file) {
        data.image = req.file.path;
    }
    await productModel.create(data);
    res.redirect("/add-product");
};

export const viewProductPage = async (req, res) => {
    const response = await fetch("http://localhost:8081/api/product",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
    const product = await response.json();
    res.render("pages/product/view-product", { product });
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
    const response = await fetch("http://localhost:8081/api/category",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
    const category = await response.json();
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
    const response = await fetch("http://localhost:8081/api/sub-category",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
    const subCategory = await response.json();
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
    const response = await fetch("http://localhost:8081/api/extra-category",{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
    const extraCategory = await response.json();
    res.render("pages/extra-category/view-extra-category", { extraCategory });
};
