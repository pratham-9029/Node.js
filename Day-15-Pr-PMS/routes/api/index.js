import { Router } from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";
import catRouter from "./category.route.js";

const apiRouter = Router();

apiRouter.use('/user',userRouter)
apiRouter.use('/product', productRouter)
apiRouter.use('/category', catRouter)

export default apiRouter;