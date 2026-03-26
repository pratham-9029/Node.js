import { Router } from "express";
import { creatProduct, deleteProduct, getAllProduct, updateProduct } from "../../controller/apiController/product.controller.js";
import imageUploads from "../../middleware/imageUploads.js";

const productRouter = Router();

//create product
productRouter.post('/', imageUploads , creatProduct)

//get all product 
productRouter.get('/', getAllProduct);

//delete product 
productRouter.delete('/:id', deleteProduct);

// update product
productRouter.patch('/:id',imageUploads, updateProduct)

export default productRouter;