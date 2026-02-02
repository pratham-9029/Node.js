import express from "express"
import mongoose from "mongoose"
import { env } from "./config/dotenv.js"
import bodyParser from "body-parser"
import "./config/database.js"
import User from "./models/User.js"

const app = express();
const port = env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

app.get('/',(req,res)=>{
    return res.render('index');
})

app.post('/users', async (req, res) => {
    try {
        const { name, email, age } = req.body;
        
        const user = new User({
            name,
            email,
            age
        });
        
        await user.save();
        console.log('User created:', user);
        return res.redirect('/');
    } catch (error) {
        console.error('Error creating user:', error);
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        return res.render('users', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
    }
});

app.listen(port , (err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server Started");
        console.log("http://localhost:"+port);
    }
})