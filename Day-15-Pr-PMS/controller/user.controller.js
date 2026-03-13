import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async(req,res)=>{
    try {
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
        let user = await userModel.create(req.body);
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.json({error:error.message})
    }
}