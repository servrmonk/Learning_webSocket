import React, { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("http://localhost:3000");

  useEffect(() => {
    socket.on("connect", () => {
      //when connected
      console.log("Connected", socket.id);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return <div>App</div>;
}

export default App;
