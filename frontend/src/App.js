import React from "react";
import { ButtonPrimary } from "./components/Buttons";
import Deso from "deso-protocol";

function App() {
  const deso = new Deso();

  async function loginWithDeso(){
    const user = await deso.identity.login();
    console.log(user);
  }

  return (
    <ButtonPrimary onClick={loginWithDeso}>Login with Deso</ButtonPrimary>
  );
}

export default App;
