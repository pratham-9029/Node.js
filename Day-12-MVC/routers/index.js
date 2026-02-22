import { Router } from "express";
import adminRouter from "./admin.route.js";
import authModel from "../model/authentiction.js";

const router = Router();

router.use('/admin', adminRouter);



// admin login
const admins = [
    {
        username: "admin",
        password: "admin@123"
    }
]
authModel.create(admins);



// admin login
router.get('/', (req, res) => {

    res.render('pages/login');

});
router.post('/', async (req, res) => {
    if (authModel.find(req.body)) {
        if (req.body.username === authModel.username && req.body.password === authModel.password) {
            res.redirect('/admin');
        }
    } else {
        console.log("Invalid Username or Password");
        res.redirect('/');
    }
})

// admin register
router.get('/register', (req, res) => {
    res.render('pages/register');
});
router.post('/register', async (req,res)=>{
    await authModel.create(req.body);
    res.redirect('/');
})

// admin logout
router.get('/log-out', async (req, res) => {
    res.redirect('/');
})
export default router;