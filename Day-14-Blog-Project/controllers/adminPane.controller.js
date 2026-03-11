import blogModel from "../model/blogModel.js";
import userModel from "../model/userModel.js";
import bcrypt from "bcrypt";

const adminPanelController = {
    adminDashboard(req, res) {
        res.render('index');
    },
    // loginPage(req, res) {
    //     res.render('./pages/login');
    // },

    // async loginUser(req, res) {
    //     const { email, password } = req.body;

    //     const user = await userModel.findOne({ email });
    //     if (user) {
    //         if (user.password == password) {
    //             res.cookie('id', user.id);
    //             return res.redirect('/admin');
    //         } else {
    //             return res.redirect('/login');
    //         }
    //     } else {
    //         return res.redirect('/login');
    //     }
    // },

    // registerPage(req, res) {
    //     res.render('./pages/register');
    // },
    // async registerUser(req, res) {
    //     const { username, email, password, confirmPassword } = req.body;


    //     if (password == confirmPassword) {
    //         const hashedPassword = await bcrypt.hash(password, 10);
    //         await userModel.create({ username, email, password: hashedPassword });
    //         return res.redirect('/login');
    //     } else {
    //         return res.redirect('/register');
    //     }
    // },

    // logoutUser(req, res) {
    //     req.logout(function (err) {
    //         if (err) { return next(err); }
    //         return res.redirect('/login');
    //     });
    // },

    addBlogPage(req, res) {
        res.render('./pages/add-blog');
    },

    async addBlog(req, res) {
        req.body.image = req.file.path;
        await blogModel.create(req.body);
        res.redirect('/admin/my-blogs');
    },

    async myBlogsPage(req, res) {

        const blogs = await blogModel.find({author : req.user.id});
        res.render('./pages/my-blogs', { blogs });
    },

    async viewRegisteredUsers(req, res) {
        const users = await userModel.find();
        res.render('./pages/view-registered-users', { users });
    }

    
}

export default adminPanelController;