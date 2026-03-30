import { Router } from "express";

import imageUploads from "../../middleware/imageUploads.js";
import { createSubCategory, getAllSubCategory, updateSubCategory } from "../../controller/apiController/subCategory.controller.js";


const catSubRouter = Router();

//create product
catSubRouter.post('/', imageUploads , createSubCategory)

//get all product 
catSubRouter.get('/', getAllSubCategory);

//delete product 
// catSubRouter.delete('/:id', deleteSubCategory);

// update product
catSubRouter.patch('/:id',imageUploads, updateSubCategory)

export default catSubRouter;