import express from "express";
import cors from "express";
import {createServer} from "http"
import {Server} from 'socket.io'
import db from "./config/dbConnect.js";
import autores from "./models/Autor.js";
import mensagens from "./models/Mensagem.js";

const corsOptions ={
  origin:'http://localhost:3000',            //access-control-allow-credentials:true
  optionSuccessStatus:200
}

const app = express();
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({extended:false}))


const router = app._router;

var userMessages = []

app.set("view engine","ejs");

app.get("/",(req,res) => {
    res.render("index")
})

const httpServer = createServer(app);
httpServer.listen(3001,() => {
    console.log("conectou direito!")
})

db.on("error",console.log.bind(console, 'Erro de conexao'))

db.once("open", () => {
  console.log('conexao com o banco feita com sucesso!')
})


const io = new Server(httpServer,{cors:{origin:'*'}})

io.on('connection', (socket) => {
    console.log('conectou')
    
      
      socket.on("disconnect",() => {
          console.log("X desconectou : "+ socket.id);
        })
  
      socket.on("message",(data) => {
      userMessages.push(data);
      io.emit("showMessage",userMessages);
       console.log(userMessages)
      })
      
  })

  router.get("/char", (req,res) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Max-Age", "1800");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" );

    const starWarsCharacters = [
      {
        name:"Luke SkyWalker",
        id:1,
        color:"blue",
        message:"Ola",
      },
      {
        name:"Darth Vader",
        id:2,
        color:"black",
        message:"Ola",
      },
      {
        name:"Han Solo",
        id:3,
        color:"gray",
        message:"Ola",
      },
      {
        name:"Mandaloriano",
        id:4,
        color:"red",
        message:"Ola",
      },
      {
        name:"Leia",
        id:5,
        color:"pink",
        message:"Ola",
      },
    ]
    return res.status(200).json(starWarsCharacters)
  })

  router.post("/char",async (req,res) => {

  })

export default io;