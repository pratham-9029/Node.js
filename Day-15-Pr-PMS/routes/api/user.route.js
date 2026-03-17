import {Router} from "express";
import { createUser, deleteUser, getAllUser, getUser } from "../../controller/user.controller.js";

const userRouter = Router();

//user created
userRouter.post('/',createUser)

//get all user
userRouter.get('/', getAllUser);

//get seprate user
userRouter.get('/:id', getUser)

//delet user
userRouter.delete('/:id',deleteUser)

export default userRouter;