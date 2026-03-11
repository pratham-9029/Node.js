import express from "express";
import router from "./routes/index.js";
import morgan from "morgan";

const app = express();
const port = 3000;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(morgan("dev"));

app.use(router);

app.listen(port,(err)=>{
    if(err){
        console.log(err.message);
    }else{
        console.log("server started.");
        console.log("http://localhost:"+port);
    }
})



