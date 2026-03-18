import { Router } from "express";

import imageUploads from "../../middleware/imageUploads.js";
import { createCategory, deleteCategory, getAllCategory, updateCategory, updateCategory } from "../../controller/category.controller.js";

const catRouter = Router();

//create product
catRouter.post('/', imageUploads , createCategory)

//get all product 
catRouter.get('/', getAllCategory);

//delete product 
catRouter.delete('/:id', deleteCategory);

// update product
catRouter.patch('/:id',imageUploads, updateCategory)

export default catRouter;