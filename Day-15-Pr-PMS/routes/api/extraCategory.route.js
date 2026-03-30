import { Router } from "express";

import imageUploads from "../../middleware/imageUploads.js";
import { createExtraCategory, getAllExtraCategory, updateExtraCategory } from "../../controller/apiController/extraCategory.controller.js";


const catExtraRouter = Router();

//create product
catExtraRouter.post('/', imageUploads , createExtraCategory)

//get all product 
catExtraRouter.get('/', getAllExtraCategory);

//delete product 
// catExtraRouter.delete('/:id', deleteExtraCategory);

// update product
catExtraRouter.patch('/:id',imageUploads, updateExtraCategory)

export default catExtraRouter;