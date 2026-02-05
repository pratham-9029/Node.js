import express from 'express';
import { env } from './config/dotenv.js';
import bodyParser from 'body-parser';
import userModel from './models/user_Model.js';
import db from './config/db.js';
import imageUpload from './middleware/imageUpload.js';
import fs from 'fs';


const app = express();
const port = env.PORT || 3000;
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));


app.get('/add-user', (req, res) => {
    res.render('index.ejs');
});

app.post('/add-user', imageUpload, (req, res) => {

    if (req.file) {
        req.body.image = req.file.path;
    }
    userModel.create(req.body)
        .then(() => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err);
        })

    return res.redirect(req.get('Referrer') || '/');
})

app.get('/view-users', (req, res) => {
    userModel.find()
        .then((data) => {
            return res.render('pages/view.ejs', { data });
        }).catch((err) => {
            console.log(err);
        })
})

app.get('/delete/usr/:id', (req, res) => {
    const dltUser = req.params.id;

    userModel.findByIdAndDelete(dltUser)
        .then((data) => {
            fs.unlinkSync(data.image);
            return res.redirect(req.get('Referrer') || '/');
        }).catch((err) => {
            console.log(err);
        })
})

app.listen(port, (err) => {
    if (err) {
        console.error(`Server error: ${err}`);
    } else {
        console.log(`Server is running on port ${port}`);
    }
});
