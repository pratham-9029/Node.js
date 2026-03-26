import userModel from "../../models/userModel.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import { envConfig } from "../../config/dotenv.js";

export const createUser = async (req, res) => {
    try {
        let salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        const user = await userModel.create(req.body);
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message })
    }
}

export const getAllUser = async (req, res) => {
    try {
        let users = await userModel.find({});
        return res.json(users);
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userModel.findById(id);
        return res.json(user);
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message })
    }
}

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const dltUser = await userModel.findByIdAndDelete(id);
        return res.json(dltUser);
    } catch (error) {
        console.log(error.message);
        return res.json({ error: error.message })
    }
}

let OTP = null;

export const verifyEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await userModel.findOne({ email });

        if (user) {
            OTP = Math.floor(10000 + Math.random() * 900000);

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                port: 567,
                secure: false,
                auth: {
                    user: 'saixerorx5075@gmail.com',
                    pass: envConfig.USER_KEY
                }
            })

            const info = transporter.sendMail({
                from: 'saixerox5075@gmail.com',
                to: email,
                subject: 'OTP for Change Password',
                html: `
                        <h2>${user.name}</h2>
                        <p><strong>${OTP}</strong></p>
                    `
            })

            return res.json({ message: 'OTP Sent' })
        }
    } catch (error) {
        return res.json({ message: 'error', error: error.message });
    }
}

export const verifyOTP = (req, res) => {
    if (req.body.otp == OTP) {
        return res.json({ message: 'OTP Verified' });
    } else {
        return res.json({ message: 'OTP Not Match' });
    }
}