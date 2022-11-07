import React from "react"
import "./style.css"
import io from 'socket.io-client'
import {useState,useEffect} from "react"
import {useContext} from "react";
import { useNavigate } from "react-router-dom";
import {CharContext} from "../context/CharContext.js";
import logo from "../assets/images/logo.png";
import wallpapers from "./wallpapers.json";
const URL_IO = "http://localhost:3001"
const socket = io(URL_IO);





function Chat() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [name,setName] = useState('')
    const [message,setMessage] = useState('')
    const [user,setUser] = useState()
    const {selectedChar} = useContext(CharContext)
    const [msg,setMsg] = useState("")
    


    const [selectedWallpaper,SetSelectedWallpaper] = useState([wallpapers.um,wallpapers.dois,
    wallpapers.tres,wallpapers.quatro,wallpapers.cinco])

    const selectWallpaper = selectedWallpaper.map(wallpaper => wallpaper)

    const changeWallpaper = (e) => {
      let url = selectedWallpaper[e.target.value].url
      localStorage.setItem('wallpaper',url)
      let bodie = document.getElementsByTagName('body')[0]
      bodie.style.backgroundImage = `url(${url})`
      

    }
   

    const firstRenderWallpaper = () => {
      let bodie = document.getElementsByTagName('body')[0]
      bodie.style.backgroundImage = localStorage.getItem('wallpaper') || "https://starwars-chat.s3.sa-east-1.amazonaws.com/wallpaper1.jpg"
    }


    
    useEffect(() => {
        socket.on('connect', () => {
           setIsConnected(true);
           socket.on('showMessage',(data) => {
            let messagesNotNull = data.filter((data) => {
              if(data.message) {
                return data;
              }
            })
            
           setUser(messagesNotNull);
          })
         

          socket.emit('listAllMessages',{
           toRender:true
          })
         
          firstRenderWallpaper();
           return () => {
             socket.off('connect');
             socket.off('disconnect');
           };
         });

         socket.emit('listAllMessages',{
          toRender:true
         })
           
          showMessageByDefault();
         
        
         
       },[])

       

       
       const sendMessage = async (e) => {
        e.preventDefault();
        let id = localStorage.getItem("charId")
        let userMsg = {
          autor:id,
          msg:msg
        }
        socket.emit('message',userMsg)
        let inputClear = document.getElementsByClassName("inputMsg")[0]
        inputClear.value = ''
         
       
       }

       const showMessageByDefault = () => {
        socket.on('showMessage',(data) => {
          let messagesNotNull = data.filter((data) => {
            if(data.message) {
              return data;
            }
          })
          
         setUser(messagesNotNull);
        })
        
      }

      const getProfile = () => {
        return localStorage.getItem("char") ? localStorage.getItem("char") : selectedChar.image;
      }




    return(
      <div className="forall">
      <img className="logo" src={logo}/>
     
      <select 
        className="select-wallpaper-chat"
        onChange={e => changeWallpaper(e)}>
          {
          selectWallpaper.map((wallpaper,key) => <option value={key}>{wallpaper.name}</option>)
          }
                  
        </select>
     
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
              
              <img src={getProfile()} className="img-profile"/>
              <input style={{color:selectedChar.color}}
               type="text" 
               placeholder="Digite sua mensagem"
                onChange={(e) => setMsg(e.target.value)}
                className="inputMsg"
                 />
              <button onClick={sendMessage} className="btn">
                Enviar
                </button>
             </div>

        </div>
        
        </div>
    )
}


export default Chat;