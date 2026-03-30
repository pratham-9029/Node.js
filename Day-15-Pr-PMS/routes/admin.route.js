import { Router } from "express";
import { addProductPage, dashboard, addCategoryPage, addSubCategoryPage, addExtraCategoryPage, addCategory, addSubCategory, addExtraCategory, viewCategoryPage, viewSubCategoryPage, viewExtraCategoryPage, addProduct, viewProductPage } from "../controller/admin.controller.js";
import imageUploads from "../middleware/imageUploads.js";

const adminRouter = Router()

adminRouter.get('/', dashboard)
adminRouter.get('/add-product', addProductPage)
adminRouter.post('/add-product', imageUploads, addProduct)

adminRouter.get('/view-products', viewProductPage)

adminRouter.get('/add-category', addCategoryPage)
adminRouter.post('/add-category', imageUploads, addCategory)

adminRouter.get('/view-category', viewCategoryPage)

adminRouter.get('/add-sub-category', addSubCategoryPage)
adminRouter.post('/add-sub-category', imageUploads, addSubCategory)

adminRouter.get('/view-sub-category', viewSubCategoryPage)

adminRouter.get('/add-extra-category', addExtraCategoryPage)
adminRouter.post('/add-extra-category', imageUploads, addExtraCategory)

adminRouter.get('/view-extra-category', viewExtraCategoryPage)

export default adminRouter;