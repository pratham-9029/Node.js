import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";

export const createUser = async(req,res)=>{
    try {
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password,salt);
        const user = await userModel.create(req.body);
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.json({error:error.message})
    }
}

export const getAllUser = async(req,res)=>{
    try {
        let users = await userModel.find({});
        return res.json(users);
    } catch (error) {
        console.log(error.message);
        return res.json({error:error.message})
    }
}

export const getUser = async(req,res) =>{
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.json({error:error.message})
    }
}

export const deleteUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const dltUser = await userModel.findByIdAndDelete(id);
        return res.json(dltUser); 
    } catch (error) {
        console.log(error.message);
        return res.json({error:error.message})
    }
}