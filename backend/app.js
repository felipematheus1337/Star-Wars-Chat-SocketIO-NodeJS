import express, { urlencoded } from "express";
import cors from "express";

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());
import http  from "http"
//var io = require("socket.io")(http.createServer(app));
import {Server} from 'socket.io';
const io = new Server(http.createServer(app))



app.set("view engine","ejs");
app.get("/",(req,res) => {
    res.render("index")
})


export default app;