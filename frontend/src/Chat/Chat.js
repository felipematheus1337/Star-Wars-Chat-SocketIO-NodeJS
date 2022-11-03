import React from "react"
import "./style.css"
import io from 'socket.io-client'
import {useState,useEffect} from "react"
import {useContext} from "react";
import {CharContext} from "../context/CharContext.js";

const URL_IO = "http://localhost:3001"
const socket = io(URL_IO);


function Chat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [name,setName] = useState('')
    const [message,setMessage] = useState('')
    const [user,setUser] = useState()
    const {selectedChar} = useContext(CharContext)





    useEffect(() => {
        socket.on('connect', () => {
           setIsConnected(true);
           socket.on('showMessage',(data) => {
            console.log("chegou")
            setUser(data)
            console.log(user)
      
          })
           
           return () => {
             socket.off('connect');
             socket.off('disconnect');
           };
         });
         
       },[])

       
       const sendMessage = async (e) => {
        e.preventDefault();
        let userMsg = {
          name,
          message
        }
        socket.emit('message',userMsg)
    
        socket.on('showMessage',(data) => {
          console.log("chegou")
          setUser(data)
          console.log(user)
    
        })
       }





    return(
        <div class="container-chat">
             <section className="section-chat">
                 <div>Mensagem aqui:</div>
                 <div>Mensagem aqui:</div>
             </section>

             <div className="sendmessage">
              <input type="text" placeholder="Digite sua mensagem" />
              <button onClick={sendMessage}>Enviar</button>
             </div>

        </div>
    )
}


export default Chat;