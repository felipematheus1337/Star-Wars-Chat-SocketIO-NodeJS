import React from "react"
import "./style.css"
import io from 'socket.io-client'
import {useState,useEffect} from "react"

const URL_IO = "http://localhost:3001"
const socket = io(URL_IO);


function Chat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [name,setName] = useState('')
    const [message,setMessage] = useState('')
    const [user,setUser] = useState()





    useEffect(() => {
        socket.on('connect', () => {
           setIsConnected(true);
           console.log(isConnected)
           
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
        <div>
            <h1>Chat</h1>
        </div>
    )
}


export default Chat;