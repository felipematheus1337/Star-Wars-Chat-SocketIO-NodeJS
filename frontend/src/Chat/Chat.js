import React from "react"
import "./style.css"
import io from 'socket.io-client'
import {useState,useEffect} from "react"
import {useContext} from "react";
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
    const [conditional,setConditional] = useState(false)
    const [wallpaperStore,setWallpaperStore] = useState(localStorage.getItem('wallpaper') || "https://starwars-chat.s3.sa-east-1.amazonaws.com/wallpaper1.jpg")
    


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
           setUser(data);
            
      
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

      const getProfile = () => {
        return localStorage.getItem("char") ? localStorage.getItem("char") : selectedChar.image;
      }




    return(
      <>
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
              <input style={{color:selectedChar.color}} type="text" placeholder="Digite sua mensagem" />
              <button onClick={showMessageByDefault} className="btn">Enviar</button>
             </div>

        </div>
        
        </>
    )
}


export default Chat;