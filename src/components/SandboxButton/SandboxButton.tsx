import React from "react";
import { makeServer } from "../../mirage/server";

const SandboxButton = ()=> {
  //const [isMirageOn, setIsMirageOn] = useState(false);
  const isSandboxMode = localStorage.getItem('isSandboxMode') ?? 'false'

  const toggleMirage = () => {
    if (isSandboxMode.toLowerCase() === "true") {
      // Turn off Mirage server
      makeServer({ environment: "development" }).shutdown();
      localStorage.setItem('isSandboxMode', 'false');
      window.location.reload();
    } else {
      // Turn on Mirage server
      //makeServer({ environment: "development" });
      localStorage.setItem('isSandboxMode', 'true');
      window.location.reload();
    }
    //setIsMirageOn(!isMirageOn);
  };

  return (
    <button onClick={toggleMirage}>
      {isSandboxMode.toLowerCase() === "true" ? "Turn Off Sandbox" : "Turn On Sandbox"}
    </button>
  );
};

export default SandboxButton;