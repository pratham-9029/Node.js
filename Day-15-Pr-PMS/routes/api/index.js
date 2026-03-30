import { Router } from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import catRouter from "./category.route.js";
import catSubRouter from "./subCategory.route.js";
import catExtraRouter from "./extraCategory.route.js";

const apiRouter = Router();

apiRouter.use('/user',userRouter)
apiRouter.use('/product', productRouter)
apiRouter.use('/category', catRouter)
apiRouter.use('/sub-category', catSubRouter)
apiRouter.use('/extra-category', catExtraRouter)
export default apiRouter;