import express from "express";
import cors from "express";
import {createServer} from "http"
import {Server} from 'socket.io'







const app = express();

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors());



app.set("view engine","ejs");

app.get("/",(req,res) => {
    res.render("index")
})

const httpServer = createServer(app);
httpServer.listen(3001,() => {
    console.log("conectou direito!")
})

const io = new Server(httpServer,{cors:{origin:'*'}})

io.on('connection', (socket) => {
    console.log('conectou')
    
      
      socket.on("disconnect",() => {
          console.log("X desconectou : "+ socket.id);
        })
  
      socket.on("message",(data) => {
        
      io.emit("showMessage",data);
       
      })
      
  })

export default io;