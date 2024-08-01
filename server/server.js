import express from "express";

import { Server } from "socket.io";
import {createServer} from "http"

const port = 3000;
const app = express();

const server = createServer(app);
const io = new Server(server);

io.on("connection",(socket)=>{ //already socket milega
console.log("User connected");
console.log("Id socket.id ",socket.id);
}) 

app.get("/", (req, res) => {
  res.send("Hello world ");
});

app.listen(port, () => {
  console.log("Server is running on port ", port);
});
