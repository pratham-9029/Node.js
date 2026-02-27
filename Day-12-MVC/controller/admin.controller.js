import { log } from "console";
import shoeModel from "../model/shoeModel.js";
import fs from 'fs';

const adminController = {
    homePage: (req, res) => {
        return res.render('index');
    },

    //Render Add Shoe Page
    addShoePage: (req, res) => {
        return res.render('./pages/add-shoe');
    },

    //Adding Shoes
    addShoe: async (req, res) => {
        req.body.image = req.file.path;
        await shoeModel.create(req.body);
        return res.redirect('/admin/add-shoe');
    },

    //Rende View Shoe Page
    viewShoe: async (req, res) => {
        const shoes = await shoeModel.find();
        return res.render('pages/view-shoe', { shoes });
    },

    //Deleting Shoes
    deleteShoe: async (req, res) => {
        const dltShoe = req.params.id;

        const data = await shoeModel.findByIdAndDelete(dltShoe);
        if (data.image) {
            fs.unlinkSync(data.image);
        }
        console.log("Deleted Successfully !!");
        return res.redirect('/admin/view-shoe');
    },


    //Render Edit Shoe Page
    editShoePage: async (req, res) => {
        const editShoe = await shoeModel.findById(req.params.id);
        return res.render('pages/edit-shoe', { editShoe });
    },

    //Editing Shoes
    editShoe: async (req, res) => {
        const updateID = req.params.id;
        const data = await shoeModel.findById(updateID);

        if (data.image) {
            fs.unlinkSync(data.image);
        }
        req.body.image = req.file.path;

        await shoeModel.findByIdAndUpdate(req.params.id, req.body);
        console.log("Updated Successfully !!");
        return res.redirect('/admin/view-shoe');
    }
};

export default adminController;
