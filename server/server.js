import express from "express";

import { Server } from "socket.io";
import { createServer } from "http";
import cors from "cors";
import jwt from "jsonwebtoken";

const port = 3000;
const app = express();

const server = createServer(app);
const secretKeyJwt = "lkdoiwlidlwiiiel23wo394";

// u can pass cors io 2nd parameter also
const io = new Server(server, {
  cors: {
    // origin: "*", //for all
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// for api middleware u use cors
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello world ");
});
app.get("/login", (req, res) => {
  const token = jwt.sign({ _id: "adkdilwidlwi", secretKeyJwt }); //random id and secret key id is payload
  res
    .cookie("token", token, { httpOnly: true, secure: true, sameSite: "none" })
    .json({ message: "Login Success" });
});

// using middleware
io.use((socket, next) => {
  next() //u can perform operations
});

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("message", (data) => {
    console.log("Message data ", data);

    socket.to(data.room).emit("received-message-event", data.message); //instead of data.room u can use extract {message,room}

    // ab room specific join krwana hai
  });
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log("User joined room ", room);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected :( ", socket.id);
  });
});

server.listen(port, () => {
  console.log("Server is running on port ", port);
});
