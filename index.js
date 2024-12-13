import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config()

//{W9YAudkPHcEqMWtN} password of database
const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend origin
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  }))
 

app.use("/api/user", userRoute)
app.use("/api/residency", residencyRoute)


app.listen(PORT,()=>{
    console.log("server is running on PORT" , PORT);
})
