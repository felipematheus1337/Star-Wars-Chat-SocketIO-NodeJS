import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

import Menu from "../src/Menu/index.js";

function App() {
 return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu/>} />
      </Routes>
    
    </BrowserRouter>
 )
}

export default App;