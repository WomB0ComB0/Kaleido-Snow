import React from "react";
import { ButtonPrimary } from "./components/Buttons";
import Snowfall from "react-snowfall";
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
      {/* Image on the bottom (snow ground) */}
      <img src={require("./images/snow-ground.png")} alt="Snow ground" className="snow-ground" style={{position: 'fixed', bottom: 0, left: 0, width: '100vw', height: "40vh"}}/>
    </div>
  );
}

export default App;
