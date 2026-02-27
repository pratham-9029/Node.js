import userModel from "../model/userModel.js";

const adminPanelController = {
    adminDashboard(req,res){
        res.render('index');
    },
    loginPage(req,res){
        res.render('./pages/login');
    },

    async loginUser(req,res){
        const {email,password} = req.body;
        
        const user = await userModel.findOne({email});
        if(user){
            if(user.password == password){
                res.cookie('id',user.id);
                return res.redirect('/admin');
            }else{
                return res.redirect('/login');
            }
        }else{
            return res.redirect('/login');
        }
    },

    registerPage(req,res){
        res.render('./pages/register');
    },
    async registerUser(req,res){
        const {username,email,password,confirmPassword} = req.body;

        
        if(password == confirmPassword){
            await userModel.create(req.body);
            return res.redirect('/login');
        }else{
            return res.redirect('/register');
        }
    },

    logoutUser(req,res){
        res.clearCookie('id');
        return res.redirect('/login');
    }
}

export default adminPanelController;