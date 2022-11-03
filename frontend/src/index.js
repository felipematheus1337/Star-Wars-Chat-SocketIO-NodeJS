import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CharProvider } from './context/CharContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CharProvider>
    <App />
    </CharProvider>
  </React.StrictMode>
);
