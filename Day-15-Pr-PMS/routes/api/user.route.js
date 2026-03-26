import { Router } from "express";
import { createUser, deleteUser, getAllUser, getUser, verifyEmail, verifyOTP } from "../../controller/apiController/user.controller.js";

const userRouter = Router();

//user created
userRouter.post('/', createUser)

//get all user
userRouter.get('/', getAllUser);

//get seprate user
userRouter.get('/:id', getUser);

//delet user
userRouter.delete('/:id', deleteUser);

//verify Email
userRouter.post('/verifyEmail', verifyEmail);

//verify OTP
userRouter.post('/verifyOTP', verifyOTP);

export default userRouter;