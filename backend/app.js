import express from "express";
import cors from "express";
import {createServer} from "http"
import {Server} from 'socket.io'
import db from "./config/dbConnect.js";
import autores from "./models/Autor.js";
import autorRoutes from "./routes/autorRoutes.js";
import Message from "./models/Message.js";

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

 app.use(autorRoutes);


 app.post("/msg",async (req,res) => {
   let mensagem = await Message.create(req.body);
   return res.status(201).json(mensagem);
 })

 app.get("/msg",async (req,res) => {
  let mensagem = await Message.find(req.body);
  console.log(mensagem);
  return res.status(201).json(mensagem);
})
  


export default app;