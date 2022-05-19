import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { products } from "./routes/products.js";
import { routerRoot } from "./routes/root.js";
import { routerProducts } from "./routes/products.js";
import { routerLogin } from "./routes/login.js";
import { routerLogout } from "./routes/logout.js";
import chatMsgsWsHandler from "./handlers/sockets/chat_msgs.js";
import userWsHandler from "./handlers/sockets/user.js";
import session from "./handlers/session/mongo_store.js";
import { name } from "./handlers/routes/login.js";

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const serverPort = 8080;
const msgs = [];

io.on("connection", async (socket) => {
  console.log("User connected");
  io.sockets.emit("renderProducts", products.getProducts().content);
  await chatMsgsWsHandler(socket, io.sockets, msgs);
  await userWsHandler("login", io.sockets, name);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session);

app.use("/", routerRoot);
app.use("/login", routerLogin);
app.use("/logout", routerLogout);
app.use("/api", routerProducts);
app.io = io;
httpServer
  .listen(serverPort, () => {
    console.log(`Servidor activo y escuchando en puerto ${serverPort}`);
  })
  .on("error", (error) => console.log(error.message));
