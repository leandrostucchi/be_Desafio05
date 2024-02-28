import express from "express"
import { engine } from 'express-handlebars';
import session from "express-session";
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

import sessionsRouter from "./routes/sessions.js";
import viewsRouter from "./routes/views.js";
export const port = 9080

//let mongoBase = "mongodb://localhost:27017/login";
let mongoBase = 'mongodb+srv://lstucchi:tGrjLHdnChKYsgoN@cluster0.s4wk2id.mongodb.net/login?retryWrites=true&w=majority'
const app = express()

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(cookieParser());
app.use(session({
    store:MongoStore.create({
        mongoUrl:mongoBase,
        ttl:15,
    }),
    secret:"secretCode",
    resave:true,
    saveUninitialized:true
}))

app.use("/api/sessions", sessionsRouter);
app.use("/", viewsRouter);

// Conexión MongoDB
app.listen(port,() => console.log('Servidor arriba  puerto:' + port))

const conn =  mongoose.connect(mongoBase)
.then(success => console.log('Conectado a la base '))
.catch(error =>{
    if(error){
      console.log('No se pudo conectar a la base ' + error);
      process.exit();
    }
  });




