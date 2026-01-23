import mongoose from "mongoose"
import { env } from "./dotenv.js"

mongoose.connect(env.MONGO_URL);
const db = mongoose.connection``

db.on('connected',(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("Database Connected");
    }
})

export default db;