import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import router from "./routes/index.js"; 
import db from "./config/databse.js";
import { envConfig } from "./config/dotenv.js";

const app = express();
const PORT = envConfig.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(router);


app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("Server Started");
    console.log("http://localhost:" + PORT);
});