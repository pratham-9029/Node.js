import express from 'express';
import mongoose from 'mongoose';
import {env} from './config/dotenv.js';
import bodyParser from 'body-parser';
import userModel from './models/user_Model.js';
import db from './config/db.js';

const app = express();
const port = env.PORT || 3000;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/',(req,res)=>{

    userModel.create(req.body)
    .then((data)=>{
        res.redirect('/');
    }).catch((err)=>{
        console.log(err);
    })

    return res.redirect(req.get('Referrer') || '/');
})

app

app.listen(port, (err) => {
    if (err) {
      console.error(`Server error: ${err}`);
    }else{
        console.log(`Server is running on port ${port}`);
    }
});
