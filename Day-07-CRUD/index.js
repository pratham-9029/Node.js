
import express from "express"
const app = express();

const PORT = 7777;
let users = [];


app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')
 
app.get('/' ,(req,res)=>{
    return res.render('index',{users});
})

app.post('/create',(req,res)=>{
    
    let user = {
        id : Date.now(),
        pratham : req.body.text
    }
    users.push(user);

    console.log(users);
    
    return res.redirect(req.get('Referrer') ||'/')
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Server Start");
        console.log("http://localhost:"+PORT);
    }
})