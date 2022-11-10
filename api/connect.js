import express from 'express';
import cors from "cors"
// import dotenv from "dotenv";
import { router as UserRoutes } from './src/Routes/Users/users.routes.js';
import { router as UserLoginRoutes } from "./src/Routes/LoginUser/loginUser.routes.js"
import { router as AdminRoutes } from "./src/Routes/Admin/admin.routes.js"
import { router as EmailRoutes } from "./src/Routes/Email/email.routes.js"
// dotenv.config();

const server = express()

//middlewares
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(cors());

//acceso a rutas
server.use("/", UserRoutes);
server.use("/", UserLoginRoutes);
server.use("/", AdminRoutes);
server.use("/", EmailRoutes);

//conexiones
const PORT = 4000;
const HOST = "0.0.0.0";

server.listen(PORT, HOST, () => {
   console.log(`%s listening at ${PORT}`);
});

// connection.query
// connection.end();