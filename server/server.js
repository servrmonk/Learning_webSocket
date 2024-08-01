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

io.on("connection", (socket) => {
  console.log("User Connected", socket.id);

  socket.on("message", (data) => {
    console.log("Message data ", data);
    // io.emit("received-message-event", data); both party will get the msg
    // socket.broadcast.emit("received-message-event", data); //now  msg that i sent will not available in my chat or i can't see the msg
    // now i want that abc me se a -> c se chat kre to now i will use rooms ka particular room me vejeng msg 
    io.to(data.room).emit("received-message-event", data.message); //instead of data.room u can use extract {message,room}

  });

  socket.on("disconnect", () => {
    console.log("User disconnected :( ", socket.id);
  });
});

server.listen(port, () => {
  console.log("Server is running on port ", port);
});
