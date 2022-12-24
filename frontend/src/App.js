import React, {useRef} from "react";
import { ButtonPrimary } from "./components/Buttons";
import Snowfall from "react-snowfall";
import { DrawingCanvas } from "./components/DrawingCanvas";
import Deso from "deso-protocol";
import "./App.css"

function App() {
  const deso = new Deso();

  async function loginWithDeso(){
    const user = await deso.identity.login();
    console.log(user);
  }

  return (
    
    <div className="dark-container">
      <Snowfall style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
        }}
      />
      {/*<ButtonPrimary onClick={loginWithDeso}>Login with Deso</ButtonPrimary>*/}
      {/* Centered drawing canvas rendered above everything else */}
      <div style={{position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1}}>
        <DrawingCanvas />
      </div>
      <img src={require("./images/snow-ground.png")} alt="Snow ground" style={{position: 'fixed', bottom: 0, left: 0, width: '100vw', height: "40vh"}}/>
    </div>
  );
}

export default App;
