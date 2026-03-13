import {Router} from "express";
import { createUser } from "../../controller/user.controller.js";

const userRouter = Router();

//user created
userRouter.post('/',createUser)

export default userRouter;