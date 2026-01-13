
import express from "express"
const app = express();

const PORT = 7777;
let users = [];


app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.set('view engine','ejs')
 

//View HTML
app.get('/' ,(req,res)=>{
    return res.render('index',{users});
})


//Delete User
app.get('/delete/usr',(req,res)=>{

    users = users.filter((user)=>{
        return user.id != parseInt(req.query.id);
    })

    return res.redirect(req.get('Referrer') ||'/');
    
})


//Edit User
app.get('/edit/usr',(req,res)=>{
    const userId = parseInt(req.query.id);
    const user = users.find(u => u.id === userId);
    
    if(user) {
        return res.render('edit', { user });
    } else {
        return res.redirect('/');
    }
})


//Add User
app.post('/create',(req,res)=>{
    
    let user = {
        id : Date.now(),
        text : req.body.text
    }
    users.push(user);
    
    return res.redirect(req.get('Referrer') ||'/');
})

//Update User
app.post('/update',(req,res)=>{
    const userId = parseInt(req.query.id);
    const newText = req.body.text;
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if(userIndex !== -1) {
        users[userIndex].text = newText;
    }
    
    return res.redirect('/');
})


//Server Start
app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server Start");
        console.log("http://localhost:"+PORT);
    }
})