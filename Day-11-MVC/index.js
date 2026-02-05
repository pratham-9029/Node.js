import express from "express";
import { envConfig } from "./configs/dotenv.js";
import database from "./configs/database.js";

const app = express();
const PORT = envConfig.PORT || 3000;

app.listen(PORT, (err) => {
    if (err) {
        console.log(err);
    }
    console.log(`Server is running on port ${PORT}`);
});
