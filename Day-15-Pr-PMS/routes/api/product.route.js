import { Router } from "express";
import { creatProduct, deleteProduct, getAllProduct } from "../../controller/product.controller.js";

const productRouter = Router();

//create product
productRouter.post('/', creatProduct)

//get all product 
productRouter.get('/',getAllProduct);

//delete product 
productRouter.delete('/:id',deleteProduct);

export default productRouter;