import React, { useState, useEffect } from 'react';
import Deso from "deso-protocol";
import "./App.css";
import "./animations.css";
import { Route, Routes } from 'react-router-dom'
import { Draw, Mint } from './pages'
import {Toaster} from 'react-hot-toast';
import { Navbar } from './components/Navbar';
import AuthContext from './context/auth-context';

function App() {
  const deso = new Deso();
  const [desoKey, setDesoKey] = useState(localStorage.getItem("desoKey"));

  async function loginWithDeso(){
    const user = await deso.identity.login();
    if (user) {
      setDesoKey(user.key);
      localStorage.setItem("desoKey", user.key);
    }
  }

  async function desoLogout(){
    await deso.identity.logout();
    setDesoKey(null);
    localStorage.removeItem("desoKey");
  }

  function isDay(){
    const date = new Date();
    const hour = date.getHours();
    return hour >= 6 && hour < 18;
  }

  return (
    <AuthContext.Provider value={{
      login: loginWithDeso,
      logout: desoLogout,
      deso: deso
    }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<div className={isDay() ? "light-container" : "dark-container"}><Draw /></div>} />
          <Route path="/mint" element={<Mint />} />
        </Routes>
        <Toaster />
    </AuthContext.Provider>
  )

  
}

export default App;
