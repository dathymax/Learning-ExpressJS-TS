import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";
import routers from "./routers";

const app = express();

app.use(cors({
    credentials: false
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(2509, () => {
    console.log("Server running on http://localhost:2509/");
});

const MONGO_URL = "mongodb+srv://dathymax:anhdathy123@cluster0.8m9c2nu.mongodb.net";

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => {
    console.log(error);
})

app.use("/", routers());