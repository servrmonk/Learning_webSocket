import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";
import { Button, Container, TextField, Typography } from "@mui/material";

function App() {
  // const socket = io("http://localhost:3000");

  //socket is changing if the vlaue of message is changign the component is rerender and the socket is changing evertime so we will use usememo Because again and again socket is changing

  const socket = useMemo(() => io("http://localhost:3000"), []);

  const [message, setMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("message", message);
  };

  return (
    <Container>
      <Typography variant="h3" component="div" gutterBottom>
        Welcome to Socket.io
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="outlined-basic"
          label="Outlined"
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
