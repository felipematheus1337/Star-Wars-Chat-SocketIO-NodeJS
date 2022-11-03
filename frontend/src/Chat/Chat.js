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
    const [conditional,setConditional] = useState(false)





    useEffect(() => {
        socket.on('connect', () => {
           setIsConnected(true);
           socket.on('showMessage',(data) => {
           setUser(data);
            
      
          })

          socket.emit('listAllMessages',{
           toRender:true
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
    
       
       }

       const showMessageByDefault = () => {
        socket.on('showMessage',(data) => {
          setUser(data)
    
        })
       }





    return(
        <div className="container-chat">
             <section className="section-chat">
                 {user && user.map(char => (
                  <div>
                    <ul className="characters">
                      <li key={char.msgId}> 
                        <img src={char.imageUrl} alt={char.autorId}></img>
                        <strong style={{color:char.color}}>{char.name}:</strong>
                        <p style={{color:char.color}}>{char.message}</p>
                      </li>
                    </ul>
                  </div>
                 ))}
             </section>

             <div className="sendmessage">
              <input type="text" placeholder="Digite sua mensagem" />
              <button onClick={showMessageByDefault}>Enviar</button>
             </div>

        </div>
    )
}


export default Chat;