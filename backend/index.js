const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, ".env")
});

const express=require("express");
const app=express();
const cookieParser = require("cookie-parser");
const {connectMongoDB} = require('./connection');

const path=require("path");


connectMongoDB(process.env.MONGO_URI)
.then(()=>console.log("Mongobd connected"));

const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended:false}));  //It is a middleware
app.use(cookieParser());

app.use(cors({
    origin: process.env.REACT_URL,
    credentials: true
}));
const userRouter = require("./routes/user");
app.use(userRouter);

app.listen(process.env.PORT, ()=> console.log("Server Started"));