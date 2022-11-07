import "./styles.css"
import React from "react";
import axios from "axios";
import {useState,useEffect,useContext} from "react";
import { useNavigate } from "react-router-dom";
import {CharContext} from "../context/CharContext.js";
import logo from "../assets/images/logo.png";
import wallpapers from "../Chat/wallpapers.json";   


function Menu() {
    const navigate = useNavigate();

    //const URL_IO = "http://localhost:3001"
    const URL_IO = "https://backend-starwarschat.vercel.app/"

    const [characters,setCharacters] = useState();
    const [renderSelect,setRenderSelect] = useState(false)
    const [charSelected,setCharSelected] = useState()
    const [imageToRender,setImageToRender] = useState()
    const [charChoosed,setCharChoosed] = useState()
    const {setSelectedChar} = useContext(CharContext);
    
    const [selectedWallpaper,SetSelectedWallpaper] = useState([wallpapers.um,wallpapers.dois,
        wallpapers.tres,wallpapers.quatro,wallpapers.cinco])
        const selectWallpaper = selectedWallpaper.map(wallpaper => wallpaper)
        const changeWallpaper = (e) => {
          let url = selectedWallpaper[e.target.value].url
          let bodie = document.getElementsByTagName('body')[0]
          bodie.style.backgroundImage = `url(${url})`
          
          
    
        }
    useEffect(() => {
        async function getChar() {
                await axios.get(`${URL_IO}/autor`).then(char => {
                setCharacters(char.data)
                setRenderSelect(true)
               }).catch(e => {
                console.log("error "+e);
               })
        }
        getChar()
      
    },[])


    const sendCharacterToChat = (e) => {
     e.preventDefault();
     setSelectedChar(charChoosed);
     localStorage.setItem("char",charChoosed.image);
     localStorage.setItem("charId",charChoosed._id)
     navigate("/chat")
    }
   
 return(
    <div className="forall">
        
    <img className="logo" src={logo}/>
    <select 
        className="select-wallpaper-menu"
        onChange={e => changeWallpaper(e)}>
          {
          selectWallpaper.map((wallpaper,key) => <option value={key}>{wallpaper.name}</option>)
          }
                  
        </select>
    <div className="container">
        <section className="formulario">
        {renderSelect && 
        <img 
         src={imageToRender === undefined ? characters[0].image : imageToRender}
         alt="image"
         />
        }
        <label>Choose a Character</label>
        { renderSelect && <select value={charSelected} onChange={e => {setCharSelected(e.target.value)
        let value = characters.find(char => {
            if(char.name === e.target.value) {
                return char.image
            }
        })
        setImageToRender(value.image);  
        setCharChoosed(value) 
        }}>
            {characters.map((char) => (
             (<option value={char.id} key={char.id} onClick={e => {
                setCharSelected(e.target.value)
            }}> {char.name}</option>)
            ))}
           
        </select>}
       
     <button onClick={(e) => {sendCharacterToChat(e)}} className="btn-entrar">Entrar</button>
     

        </section>

    </div>
    
    </div>
 )
}


export default Menu;
    
