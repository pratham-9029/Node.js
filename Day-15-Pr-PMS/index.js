import express from "express";
import db from "./config/database.js";
import { envConfig } from "./config/dotenv.js";
import router from "./routes/index.js";
import bodyParser from "body-parser";

const app = express();
const PORT = envConfig.PORT || 3000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use('/uploads',express.static("uploads"));
app.use(router)

app.listen(PORT, (err) => {
    if (!err) {
        console.log("Server Started.");
        console.log("http://localhost:"+PORT);
    }
})