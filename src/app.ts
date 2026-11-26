import express, { type Application, type Request, type Response } from "express"
import  cors from "cors";
const app:Application =express(); 

app.use(cors())
app.use(express.json()); //req.body te jeson pawar jonno

app.get("/",(req:Request,res:Response)=>{
    res.status(200).json({
        success:true,
        message:"EventHive API is running"
    })
})

export default app;