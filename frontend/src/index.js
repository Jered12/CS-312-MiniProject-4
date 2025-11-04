//import react library reactDOM and root APP for the compnents
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from "./App";

//find dom elelmets
const root = ReactDOM.createRoot(document.getElementById('root'));
//render the app
root.render(
  <React.StrictMode>
    <App /> 
  </React.StrictMode>
);


