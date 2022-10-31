import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import Menu from "../src/Menu/index.js";
import Chat from "../src/Chat/Chat.js";

function App() {
 return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu/>} />
        <Route path="/chat" element={<Chat/>}/>
      </Routes>
    
    </BrowserRouter>
 )
}

export default App;