import { Router } from "express";
import userRouter from "./user.route.js";
import productRouter from "./product.route.js";

const apiRouter = Router();

apiRouter.use('/user',userRouter)
apiRouter.use('/product', productRouter)

export default apiRouter;