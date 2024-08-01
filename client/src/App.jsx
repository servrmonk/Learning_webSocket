import React, { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000"); //backend url , if u don't pass anything in io than it will check on default url means frontend url . allow cors
  // console.log("Socket in app.jsx ",socket);

  useEffect(() => {
    socket.on("connection", () => {
      //connection i.e same event name that u put on the server.js
      console.log("Connected", socket.id);
    }); //as connected it will trigerred

   
  }, []);

  return <div>App</div>;
}

export default App;
