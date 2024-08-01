import React from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000"); //backend url , if u don't pass anything in io than it will check on default url means frontend url . allow cors
  console.log("Socket in app.jsx ",socket);

  return <div>App</div>;
}

export default App;
