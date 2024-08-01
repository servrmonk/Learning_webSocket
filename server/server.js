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
  console.log("User Connected");
  console.log("Id socket.id ", socket.id);
  // socket.emit("welcome", `Welcome to the server ${socket.id}`);
  // socket.broadcast.emit("welcome", `Welcome to the server ${socket.id}`); //jo socket hai usko msg nai jaega baaki sbko jaega
  // usually hm listener lagate hai and emit frontend se krte hai  aur jo listener hai usse emit krte hai
  socket.on("disconnect", () => {
    console.log("User disconnected :)", socket.id); //in frontend  in useeffect socket.disconnect in return keyword or cleaner function
  });
});

server.listen(port, () => {
  console.log("Server is running on port ", port);
});
