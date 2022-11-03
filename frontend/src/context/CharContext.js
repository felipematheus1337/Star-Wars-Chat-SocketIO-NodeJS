import React from "react";
import {useState,createContext} from "react";


const CharContext = createContext();

const CharProvider =({children}) => {
    const [selectedChar,setSelectedChar] = useState({});
    return (
        <CharContext.Provider value={{selectedChar,setSelectedChar}}>
            {children}
        </CharContext.Provider>
    )
}


export {CharContext,CharProvider};