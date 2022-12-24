import React, { useState, useEffect } from 'react';
import Deso from "deso-protocol";
import "./App.css";
import "./animations.css";
import { Route, Routes } from 'react-router-dom'
import { Draw, Mint } from './pages'


function App() {
  const deso = new Deso();
  const [white, setWhite] = useState(0);

  async function loginWithDeso(){
    const user = await deso.identity.login();
    console.log(user);
  }

  function isDay(){
    const date = new Date();
    const hour = date.getHours();
    return hour >= 6 && hour < 18;
  }

  return (
    <div className={isDay() ? "light-container" : "dark-container"}>
      <Routes>
        <Route path="/" element={<Draw />} />
        <Route path="/mint" element={<Mint />} />
      </Routes>
    </div>
  )

  
}

export default App;
