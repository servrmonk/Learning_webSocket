import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography } from "@mui/material";

function App() {
  // const socket = io("http://localhost:3000");

  //socket is changing if the vlaue of message is changign the component is rerender and the socket is changing evertime so we will use usememo Because again and again socket is changing

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      //when connected
      console.log("Connected", socket.id);
      setSocketId(socket.id);
    });

    socket.on("received-message-event", (data) => {
      //write this event in backend first and than in frontend
      console.log("Received data in app.jsx ", data);
    });

    socket.on("welcome", (s) => {
      console.log(s);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", { message, room });
    setMessage("")
  };

  return (
    <Container>
      <Typography variant="h6" component="div" gutterBottom>
        {socketId}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Message"
          variant="outlined"
        />
        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          id="outlined-basic"
          label="Room"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Send
        </Button>
      </form>
    </Container>
  );
}

export default App;
