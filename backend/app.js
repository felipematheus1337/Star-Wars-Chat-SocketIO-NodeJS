import express from "express";
import cors from "express";
import {createServer} from "http"
import {Server} from 'socket.io'
import db from "./config/dbConnect.js";
import autores from "./models/Autor.js";
import autorRoutes from "./routes/autorRoutes.js";
import Message from "./models/Message.js";
import Autor from "./models/Autor.js";
import mongoose from "mongoose"

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


const io = new Server(httpServer,{cors:{origin:'*'}},{transports: ['websocket'],upgrade:false})

io.on('connection', (socket) => {
    console.log('conectou')
    
      
      socket.on("disconnect",() => {
          console.log("X desconectou : "+ socket.id);
        })
  
      socket.on("message",async (data) => {
        let mensagem = await Message.create(data)
        if(mensagem) {
          let msgs= await Message.find({}).sort({createdAt:-1});
          const characters = await generateCharsWithRespectiveMessage(msgs);
          //const sortedCharacters = characters.sort((a,b) => b.created_at - a.created_at);
          socket.emit('showMessage',characters)
        }
      })

      socket.on('listAllMessages',async (data) => {
        if(data.toRender === true) {
          let mensagem = await Message.find({}).sort({createdAt:-1});
          const characters = await generateCharsWithRespectiveMessage(mensagem);
          //const sortedCharacters = characters.sort((a,b) => b.created_at - a.created_at);
          socket.emit('showMessage',characters)
        }
      })
      
  })

 app.use(autorRoutes);


 app.post("/msg",async (req,res) => {
   let mensagem = await Message.create(req.body);
   return res.status(201).json(mensagem);
 })

 app.get("/msg",async (req,res) => {
  let listOfMensages = await Message.find({});
  return res.status(200).json(listOfMensages);
 })


 

 
 

const generateCharsWithRespectiveMessage = async (mensagem) => {
  console.log(mensagem);
  var autorsId = [];
  var msgsId = [];
  var autors = [{}];
  var created = [{}];

  var messages = [];
  var imagesUrl = []
  var autor;
  var characters = [{}];
  // Generate params 
  try {
    for(let i = 0; i<mensagem.length; i++){
      autorsId.push(mensagem[i].autor[0])
      msgsId.push(mensagem[i]._id)
      messages.push(mensagem[i].msg)
      created.push(mensagem[i].createdAt)
    
    await(Autor.findById(autorsId[i])).then(res => {
     
      autor = res
      imagesUrl.push(res.image);
    })
    autors.push(autor);
    }
    autors.shift();
    
    
   // Generate Object Character
    for(let j = 0; j < autors.length; j++) {
      characters.push({
        msgId: msgsId[j],
        autorId: autorsId[j],
        name: autors[j].name,
        color: autors[j].color,
        message: messages[j],
        imageUrl: imagesUrl[j],
        created_at:created[j]
      })
    }
    
    
  } catch(e) {
    console.log(e)
    return;
  }
 

  
  return characters;
}
  


export default app;