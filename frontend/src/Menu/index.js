import "./styles.css"
import React from "react";
import axios from "axios";
import {useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";


function Menu() {
    const navigate = useNavigate();

    const URL_IO = "http://localhost:3001"

    const [characters,setCharacters] = useState();
    const [renderSelect,setRenderSelect] = useState(false)
    const [charSelected,setCharSelected] = useState()
    const [imageToRender,setImageToRender] = useState()
    const [charChoosed,setCharChoosed] = useState()

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
     navigate("/chat")
     


    }
   
 return(
    <div className="container">
        <section class="formulario">
        {renderSelect && 
        <img 
         alt="char image"
         src={imageToRender === undefined ? characters[0].image : imageToRender}
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
             (<option value={char.id} onClick={e => {
                setCharSelected(e.target.value)
            }}> {char.name}</option>)
            ))}
           
        </select>}
       
     <button onClick={(e) => {sendCharacterToChat(e)}} className="btn-entrar">Entrar</button>
     

        </section>

    </div>
 )
}


export default Menu;
    
