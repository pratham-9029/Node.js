import { Router } from "express";

import imageUploads from "../../middleware/imageUploads.js";
import { createCategory, getAllCategory, updateCategory } from "../../controller/apiController/category.controller.js";

const catRouter = Router();

//create product
catRouter.post('/', imageUploads , createCategory)

//get all product 
catRouter.get('/', getAllCategory);

// update product
catRouter.patch('/:id',imageUploads, updateCategory)

export default catRouter;